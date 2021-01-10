//Modules
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

//Routes
const movies = require("./routes/movies.js");
const filterGenre = require("./routes/filterGenre");
const sortBy = require("./routes/sortBy");
const details = require("./routes/details");
const getToken = require("./routes/getToken");
const landingPage = require("./routes/landigPage");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/movies", movies);
app.use("/filterGenre", filterGenre);
app.use("/sortBy", sortBy);
app.use("/details", details);
app.use("/getToken", getToken);
app.use("/landingPage", landingPage);
