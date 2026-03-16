const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const harshedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: harshedPassword,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json({
        status: 'failed',
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      status: 'success',
      data: user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};
