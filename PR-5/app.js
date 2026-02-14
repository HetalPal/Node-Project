const express = require('express');
const app = express();
const port = 8080;
const dbConnect = require('./config/dbConnect');

dbConnect();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const movieRoutes = require('./routes/movie.routes');
app.use('/', movieRoutes);   // ✅ only once

app.listen(port, () => {
    console.log(`Server Start at http://localhost:${port}`);
});