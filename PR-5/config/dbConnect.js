const mongoose = require('mongoose');

const dbConnect = () =>{
    mongoose.connect('mongodb://localhost:27017/PR-5')
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;