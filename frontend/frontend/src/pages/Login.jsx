import React from 'react'
import './Login.css'
import { useState } from 'react'
import bcrypt from 'bcryptjs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        pass: ''
    });

    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = async e => {
        e.preventDefault();
        try {

            // const salt = await bcrypt.genSalt(10);
            // const hashedPassword = await bcrypt.hash(formData.pass, salt);

            
            // const payload = {
            //     ...formData,
            //     pass: hashedPassword
            //     };
                

            const response = await axios.post('http://localhost:3000/api/users/login',formData);
            console.log(response);

            if (response.status == 201) {
                localStorage.setItem("userData", JSON.stringify(response.data));
                navigate("/dashboard");
            } else {
            alert("Login failed");
            }
        
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
        };



  return (
    <div className='login'>
        <form className='login-form' onSubmit={handleSubmit}>
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
            <button type='submit' className='login-btn'>
                Login
            </button>
            
        </form>
    </div>
  )
}

export default Login