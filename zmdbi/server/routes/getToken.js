const express = require("express");
const axios = require("axios");
const router = express.Router();

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

module.exports = router;
