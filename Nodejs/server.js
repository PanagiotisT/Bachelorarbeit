const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }});
const port = 3000;

const fs = require('fs');
const Blob = require('cross-blob');
const logger = require('./routes/logger');
const mongoose = require('mongoose');

// Routes
const storiesRoute = require('./routes/stories');

// Middleware functions
app.use(cors());
app.use(express.json());
// morgan.format('logFormat', logger.morganFormat);
// app.use(morgan('[:logFormat] [API CALL]   :method :url :status - :remote-addr - :response-time ms'));
app.use(express.static('public'));

// Use Routes
app.use('/stories', storiesRoute);

io.on('connection', (socket) => {
    console.info(`Client-socket with id ${socket.id} connected successfully.`);
    const audioFilePath = `./output/${socket.id}.wav`;
    let blobsArray = [];

    socket.emit('test emit', 'Data vom Server');

    // Für die Echtzeit später
    socket.on('start-record-audio', (blob) => {
        console.log('start recording blob');
        // Wenn client schon einmal aufgenommen hat dann lösche die aktuelle audio
        console.log(blob);
        blobsArray.push(blob);
    });

    socket.on('stop-record-audio', (blob) => {
        console.log('stop recording blob');
        try {
            if (fs.existsSync(audioFilePath)) {
                fs.unlinkSync(audioFilePath);
            }
            fs.appendFileSync(audioFilePath,  Buffer.from(blob));
        } catch(error) {
            console.log(error);
        }
        blobsArray = [];
    })

    socket.on('disconnect', () => {
        console.info(`Client-socket with id ${socket.id} disconnected.`);
    });
});

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
