require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/handle-error');

const PORT = 5000;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // res.setHeader Native node method.
  // Sets a header value for implicit headers

  // The resource can be accessed by any domain(*)
  // You can also match the specific origin provided in
  // the request's Origin header
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    // Origin, X-Requested-With, and Accept are set by the browser
    'Origin, X-Requested-With, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// default route handler
app.use((req, res, next) => {
  return next(new HttpError('Could not find the requested page', 404));
});

// Global error handler
app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  return res.status(err.code || 500).json({
    message: err.message || 'An unknown error occurred. Please try again later',
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected to db`);

    app.listen(PORT, () => {
      console.log(`listening to ${PORT || 5000}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
