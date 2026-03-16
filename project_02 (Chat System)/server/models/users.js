const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email is required!'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email'],
    },

    username: {
      type: String,
      required: [true, 'username is required!'],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'password is required!'],
      minlength: 6,
    },
  },
  { collection: 'users' },
);

module.exports = mongoose.model('User', userSchema);
