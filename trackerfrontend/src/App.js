import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Account from "./components/Account";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>  
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
