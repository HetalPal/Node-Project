const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  description: String,
  image: String
}, { timestamps: true }); 

module.exports = mongoose.model('Blog', blogSchema);