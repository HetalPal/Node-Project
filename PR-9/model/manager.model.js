const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    mobileNumber: Number,
    profileImage: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    position: String,
    role: {
        type: String,
        default: "Manager"
    }
});

module.exports = mongoose.model("managers", managerSchema);