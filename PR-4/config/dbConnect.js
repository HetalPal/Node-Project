const mongoose = require('mongoose');
const dbConnect = () =>{
    mongoose.connect('mongodb+srv://htlpal01_db_user:hetal0102@cluster0.4wsx3kh.mongodb.net/?appName=Cluster0/PR-4')
    .then(() => console.log("Database connected successfully"))
    .catch(() => console.log(e));
}
module.exports = dbConnect;