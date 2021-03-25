const express = require('express');
const app = express();
const port = 3000;

const logger = require('./routes/logger');

// Middleware Funktionen
// Parse JSON Bodies
app.use(express.json());
// Use log function from Logger
app.use(logger.log);
// Statische Dateien bereitstellen
app.use(express.static('public'));

// Beispiel Route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Server starten
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});
