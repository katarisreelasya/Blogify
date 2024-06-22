import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Addpage from './pages/Addpage';
import Cardblock from './components/Cardblock';
import Home from './components/Home';
import Login from './components/auth/login/index'
import Signup from './components/auth/register/index'
import { AuthProvider } from "./contexts/authContext/index";
import { Notfound } from './components/Notfound';




export const Main = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Addpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cards" element={<Cardblock />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}
