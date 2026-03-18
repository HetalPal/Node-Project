const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryname: String,
    categoryImg: String
});

module.exports = mongoose.model('Category', categorySchema);