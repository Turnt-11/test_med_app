import React, { useEffect, useState } from 'react';
import './Notification.css'; // Assuming you have a CSS file for Notification styles

const Notification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  useEffect(() => {
    // Retrieve stored username from sessionStorage
    const storedUsername = sessionStorage.getItem('email'); 
    // Retrieve doctor data and appointment data from localStorage
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    
    // Check if doctor data is present before accessing its name to fetch appointment data
    const storedAppointmentData = storedDoctorData 
      ? JSON.parse(localStorage.getItem(storedDoctorData.name)) 
      : null;

    // Debugging logs to verify retrieval
    console.log("Stored Username:", storedUsername);
    console.log("Stored Doctor Data:", storedDoctorData);
    console.log("Stored Appointment Data:", storedAppointmentData);

    // Set isLoggedIn state and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    // Set appointmentData state if storedAppointmentData exists and show the notification
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setIsNotificationVisible(true);
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  const handleCancelAppointment = () => {
    // Clear appointment data and hide the notification
    setAppointmentData(null);
    setIsNotificationVisible(false);

    // Remove from localStorage using the doctor’s name as the key
    if (doctorData && doctorData.name) {
      localStorage.removeItem(doctorData.name);
    }
  };

  // Debug: Log the current states before returning JSX
  console.log("Rendering Notification:");
  console.log("isLoggedIn:", isLoggedIn);
  console.log("isNotificationVisible:", isNotificationVisible);
  console.log("doctorData:", doctorData);
  console.log("appointmentData:", appointmentData);

  return (
    <div className="notification-container">
      {isLoggedIn && appointmentData && isNotificationVisible (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name || "N/A"}<br />
              <strong>Patient:</strong> {username}<br />
              <strong>Date:</strong> {appointmentData?.date || "N/A"}<br />
              <strong>Time:</strong> {appointmentData?.time || "N/A"}
            </p>
            <button className="cancel-button" onClick={handleCancelAppointment}>
              Cancel Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
