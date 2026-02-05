const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookid: String,
    bookname: String,   
    authorname: String,
    price: Number,
    quantity: Number,
    language: String,
    category: String,
    img: String
});

module.exports = mongoose.model("Book", bookSchema);
