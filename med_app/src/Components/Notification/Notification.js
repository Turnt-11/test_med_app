import React, { useEffect, useState } from 'react';
import './Notification.css'; // Assuming you have a CSS file for Notification styles

const Notification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  let storedDoctorData = JSON.parse(localStorage.getItem('Dr. Jiao Yang'));

// Check if it is null (doesn't exist in localStorage) and initialize it if necessary
if (!storedDoctorData) {
  storedDoctorData = [];
  localStorage.setItem('Dr. Jiao Yang', JSON.stringify(storedDoctorData));
}

  useEffect(() => {
    // Retrieve stored username from sessionStorage
    const storedUsername = sessionStorage.getItem('email');
    // Retrieve doctor data and appointment data from localStorage
    const storedDoctorData = JSON.parse(localStorage.getItem('Dr. Jiao Yang'));
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
    if (storedDoctorData) {
      setAppointmentData(storedDoctorData);
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

    const appointmentDataPassed = storedDoctorData.length > 0 ? true : false;
  // Debugging logs to verify the state inside the return
  console.log("isLoggedIn2:", isLoggedIn);
  console.log("isNotificationVisible2:", isNotificationVisible);
  console.log("doctorData2:", storedDoctorData[0]?.name);
  console.log("appointmentData2:", storedDoctorData[0]?.doctorName);

  return (
    <div className="notification-container">
      {isLoggedIn && appointmentDataPassed && isNotificationVisible ? (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {storedDoctorData[0]?.doctorName || "N/A"}<br />
              <strong>Specialty:</strong> {storedDoctorData[0]?.doctorSpeciality || "N/A"}<br />
              <strong>Patient:</strong> {storedDoctorData[0]?.name}<br />
              <strong>Phone Number:</strong> {storedDoctorData[0]?.phoneNumber || "N/A"}<br />
              <strong>Date:</strong> {storedDoctorData[0]?.dateOfApp || "N/A"}<br />
              <strong>Time:</strong> {storedDoctorData[0]?.selectedSlot || "N/A"}
            </p>

            {/* <button className="cancel-button" onClick={handleCancelAppointment}>
              Cancel Appointment
            </button> */}
          </div>
        </div>
      ) : (
        // Debugging message if the condition fails
        <div className="debug-message">
        </div>
      )}
    </div>
  );
};

export default Notification;
