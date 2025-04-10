const express = require('express');
const path = require('path');

const app = express();

const movieImgDirectory = path.join(__dirname, 'movies');
const bandsImgDirectory = path.join(__dirname, 'bands');

app.use('/movie_images', express.static(movieImgDirectory));
app.use('/music_images', express.static(bandsImgDirectory));

app.listen(8089, () => {
    console.log('Server is running on http://localhost:8089');
});
