const express = require('express');
const port = 8080;
const app = express();
const dbConnect = require('./config/dbConnect');
// const Book = require("./model/book.model");

dbConnect();

app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.use("/uploads", express.static("uploads"));
app.use('/', require('./routes/book.route'));

app.listen(port,()=>{
  console.log(`Server start at http://localhost:${port}`);
})