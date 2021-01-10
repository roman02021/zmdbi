const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_ENV}&language=en-US&page=${req.query.page}`
    );

    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/search", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_ENV}&language=en-US&query=${req.query.searchString}&page=${req.query.page}&include_adult=false`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});

module.exports = router;
