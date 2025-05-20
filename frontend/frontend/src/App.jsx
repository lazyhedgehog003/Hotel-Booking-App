import React from 'react'
import Login from './pages/Login'
import Singup from './pages/Singup'
import Mainpage from './pages/Mainpage'
import './App.css'
import { Routes, Route } from "react-router-dom";



const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Singup />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<Mainpage />}/>
      </Routes>
    </div>
  )
}

export default App