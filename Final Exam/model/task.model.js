const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title : String,
    description : String,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
});

module.exports = mongoose.model("task", taskSchema);