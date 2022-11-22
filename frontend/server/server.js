'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const publicFolder = path.resolve(__dirname, '..', 'public');

app.use(morgan('dev'));
app.use(express.static(publicFolder));

// const port = process.env.PORT || 3000;
const PORT = 8000;

// app.get("/index.js", (req, res) => {
//     res.sendFile(path.resolve(`${publicFolder}/src/index.js`));
// });

app.all('/*', (req, res) => {
    res.sendFile(path.resolve(`${publicFolder}/LoginPage.html`));
});

app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});
