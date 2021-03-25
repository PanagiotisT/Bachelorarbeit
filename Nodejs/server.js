const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

const logger = require('./routes/logger');
const mongoose = require('mongoose');

// Middleware Funktionen
// Parse JSON Bodies
app.use(express.json());
// Use morgan for logging
morgan.format('logFormat', logger.morganFormat);
app.use(morgan('[:logFormat] [API CALL]   :method :url :status - :remote-addr - :response-time ms'));
// Statische Dateien bereitstellen
app.use(express.static('public'));

// Beispiel Route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Server starten
app.listen(port, () => {
    console.info(`Server listening at http://localhost:${port}`)
});

// MongoDB
mongoose.connect('mongodb://localhost:27017/ReadingTheater', { useNewUrlParser: true, useUnifiedTopology: true });

// Listen to open and error event
mongoose.connection
    .once('open', () => {
        console.info("Successfully connected to MongoDB.")
    })
    .on('error', (error) => {
        console.error(error);
    });
