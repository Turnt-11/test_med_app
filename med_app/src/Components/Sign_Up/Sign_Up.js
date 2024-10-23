import React from "react"; // Importing the necessary modules from React library
import "./Sign_Up.css"; 

function Sign_Up() {
  return (
    <div className="form-container">
      <form className="user-form">
        <h2>Registration Form</h2>

        <label htmlFor="role">Select Role:</label>
        <select id="role" name="role" required>
          <option value="">Select</option>
          <option value="Doctor">Doctor</option>
          <option value="Patient">Patient</option>
          <option value="Admin">Admin</option>
        </select>

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required placeholder="Enter your name" />

        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required placeholder="Enter your phone number" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder="Enter your email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required placeholder="Enter your password" />

        <div className="button-group">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="reset" className="reset-btn">Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Sign_Up;
