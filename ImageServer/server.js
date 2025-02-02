const express = require('express');
const path = require('path');

const app = express();

const imagesDirectory = path.join(__dirname, 'movies');

app.use('/movie_images', express.static(imagesDirectory));

app.listen(8089, () => {
    console.log('Server is running on http://localhost:8089');
});
