const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    language : String,
    category : String,
    date : String,
    rate : String,
    time : String,
    image : {type : String, default:""},
})
   
module.exports = mongoose.model('Movie', movieSchema);