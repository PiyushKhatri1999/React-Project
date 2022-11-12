import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import AppAndNav from './components/pages/AppAndNav';



function App(props) {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="signup" element={<Signup />} />
          <Route path="appandnav" element={<AppAndNav />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;