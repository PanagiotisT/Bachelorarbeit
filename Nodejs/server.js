const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const io = require('socket.io')
const app = express();
const port = 3000;

const logger = require('./routes/logger');
const mongoose = require('mongoose');

// Routes
const storiesRoute = require('./routes/stories');

// Middleware functions
app.use(cors());
app.use(express.json());
morgan.format('logFormat', logger.morganFormat);
app.use(morgan('[:logFormat] [API CALL]   :method :url :status - :remote-addr - :response-time ms'));
app.use(express.static('public'));

// Use Routes
app.use('/stories', storiesRoute);

// io.on für den Stream erstellen
// Auslagern in eigene Datei
// SocketIO Testing
io.on('connection', (socket) => {
    console.log('Connected');

    socket.emit('test emit', 'Data vom Server');

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

// Server starten
app.listen(port, () => {
    console.info(`Server listening at http://localhost:${port}`)
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ReadingTheater', { useNewUrlParser: true, useUnifiedTopology: true });

// Listen to open and error event
mongoose.connection
    .once('open', () => {
        console.info("Successfully connected to MongoDB.")
    })
    .on('error', (error) => {
        console.error(error);
    });
