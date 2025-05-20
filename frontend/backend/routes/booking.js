const express = require('express');
const router = express.Router();
const HotelsSchema = require('../models/Hotels');


router.get('/', async (req, res) => {
  try {
    console.log("Helooooo");
    const Hotels = await HotelsSchema.find();
    res.status(201).json(Hotels);
  } catch (err) {
  }
});


router.post('/filtered', async (req, res) => {
    try {
        const { priceFilter, roomLeft } = req.body;
        let Hotels;
        
        if (priceFilter == '1' && roomLeft == '1') {
          // 0–2000 and rating 4.5+
          Hotels = await HotelsSchema.find({
            $and: [
              { price: { $lte: 2000 } },
              { rating: { $gte: 4.5 } }
            ]
          });
        } else if (priceFilter == '1' && roomLeft == '2') {
          // 0–2000 and rating 4–4.5
          Hotels = await HotelsSchema.find({
            $and: [
              { price: { $lte: 2000 } },
              { rating: { $gte: 4.0, $lt: 4.5 } }
            ]
          });
        } else if (priceFilter == '1' && roomLeft == '3') {
          // 0–2000 and rating < 4
          Hotels = await HotelsSchema.find({
            $and: [
              { price: { $lte: 2000 } },
              { rating: { $lt: 4.0 } }
            ]
          });
        } else if (priceFilter == '2' && roomLeft == '1') {
          // 2000–5000 and rating 4.5+
          Hotels = await HotelsSchema.find({
            $and: [
              { price: { $gt: 2000, $lte: 5000 } },
              { rating: { $gte: 4.5 } }
            ]
          });
        } else if (priceFilter == '2' && roomLeft == '2') {
          // 2000–5000 and rating 4–4.5
          Hotels = await HotelsSchema.find({
            $and: [
              { price: { $gt: 2000, $lte: 5000 } },
              { rating: { $gte: 4.0, $lt: 4.5 } }
            ]
          });
        } else if (priceFilter == '2' && roomLeft == '3') {
          // 2000–5000 and rating < 4
          Hotels = await HotelsSchema.find({
            $and: [
              { price: { $gt: 2000, $lte: 5000 } },
              { rating: { $lt: 4.0 } }
            ]
          });
        } else if (priceFilter == '3' && roomLeft == '1') {
          // 5000+ and rating 4.5+
          Hotels = await HotelsSchema.find({
            $and: [
              { price: { $gt: 5000 } },
              { rating: { $gte: 4.5 } }
            ]
          });
        } else if (priceFilter == '3' && roomLeft == '2') {
          // 5000+ and rating 4–4.5
          Hotels = await HotelsSchema.find({
            $and: [
              { price: { $gt: 5000 } },
              { rating: { $gte: 4.0, $lt: 4.5 } }
            ]
          });
        } else if (priceFilter == '3' && roomLeft == '3') {
          // 5000+ and rating < 4
          Hotels = await HotelsSchema.find({
            $and: [
              { price: { $gt: 5000 } },
              { rating: { $lt: 4.0 } }
            ]
          });
        }
        
        res.status(201).json(Hotels);
        
    } catch (err) {
    }
  });



  router.post('/booked', async (req, res) => {
    try {
        const noOfRooms = Number(req.body.noOfRooms);
        const hotelId = req.body.hotelId;
        console.log("jhbsdbvsbvhj");

        const hotel = await HotelsSchema.findById(hotelId);
        console.log(hotel);
        
        if (hotel.RoomsLeft < noOfRooms) {
            return res.status(400).json({ message: 'Not enough rooms available' });
          }
      
          hotel.RoomsLeft -= noOfRooms;
      
          await hotel.save();

          res.status(200)
      
    } catch (err) {
    }
  });



module.exports = router;