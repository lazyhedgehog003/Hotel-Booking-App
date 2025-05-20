import React, { useState } from 'react';
import axios from 'axios';

const HotelComp = ({ imgLink, hotelName, RoomsLeft, price, rating, ID }) => {
  const [noOfRooms, setNoOfRooms] = useState('');
  const [roomsLeft, setRoomsLeft] = useState(RoomsLeft); // local state to trigger re-render

  const handleChange = (e) => {
    setNoOfRooms(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noOfRooms) {
      alert("Please select number of rooms.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/booking/booked', {
        noOfRooms: parseInt(noOfRooms), // convert to number
        hotelId: ID
      });

      if (res.status === 200) {
        alert("Booking successful!");
        setRoomsLeft(prev => prev - parseInt(noOfRooms)); // update rooms left
        setNoOfRooms(''); // reset dropdown
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="hotel-div">
      <img src={imgLink} alt={hotelName} />
      <div className="hotel-info-div">
        <h2>{hotelName}</h2>
        <h2>Rating: {rating}</h2>
        <h3>Rooms Left: {roomsLeft}</h3>
        <h3>Price: Rs. {price}/night</h3>
        <h4>Book Rooms:</h4>
        <form onSubmit={handleSubmit}>
          <select name="rooms" value={noOfRooms} onChange={handleChange}>
            <option value="">--Select number of rooms--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button type="submit">BOOK NOW!</button>
        </form>
      </div>
    </div>
  );
};

export default HotelComp;
