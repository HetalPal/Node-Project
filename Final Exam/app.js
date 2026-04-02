require('dotenv').config();
const express = require('express');
const app = express();
const dbConnect = require('./config/dbConnect');

// DB Connection
dbConnect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", require("./routes/auth.route"));
app.use("/api", require("./routes/task.route"));

app.listen(process.env.PORT, () => {
    console.log(`Server Start at http://localhost:${process.env.PORT}`);
});