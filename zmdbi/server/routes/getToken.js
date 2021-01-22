const express = require("express");
const axios = require("axios");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.get("/", async (req, res) => {
  try {
    const token = await axios.get(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.API_ENV}`
    );

    res.json(token.data.request_token);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/getSessionId", async (req, res) => {
  try {
    const session_id = await axios.post(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.API_ENV}`,
      {
        request_token: `${req.query.token}`,
      }
    );
    res.writeHead(200, {
      "Set-Cookie":
        `SID=${session_id.data.session_id}; HttpOnly; expires=` +
        new Date(new Date().getTime() + 30 * 60000).toUTCString(),
      "Acces-Control-Allow-Credentials": true,
    });

    // res.cookie("SID", session_id.data.session_id, {
    //   httpOnly: true,
    // });

    res.send();
  } catch (err) {
    console.log("ERROR");
    console.log(err.message);
    res.json(err.message);
  }
});
router.get("/getAccDetails", async (req, res) => {
  try {
    const accDetails = await axios.get(
      `https://api.themoviedb.org/3/account?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`
    );

    res.json(accDetails.data);
  } catch (err) {
    console.log("ERROeR");
    res.json(err.message);
  }
});
router.delete("/logout", async (req, res) => {
  try {
    const accDetails = await axios.delete(
      `https://api.themoviedb.org/3/authentication/session?api_key=${process.env.API_ENV}`,
      {
        data: { session_id: `${req.cookies.SID}` },
      }
    );
    res.setHeader("Set-Cookie", "SID=;Max-Age=0 ");

    res.json();
  } catch (err) {
    console.log("ERROR");
    console.log(err.message);
    res.json(err.message);
  }
});

router.get("/checkSigned", (req, res) => {
  if (req.cookies.SID) {
    res.send(true);
  } else {
    res.send(false);
  }
});
router.get("/addFavourite", async (req, res) => {
  try {
    await axios.post(
      `https://api.themoviedb.org/3/account/${req.query.user_id}/favorite?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`,
      {
        media_type: req.query.media_type,
        media_id: req.query.media_id,
        favorite: true,
      }
    );
    console.log("succs");
    res.json();
  } catch (err) {
    console.log("ERRORee");
    console.log(err.message);
    res.json(err.message);
  }
});
router.get("/addWatchlist", async (req, res) => {
  try {
    await axios.post(
      `https://api.themoviedb.org/3/account/${req.query.user_id}/watchlist?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`,
      {
        media_type: req.query.media_type,
        media_id: req.query.media_id,
        watchlist: true,
      }
    );
    console.log("succs");
    res.json();
  } catch (err) {
    console.log("ERRORee");
    console.log(err.message);
    res.json(err.message);
  }
});
router.get("/addRating", async (req, res) => {
  console.log(req.query);
  try {
    await axios.post(
      `https://api.themoviedb.org/3/movie/${req.query.media_id}/rating?api_key=${process.env.API_ENV}&session_id=${req.cookies.SID}`,
      {
        value: req.query.score,
      }
    );
    console.log("succs");
    res.json();
  } catch (err) {
    console.log("ERRORee");
    console.log(err.message);
    res.json(err.message);
  }
});

router.get("/checkSigned", (req, res) => {
  console.log(req.cookies);
  if (req.cookies.SID) {
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
