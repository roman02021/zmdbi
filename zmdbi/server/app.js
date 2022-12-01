//Modules
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cookieParser = require('cookie-parser');
//Routes
const media = require('./routes/media');

const details = require('./routes/details');
const authentication = require('./routes/authentication');
const landingPage = require('./routes/landigPage');
const search = require('./routes/search');
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log('hello');
  res.send('hello');
});

app.use('/media', media);
app.use('/details', details);
app.use('/authentication', authentication);
app.use('/landingPage', landingPage);
app.use('/search', search);
