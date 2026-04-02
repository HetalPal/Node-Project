const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
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
        default: "Employee"
    }
});

module.exports = mongoose.model("employees", employeeSchema);