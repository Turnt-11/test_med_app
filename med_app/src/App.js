import './logo.svg';
import './App.css';

// Import necessary modules from React library
import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom components
import Navbar from './Components/Navbar/Navbar';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './Components/DoctorCard/DoctorCard';
import Notification from './Components/Notification/Notification';
import Reviews from './Components/ReviewForm/Reviews';
import ProfileForm from './Components/ProfileCard/ProfileCard';
// Function component for the main App
function App() {
  // Render the main App component
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Display the Navbar component */}
        <Navbar />
        
        {/* Display the Notification component on all pages */}
        <Notification />
        
        {/* Set up the Routes for different pages */}
        <Routes>
          {/* Define individual Route components for different pages */}
          <Route path="/" element={<Landing_Page />} />
          <Route path="/Sign_Up" element={<Sign_Up />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/FindDoctorSearch" element={<BookingConsultation />} />
          <Route path="/Reviews" element={<Reviews/>}/>
          <Route path="/Profile" element={<ProfileForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
