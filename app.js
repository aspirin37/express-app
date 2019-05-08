const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const checkAuth = require('./middleware/checkAuth');

// Initialize app
const app = express();

// Connect to db
// mongodb://localhost:27017/ninjago
// mongodb+srv://test:test@cluster0-c7mkb.mongodb.net/test?retryWrites=true
mongoose
    .connect('mongodb://localhost:27017/ninjago', {
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .catch(error => console.log(error));

mongoose.Promise = global.Promise;

// Set up environment
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.end();
    }
    next();
});

// Set up routing
app.use('/api/v1/ninjas', checkAuth, require('./routes/ninjas'));
app.use('/api/v1/users', require('./routes/users'));

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 422).send({ error: error.message });
});

// // Setup socket connection
// const io = socket(app);

// io.on('connection', (socket) => {
//     console.log('Socket connected')
// })

module.exports = app;
