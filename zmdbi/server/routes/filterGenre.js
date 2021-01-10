const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/action", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=28`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/horror", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=27`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/adventure", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=12`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/crime", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=80`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/comedy", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=35`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/animation", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=16`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/documentary", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=99`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/family", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=10751`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/history", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=36`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/music", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=10402`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/fantasy", async (req, res) => {
  try {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_ENV}&language=en-US&sort_by=popularity.desc&include_adult=false&with_genres=14`
    );
    res.json(movie.data.results);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
module.exports = router;
