const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    pass: String,
    userId: Number,
  });


  module.exports = mongoose.model('Users', UsersSchema);