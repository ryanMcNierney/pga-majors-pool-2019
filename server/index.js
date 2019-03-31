const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev')); //logging middleware
app.use(express.static(path.join(__dirname, '../public'))); //static files
app.use(express.urlencoded({ extended: true })); //body parsing
app.use(express.json()) //body parsing
app.use('/api', require('./api')) // matches all requests to /api

//all initial requests load the html page
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

//500 error handling
app.use(function (err, req, res, next) {
  console.error(err)
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.')
});

module.exports = app
