import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import bcrypt from 'bcryptjs'
import {useNavigate} from 'react-router-dom'

const Singup = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        pass: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async e => {
        e.preventDefault();
        try {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(formData.pass, salt);

            
            const payload = {
                ...formData,
                pass: hashedPassword
              };

            console.log(payload);
              

          const response = await axios.post('http://localhost:3000/api/users',payload);

          if (response.status == 201) {
            navigate("/login"); // route to login page
          } else {
            alert("Signup failed");
          }
      
        } catch (error) {
          console.error('Error posting hotel data:', error.response?.data || error.message);
        }
      };
      
    
    
    


  return (
    <div className="signup">
        <form className='signup-form' onSubmit={handleSubmit}>
            <div className="input-div">
                <h1>
                    Enter your Name:
                </h1>
                <input type="text" name='name' required onChange={handleChange}/>
            </div>
            <div className="input-div">
                <h1>
                    Enter your Phone No:
                </h1>
                <input type="number" name='phone' required onChange={handleChange}/>
            </div>
            <div className="input-div">
                <h1>
                    Enter your email:
                </h1>
                <input type="email" name='email' required onChange={handleChange}/>
            </div>
            <div className="input-div">
                <h1>
                    Enter your Password:
                </h1>
                <input type="password" name='pass' required onChange={handleChange}/>
            </div>
            <button type='submit' className='signup-btn'>
                Signup
            </button>
            
        </form>
    </div>
  )
}

export default Singup