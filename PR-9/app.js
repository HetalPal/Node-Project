const express = require('express');
const app = express();
const port = 8080;
const dbConnect = require('./config/dbConnect');

// Db connection
dbConnect();

// middlerware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', require('./routes/index.routes'));

app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
})