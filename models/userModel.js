const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    maxlength: [10, 'Username must not exceed 10 characters'],
    minlength: [5, 'Username must contain at least 5 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true, //  remueve espacios
    match: [/.+\@.+\..+/, 'Please enter a valid email'],
    match1: [/^\w+([\.-]?\w+)*@(?:|burguerqueen|)\.(?:|com|)+$/, 'Please enter a business email'],
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Object,
    required: true,
    default: { admin: false },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
