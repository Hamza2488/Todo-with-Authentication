
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from '../screen/login';
import Signup from '../screen/signup';
import Home from '../screen/home';
import ResponsiveDrawer from '../screen/dashboard';

const Approute = () => {
  return (
    <>
    <Router>
        
        <Routes> 
            <Route path='home/:id' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='/' element={<Signup />} />
            <Route path='dashboard' element={<ResponsiveDrawer />} />
        </Routes>
    </Router>
    </>
  )
}

export default Approute