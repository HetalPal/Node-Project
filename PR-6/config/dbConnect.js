const mongoose = require('mongoose');

const dbConnect = () =>{
    mongoose.connect('mongodb+srv://htlpal01_db_user:hetal0102@cluster0.4wsx3kh.mongodb.net/PR-6')
    .then(() => console.log('DB Connected!!!'))
    .catch(err => console.log(err));
}

module.exports = dbConnect;