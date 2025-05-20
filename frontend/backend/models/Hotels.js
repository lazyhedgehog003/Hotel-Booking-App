const mongoose = require('mongoose');


const HotelSchema = new mongoose.Schema({
    imgLink: String,
    hotelName: String,
    RoomsLeft: Number,
    price: Number,
    rating: Number 
  });


  module.exports = mongoose.model('Hotels', HotelSchema);