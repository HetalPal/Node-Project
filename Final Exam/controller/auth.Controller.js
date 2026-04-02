const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    res.status(201).json({
      success: true,
      msg: "User Registered",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Register Error",
      error: error.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Wrong password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      success: true,
      msg: "Login success",
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Login Error",
      error: error.message,
    });
  }
};