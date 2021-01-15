const express = require("express");
const axios = require("axios");
const e = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const details = await axios.get(
      `
      https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${process.env.API_ENV}&language=en-US`
    );
    console.log("succes review");
    res.json(details.data);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/reviews", async (req, res) => {
  try {
    const review = await axios.get(
      `
        https://api.themoviedb.org/3/movie/${req.query.id}/reviews?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(review.data);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/credits", async (req, res) => {
  try {
    const credits = await axios.get(
      `
      https://api.themoviedb.org/3/movie/${req.query.id}/credits?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(credits.data);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/actor", async (req, res) => {
  try {
    const actorDetails = await axios.get(
      `
      https://api.themoviedb.org/3/person/${req.query.actorId}?api_key=${process.env.API_ENV}&language=en-US`
    );
    const actorCredits = await axios.get(
      `https://api.themoviedb.org/3/person/${req.query.actorId}/combined_credits?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(actorDetails.data);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/actor/credits/movies", async (req, res) => {
  try {
    const movieCredits = await axios.get(
      `https://api.themoviedb.org/3/person/${req.query.actorId}/movie_credits?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(movieCredits.data);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/actor/credits/tv", async (req, res) => {
  try {
    const tvCredits = await axios.get(
      `https://api.themoviedb.org/3/person/${req.query.actorId}/tv_credits?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(tvCredits.data);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/actor/credits/all", async (req, res) => {
  try {
    const tvCredits = await axios.get(
      `https://api.themoviedb.org/3/person/${req.query.actorId}/combined_credits?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(tvCredits.data);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/movie/keywords", async (req, res) => {
  try {
    const keywords = await axios.get(
      `
      https://api.themoviedb.org/3/movie/${req.query.id}/keywords?api_key=${process.env.API_ENV}`
    );
    console.log("keywords", keywords.data);
    res.json(keywords.data.keywords);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
router.get("/movie/recommendations", async (req, res) => {
  try {
    const recommendations = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.query.id}/recommendations?api_key=${process.env.API_ENV}&language=en-US&page=1`
    );

    res.json(recommendations.data);
  } catch (err) {
    console.log("ERROR");
    res.json(err.message);
  }
});
module.exports = router;
