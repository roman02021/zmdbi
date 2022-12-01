const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_ENV}&language=en-US&page=${req.query.page}`
    );

    res.json(movie.data.results);
  } catch (err) {
    res.json(err.message);
  }
});
router.get('/search', async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_ENV}&language=en-US&query=${req.query.searchString}&page=${req.query.page}&include_adult=false`
    );

    res.json(movie.data.results);
  } catch (err) {
    res.json(err.message);
  }
});
router.get('/movie/discover', async (req, res) => {
  try {
    const discover = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=${req.query.sortOption}&include_adult=false&include_video=false&page=${req.query.page}&release_date.gte=${req.query.releaseDateMin}&release_date.lte=${req.query.releaseDateMax}&vote_average.gte=${req.query.scoreMin}&vote_average.lte=${req.query.scoreMax}&with_genres=${req.query.genres}&with_runtime.gte=${req.query.runtimeMin}&with_runtime.lte=${req.query.runtimeMax}&with_original_language=${req.query.language}`
    );

    res.json(discover.data);
  } catch (err) {
    res.json(err.message);
  }
});
router.get('/tv/discover', async (req, res) => {
  try {
    const discover = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.API_ENV}&language=en-US&sort_by=${req.query.sortOption}&include_adult=false&include_video=false&page=${req.query.page}&first_air_date.gte=${req.query.releaseDateMin}&first_air_date.lte=${req.query.releaseDateMax}&vote_average.gte=${req.query.scoreMin}&vote_average.lte=${req.query.scoreMax}&with_genres=${req.query.genres}&with_runtime.gte=${req.query.runtimeMin}&with_runtime.lte=${req.query.runtimeMax}&with_original_language=${req.query.language}`
    );

    res.json(discover.data);
  } catch (err) {
    res.json(err.message);
  }
});

router.get('/people/popular', async (req, res) => {
  try {
    const popularPeople = await axios.get(
      `
      https://api.themoviedb.org/3/person/popular?=${process.env.API_ENV}&language=en-US&page${req.query.page}`
    );

    res.json(popularPeople.data);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
