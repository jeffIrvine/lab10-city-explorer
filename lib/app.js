require('dotenv').config();
const { 
  mungedLocation, 
  mungedWeather,
  mungedTrails,
  mungedReviews

} = require('../utils.js');
const express = require('express');
const cors = require('cors');
// const client = require('./client.js');
const app = express();
const request = require ('superagent');
// const ensureAuth = require('./auth/ensure-auth');
// const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(morgan('dev')); // http logging

// const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password

// everything that starts with "/api" below here requires an auth token!


// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
// app.get('/api/test', (req, res) => {
//   res.json({
//     message: `in this proctected route, we get the user's id like so: ${req.userId}`
//   });
// });


app.get('/location', async(req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.query.search}&format=json`;

    const response = await request.get(URL);

    const newRes = mungedLocation(response.body);

    res.json(newRes);
  } catch(e) {
    res.json({ error: e.message, e });
  }
});


app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHER_KEY}`;

    const response = await request .get(URL);

    const newRes = mungedWeather(response.body);

    res.json(newRes);
  } catch(e) {
    res.json({ error: e.message, e });
  }
});

app.get('/trails', async(req, res) => {
  try {
    const URL = `https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=10&key=${process.env.HIKING_KEY}`;

    const response = await request.get(URL);

    const newRes = mungedTrails(response.body);

    res.json(newRes);
  } catch(e) {
    res.json({ error: e.message, e });
  }
});


app.get('/reviews', async(req, res) => {
  try {
    const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`;

    const response = await request.get(URL)
    .set('Authorization', `Bearer ${process.env.YELP_KEY}`);
    const newRes = mungedReviews(response.body);

    res.json(newRes);
  } catch(e) {
    res.json({ error: e.message, e });
  }
});


app.use(require('./middleware/error'));

module.exports = app;
