import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  // Define the URL of the PDF file stored in the public folder
  const reportUrl = `${process.env.PUBLIC_URL}/patient_report.pdf`;

  return (
    <div className="reports-container">
      <h2>Your Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>1</td>
            <td>Dr. Smith</td>
            <td>Cardiologist</td>
            <td><button><a href={reportUrl} target="_blank" rel="noopener noreferrer">
                View Report
              </a></button></td>
            <td><button><a href={reportUrl} download="patient_report.pdf">
                Download Report
              </a></button></td>

          </tr>
          <tr>
            <td>2</td>
            <td>Dr. Johnson</td>
            <td>Dermatologist</td>
            <td><button><a href={reportUrl} target="_blank" rel="noopener noreferrer">
                View Report
              </a></button></td>
            <td><button><a href={reportUrl} download="patient_report.pdf">
                Download Report
              </a></button></td>
        </tr>

        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
