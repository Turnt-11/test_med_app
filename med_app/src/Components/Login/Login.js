import React from "react"; // Importing the necessary modules from React library
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Enter your password"
        />

        <div className="button-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="reset" className="reset-btn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
