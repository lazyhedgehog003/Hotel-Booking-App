import React from 'react'
import './Mainpage.css'
import HotelComp from '../components/HotelComp';
import { useEffect, useState } from 'react';
import axios from 'axios'

const Mainpage = () => {

    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const {email, name, pass, phone} = storedUser;
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        // Fetch hotel data from backend
        axios.get('http://localhost:3000/api/booking')
          .then(response => {
            setHotels(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching hotel data:', error);
          });
      }, []); 

    
      const [filters, setFilters] = useState({
        priceFilter: '',
        roomLeft: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
          ...prev,
          [name]: value
        }));
      };

      const handleSubmit = async e => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/api/booking/filtered',filters);
        setHotels(response.data);
      };
    
    
    


  return (
    <div className='mainpage'>
        <h1>Welcome {name}</h1>

        <form onSubmit={handleSubmit}>
            <select name="priceFilter" value={filters.priceFilter} onChange={handleChange} required>
                <option value="">--Select range for room price--</option>
                <option value='1' >0 - 2000</option>
                <option value="2">2000 - 5000</option>
                <option value="3">5000+</option>
            </select>
            <select name="roomLeft" value={filters.roomLeft} onChange={handleChange} required>
                <option value="">--Select hotel rating--</option>
                <option value='1' >4.5 star +</option>
                <option value="2">4 - 4.5 star</option>
                <option value="3">less than 4 star</option>
            </select>

            <button type='submit'>
                FIND!!
            </button>
        </form>



        {hotels.length === 0 ? (
            <h1>No Results Found</h1>
            ) : (
            hotels
                .filter(val => val.RoomsLeft > 0)
                .map((val, index) => (
                <HotelComp
                    key={index}
                    imgLink={val.imgLink}
                    hotelName={val.hotelName}
                    RoomsLeft={val.RoomsLeft}
                    price={val.price}
                    rating={val.rating}
                    ID = {val._id}
                />
                ))
        )}

    </div>
  )
}

export default Mainpage