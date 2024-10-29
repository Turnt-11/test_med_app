import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfApp, setDOA] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
  

    const timeSlots = [];
    for (let i = 9; i <= 17; i++) {
        const timeString = i < 10 ? `0${i}:00` : `${i}:00`;
        timeSlots.push(timeString);
    }

    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ doctorName, doctorSpeciality, name, phoneNumber, dateOfApp, selectedSlot });
      setName('');
      setPhoneNumber('');
      setDOA('');
      setSelectedSlot('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form" method="POST">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfApp">Date of Appointment:</label>
          <input
            type="date"
            id="dateOfApp"
            value={dateOfApp}
            onChange={(e) => setDOA(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <label htmlFor="selectedSlot">Book Time Slot:</label>
            <select
            id="selectedSlot"
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            required
            >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                {slot}
                </option>
            ))}
            </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm
