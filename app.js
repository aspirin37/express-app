const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Initialize app
const app = express();

// Connect to db
mongoose.connect('mongodb://localhost/ninjago', {
    useNewUrlParser: true,
    useFindAndModify: false,
});
mongoose.Promise = global.Promise;

// Set up environment
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up routing
app.use('/api', require('./routes/api'));

// Error handling
app.use((error, req, res, next) => {
    res.status(422).send({ error: error.message });
})

module.exports = app;
