// Import necessary modules from React and other files
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

// Define a Function component called ProfileForm
const ProfileForm = () => {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    phone: ""
  });
  const [updatedDetails, setUpdatedDetails] = useState({
    email: "",
    name: "",
    phone: ""
  });
  const [editMode, setEditMode] = useState(false);

  // Access the navigation functionality from React Router
  const navigate = useNavigate();

  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      // Fetch user data from session storage if available, or call API to fetch it
      const email = sessionStorage.getItem("email");
      const name = sessionStorage.getItem("name");
      const phone = sessionStorage.getItem("phone");

      if (email && name && phone) {
        setUserDetails({ email, name, phone });
        setUpdatedDetails({ email, name, phone });
      } else {
        fetchUserProfile();
      }
    }
  }, [navigate]);

  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken) {
        navigate("/login");
      } else {
        const response = await fetch(`${API_URL}/api/auth/user`, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email,
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
          setUpdatedDetails(user);

          // Store fetched data in session storage
          sessionStorage.setItem("email", user.email);
          sessionStorage.setItem("name", user.name);
          sessionStorage.setItem("phone", user.phone);
        } else {
          // Handle error case
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  // Function to enable edit mode for profile details
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = updatedDetails.email; // Use the updated email from the form

      if (!authtoken) {
        navigate("/login");
        return;
      }

      // Ensure that updatedDetails is being populated correctly
      console.log("Updated Details on Submit:", updatedDetails);

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email, // Pass the updated email in headers if required
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem("email", updatedDetails.email);
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        // Display success message to the user
        alert(`Profile Updated Successfully!`);
        navigate("/");
      } else {
        // Handle error case
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  // Render the profile form with different sections based on edit mode
  return (
    <div className="profile-container">
      <div className="profile-card">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={updatedDetails.email || ""}
                disabled // Disable the email field
              />
            </label>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={updatedDetails.name || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone
              <input
                type="text"
                name="phone"
                value={updatedDetails.phone || ""}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        ) : (
          <div className="profile-details">
            <h1>Welcome, {userDetails.name}</h1>
            <p>Email: {userDetails.email}</p>
            <p>Phone: {userDetails.phone}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the ProfileForm component as the default export
export default ProfileForm;
