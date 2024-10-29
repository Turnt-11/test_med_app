import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";



const Navbar = () => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const[email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }



  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
    useEffect(() => {
        const storedemail = sessionStorage.getItem("email");
        
        if (storedemail) {
          // Extract only letters, numbers, _ and - before the @ symbol using regex
          const match = storedemail.match(/^[a-zA-Z0-9_-]+/);
          const username = match ? match[0] : storedemail; // Default to the entire email if no match found
          setIsLoggedIn(true);
          setUsername(username);
        }
      }, []);
      

  return (
    <header>
      <nav className="navbar">
        <Link to="/"><div className="logo">
          StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i>
        </div></Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/FindDoctorSearch">Appointments</Link></li>
          <li><Link to="/blog">Health Blog</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
        </ul>


        {isLoggedIn?(
          <>
          <div className="auth-buttons">
      <div className="nav-links">
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            Welcome, {username}
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <a href="/profile">Your Profile</a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <button className="pill-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
            
          </>
        ) : (
          <>
            <div className="auth-buttons">
          <Link to="/Sign_Up" className="pill-button signup-btn">Sign Up</Link>
          <Link to="/Login" className="pill-button login-btn">Login</Link>
        </div>
          </>
        )}

        
      </nav>
    </header>
  );
}

export default Navbar;
