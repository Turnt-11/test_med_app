import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          StayHealthy
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/appointments">Appointments</Link></li>
          <li><Link to="/blog">Health Blog</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
        </ul>
        <div className="auth-buttons">
          <Link to="/Sign_Up" className="pill-button signup-btn">Sign Up</Link>
          <Link to="/Login" className="pill-button login-btn">Login</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
