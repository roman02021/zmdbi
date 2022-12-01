const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/movie', async (req, res) => {
  console.log(req.query.searchQuery);
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_ENV}&language=en-US&query=${req.query.searchQuery}&page=${req.query.page}&include_adult=false`
    );
    res.json(movie.data);
  } catch (err) {
    res.json(err.message);
  }
});

router.get('/tv', async (req, res) => {
  console.log(req.query.searchQuery);
  try {
    const tv = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_ENV}&language=en-US&query=${req.query.searchQuery}&page=${req.query.page}&include_adult=false`
    );
    res.json(tv.data);
  } catch (err) {
    res.json(err.message);
  }
});

router.get('/people', async (req, res) => {
  console.log(req.query.searchQuery);
  try {
    const people = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.API_ENV}&language=en-US&query=${req.query.searchQuery}&page=${req.query.page}&include_adult=false`
    );
    res.json(people.data);
  } catch (err) {
    res.json(err.message);
  }
});
router.get('/keywords', async (req, res) => {
  console.log(req.query.searchQuery);
  try {
    const people = await axios.get(
      `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.API_ENV}&language=en-US&query=${req.query.searchQuery}&page=${req.query.page}&include_adult=false`
    );
    res.json(people.data);
  } catch (err) {
    res.json(err.message);
  }
});
module.exports = router;
