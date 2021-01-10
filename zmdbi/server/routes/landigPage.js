const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/this_week/movies", async (req, res) => {
  try {
    const thisWeekMovies = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_ENV}`
    );
    res.json(thisWeekMovies.data);
  } catch (err) {
    res.json(err);
  }
});

router.get("/this_week/people", async (req, res) => {
  try {
    const thisWeekPeople = await axios.get(
      `https://api.themoviedb.org/3/person/week?api_key=${process.env.API_ENV}`
    );
    res.json(thisWeekPeople.data);
  } catch (err) {
    res.json(err);
  }
});
router.get("/latest", async (req, res) => {
  try {
    const latest = await axios.get(
      `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.API_ENV}&language=en-US`
    );
    res.json(latest.data);
  } catch (err) {
    res.json(err);
  }
});
router.get("/top_rated", async (req, res) => {
  try {
    const topRated = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_ENV}&language=en-US&page=1`
    );
    console.log(topRated);
    res.json(topRated.data);
  } catch (err) {
    res.json(err);
  }
});
router.get("/this_week/tv", async (req, res) => {
  try {
    const thisWeekTv = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_ENV}`
    );
    res.json(thisWeekTv.data);
  } catch (err) {
    res.json(err);
  }
});
router.get("/this_day/movies", async (req, res) => {
  try {
    const moviesToday = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_ENV}`
    );
    res.json(moviesToday.data);
  } catch (err) {
    res.json(err);
  }
});
router.get("/this_day/tv", async (req, res) => {
  try {
    const tvToday = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_ENV}`
    );
    res.json(tvToday.data);
  } catch (err) {
    res.json(err);
  }
});
router.get("/this_day/people", async (req, res) => {
  try {
    const peopleToday = await axios.get(
      `https://api.themoviedb.org/3/trending/people/day?api_key=${process.env.API_ENV}`
    );
    res.json(peopleToday.data);
  } catch (err) {
    res.json(err);
  }
});
router.get("/upcoming", async (req, res) => {
  try {
    const upcoming = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_ENV}&language=en-US&page=1`
    );
    res.json(upcoming.data);
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;
