import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Auth/Dashboard";
import ProfileForm from "./components/Auth/ProfileForm";
import Header from "./components/header"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/profile" element={<><Header /><ProfileForm /></>} />
      </Routes>
    </Router>
  );
}

export default App;
