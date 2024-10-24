// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router
    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

  return (
    <div className="form-container">
      <form className="user-form" method="POST" onSubmit={register}>
        <h2>Registration Form</h2>

        <label htmlFor="role">Select Role:</label>
        <select id="role" name="role" required>
          <option value="">Select</option>
          <option value="Doctor">Doctor</option>
          <option value="Patient">Patient</option>
          <option value="Admin">Admin</option>
        </select>

        <label htmlFor="name">Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" required placeholder="Enter your name" />
        {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}

        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required placeholder="Enter your phone number" />
        {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}

        <label htmlFor="email">Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required placeholder="Enter your email" />
        {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
        
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required placeholder="Enter your password" />
        {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}

        <div className="button-group">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="reset" className="reset-btn">Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Sign_Up;
