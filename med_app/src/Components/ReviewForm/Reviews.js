import React, { useState, useEffect } from "react";
import "./Reviews.css";

const Reviews = () => {
  // Retrieve data from local storage or initialize with default values
  const initialDoctors = JSON.parse(localStorage.getItem("doctors")) || [
    { id: 1, name: "Dr. Smith", specialty: "Cardiologist", review: "" },
    { id: 2, name: "Dr. Johnson", specialty: "Dermatologist", review: "" },
  ];

  const [doctors, setDoctors] = useState(initialDoctors);
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [userName, setUserName] = useState(""); // Define state for user name
  const [rating, setRating] = useState(""); // Define state for rating

  // Use effect to update local storage whenever the doctors state changes
  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const openForm = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFeedback("");
    setUserName("");
    setRating("");
  };

  const submitFeedback = () => {
    // Create a review string with user details
    const review = `Name: ${userName}, Rating: ${rating}/5, Feedback: ${feedback}`;
    
    // Update the state with the new review details
    setDoctors((prevDoctors) =>
      prevDoctors.map((doc) =>
        doc.id === selectedDoctor.id ? { ...doc, review } : doc
      )
    );

    closeForm();
  };

  return (
    <div className="reviews-container">
      <table className="reviews-table">
        <thead>
          <tr>
            <th>ID Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>
                <button
                  onClick={() => openForm(doctor)}
                  disabled={!!doctor.review} // Disables button if review is non-empty
                >
                  Provide Feedback
                </button>
              </td>
              <td>{doctor.review || "No review given yet"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="form-popup">
          <h2>Submit Feedback for {selectedDoctor.name}</h2>
          
          {/* Name Input Field */}
          <div>
            <label htmlFor="userName">Your Name:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          {/* Feedback Text Area */}
          <div>
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              name="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here"
            ></textarea>
          </div>
          
          {/* Rating Dropdown */}
          <div>
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Rate the doctor</option>
              <option value="1">1 - Very Poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          {/* Submit and Cancel Buttons */}
          <div>
            <button onClick={submitFeedback}>Submit</button>
            <button onClick={closeForm}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
