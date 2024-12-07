import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsiveAppBarS from '../ResponsiveAppBarS';

function ViewFeedbackF() {
  const [feedback, setFeedback] = useState([]);
  const [message, setMessage] = useState('');
  const [facultyId, setFacultyId] = useState(null);  // Faculty ID to fetch feedback
  const [loading, setLoading] = useState(true);

  // To get the faculty ID from the token (you can adjust this as per your auth mechanism)
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming token contains faculty ID
    if (token) {
      const [id] = token.split(' '); // Extract faculty ID from token
      setFacultyId(id);
    }
  }, []);

  // Fetch feedback for the faculty when the component is mounted
  useEffect(() => {
    if (facultyId) {
      axios.get(`http://localhost:8080/feedback/faculty/${facultyId}`)
        .then(response => {
          setFeedback(response.data);
          setLoading(false);
        })
        .catch(error => {
          setMessage('Error fetching feedback. Please try again.');
          setLoading(false);
        });
    }
  }, [facultyId]);

  return (
    <div style={{ marginTop: '100px' }}>
      <ResponsiveAppBarS />
      <h1 style={{ textAlign: 'center' }}>Your Feedback</h1>

      {loading && <p>Loading feedback...</p>}

      {message && <p>{message}</p>}

      {/* Display Feedback for Faculty */}
      <div>
        {feedback.length === 0 ? (
          <p>No feedback received yet.</p>
        ) : (
          <div>
            {feedback.map((fb, index) => (
              <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
                <h4>Feedback for Faculty</h4>
                <p><strong>Feedback:</strong> {fb.feedback}</p>
                <p><strong>Recipient:</strong> Admin</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewFeedbackF;
