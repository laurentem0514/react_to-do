const home = require('express').Router();

home.get('/', (req, res) => {
  res.json('home!');
});

module.exports = home;

