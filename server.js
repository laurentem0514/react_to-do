'use strict';

//const dotEnv          = require('dotenv').config({silent: true});

const express         = require('express');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const pgPromise       = require('pg-promise');
const path            = require('path');
const homeRoute       = require('./routes/index');
const taskRoute       = require('./routes/tasks');


// tests to see if we have NODE_ENV in our environment
// only load the dotenv if we need it
const isDev = !('NODE_ENV' in process.env) && require('dotenv').config && true;

const app = express();
const port = process.argv[2] || process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.use(logger(isDev ? 'dev' : 'common'));

// Set static file root folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoute);
app.use('/tasks', taskRoute);

//  going to accept json
app.use(bodyParser.json());

// generic error handler
app.use((err, req, res, next) => {
  console.error(err, next);
  res.status(500).send('Something broke!');
});


