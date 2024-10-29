import React, { useState } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Smith", specialty: "Cardiologist", review: "" },
    { id: 2, name: "Dr. Johnson", specialty: "Dermatologist", review: "" },
    // Add more initial doctors if needed
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [feedback, setFeedback] = useState("");

  const openForm = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFeedback("");
  };

  const submitFeedback = () => {
    setDoctors((prevDoctors) =>
      prevDoctors.map((doc) =>
        doc.id === selectedDoctor.id ? { ...doc, review: feedback } : doc
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
                <button onClick={() => openForm(doctor)}>Provide Feedback</button>
              </td>
              <td>{doctor.review || "No review given yet"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="form-popup">
          <h2>Submit Feedback for {selectedDoctor.name}</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here"
          ></textarea>
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
