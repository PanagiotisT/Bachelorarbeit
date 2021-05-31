require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });
const express = require('express');
const cors = require('cors');
const app = require('express')();
const http = require('http').Server(app);
const port = 3000;

const mongoose = require('mongoose');

// Routes
const storiesRoute = require('./routes/stories');

// Middleware functions
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Use Routes
app.use('/stories', storiesRoute);

// Server starten
http.listen(port, () => {
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
