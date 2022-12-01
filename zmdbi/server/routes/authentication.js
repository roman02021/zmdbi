const express = require('express');
const axios = require('axios');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.get('/', async (req, res) => {
  try {
    const token = await axios.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.API_ENV}`
    );

    res.json(token.data.request_token);
  } catch (err) {
    console.log('ERROR');
    res.json(err.message);
  }
});
router.get('/getSessionId', async (req, res) => {
  console.log(req.query.token);
  try {
    const session_id = await axios.post(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.API_ENV}`,
      {
        request_token: req.query.token,
      }
    );
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    console.log('apireqpased');
    res.writeHead(200, {
      'Set-Cookie':
        `SID=${session_id.data.session_id}; HttpOnly; Secure; SameSite=None; expires=` +
        new Date(new Date().getTime() + 604800000).toUTCString(),
      'Acces-Control-Allow-Credentials': true,
    });
    console.log(res);
    // res.cookie("SID", session_id.data.session_id, {
    //   httpOnly: true,
    // });

    res.send();
  } catch (err) {
    console.log('ERROReee');
    console.log(err.message);
    res.json(err.message);
  }
});
router.get('/getAccDetails', async (req, res) => {
  try {
    const accDetails = await axios.get(
      `https://api.themoviedb.org/3/account?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`
    );
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.json(accDetails.data);
  } catch (err) {
    console.log('Not Signed In');
    res.json(err.message);
  }
});
router.delete('/logout', async (req, res) => {
  try {
    axios.delete(
      `https://api.themoviedb.org/3/authentication/session?api_key=${process.env.API_ENV}`,
      {
        data: { session_id: `${req.cookies.SID}` },
      }
    );
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);

    res.setHeader('Set-Cookie', 'SID=;Max-Age=0 ');

    res.json();
  } catch (err) {
    console.log('ERROR');
    console.log(err.message);
    res.json(err.message);
  }
});

router.get('/addFavourite', async (req, res) => {
  try {
    await axios.post(
      `https://api.themoviedb.org/3/account/${req.query.user_id}/favorite?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`,
      {
        media_type: req.query.media_type,
        media_id: req.query.media_id,
        favorite: true,
      }
    );
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    console.log('succs');
    res.json('succes');
  } catch (err) {
    console.log('ERRORee');
    console.log(err.message);
    res.json(err.message);
  }
});
router.get('/addWatchlist', async (req, res) => {
  try {
    await axios.post(
      `https://api.themoviedb.org/3/account/${req.query.user_id}/watchlist?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`,
      {
        media_type: req.query.media_type,
        media_id: req.query.media_id,
        watchlist: true,
      }
    );
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.json('succes');
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});
router.get('/movie/getAccountStates', async (req, res) => {
  try {
    const accountStates = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.query.media_id}/account_states?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`
    );
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.json(accountStates.data);
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});
router.get('/tv/getAccountStates', async (req, res) => {
  console.log(req.query.media_id);
  try {
    const accountStates = await axios.get(
      `https://api.themoviedb.org/3/tv/${req.query.media_id}/account_states?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`
    );
    console.log(accountStates);
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.json(accountStates.data);
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});
router.get('/addRating', async (req, res) => {
  console.log(req.query);
  try {
    await axios.post(
      `https://api.themoviedb.org/3/movie/${req.query.media_id}/rating?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`,
      {
        value: req.query.score,
      }
    );
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.json();
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});

router.get('/checkSigned', (req, res) => {
  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   process.env.CLIENT_URL
  // );
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  console.log(req.cookies);
  if (req.cookies.SID) {
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
