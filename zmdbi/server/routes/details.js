const express = require("express");
const axios = require("axios");
const e = require("express");
const router = express.Router();

router.get("/movie", async (req, res) => {
  try {
    const details = await axios.get(
      `
      https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${process.env.API_ENV}&language=en-US`
    );
    console.log("ehehe");
    res.json(details.data);
  } catch (err) {
    console.log("ERRrrwrOR");
    res.status(404).json(err);
  }
});
router.get("/tv", async (req, res) => {
  try {
    const details = await axios.get(
      `
      https://api.themoviedb.org/3/tv/${req.query.id}?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(details.data);
  } catch (err) {
    console.log("ERROR");
    res.status(404).json(err);
  }
});
router.get("/reviews/movie", async (req, res) => {
  try {
    const review = await axios.get(
      `
        https://api.themoviedb.org/3/movie/${req.query.id}/reviews?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(review.data);
  } catch (err) {
    console.log("ERROR");
    res.status(404).json(err);
  }
});
router.get("/reviews/tv", async (req, res) => {
  try {
    const review = await axios.get(
      `
        https://api.themoviedb.org/3/tv/${req.query.id}/reviews?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(review.data);
  } catch (err) {
    console.log("ERROR");
    res.status(404).json(err);
  }
});
router.get("/credits/movie", async (req, res) => {
  try {
    const credits = await axios.get(
      `
      https://api.themoviedb.org/3/movie/${req.query.id}/credits?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(credits.data);
  } catch (err) {
    console.log("ERROR");
    res.status(404).json(err);
  }
});
router.get("/credits/tv", async (req, res) => {
  try {
    const credits = await axios.get(
      `
      https://api.themoviedb.org/3/tv/${req.query.id}/credits?api_key=${process.env.API_ENV}&language=en-US`
    );

    res.json(credits.data);
  } catch (err) {
    console.log("ERROR");
    res.status(404).json(err);
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
    res.status(404).json(err);
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
    res.status(404).json(err);
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
    res.status(404).json(err);
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
    res.status(404).json(err);
  }
});
router.get("/movie/keywords", async (req, res) => {
  try {
    const keywords = await axios.get(
      `
      https://api.themoviedb.org/3/movie/${req.query.id}/keywords?api_key=${process.env.API_ENV}`
    );

    res.json(keywords.data);
  } catch (err) {
    console.log("ERROR");
    res.status(404).json(err);
  }
});
router.get("/tv/keywords", async (req, res) => {
  try {
    const keywords = await axios.get(
      `
      https://api.themoviedb.org/3/tv/${req.query.id}/keywords?api_key=${process.env.API_ENV}`
    );

    res.json(keywords.data);
  } catch (err) {
    console.log("ERROR");
    res.status(404).json(err);
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
    res.status(404).json(err);
  }
});
module.exports = router;
