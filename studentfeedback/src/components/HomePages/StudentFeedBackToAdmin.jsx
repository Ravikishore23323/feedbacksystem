import React, { useState,useEffect } from 'react';
import axios from 'axios';
import ResponsiveAppBarS from '../ResponsiveAppBarS';

function StudentFeedBackToAdmin() {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [studentId, setStudentId] = useState(null);

  // Fetch student ID from localStorage (assuming token contains student ID)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const [id] = token.split(' ');  // Assuming token format is "studentId token_value"
      setStudentId(id);
    }
  }, []);

  // Handle sending feedback to Admin
  const handleSendFeedback = () => {
    if (!feedback.trim()) {
      setMessage('Please provide feedback.');
      return;
    }

    // Construct feedback data for admin
    const feedbackData = {
      senderId: studentId,
      recipientId: 0,  // Special recipient ID for admin
      feedbackType: 'student',
      feedback: feedback,
    };

    // Send feedback to backend
    axios.post('http://localhost:8080/feedback/send', feedbackData)
      .then(response => {
        setMessage('Feedback sent successfully to admin!');
        setFeedback('');  // Clear the feedback input field
      })
      .catch(error => {
        setMessage('Error sending feedback to admin. Please try again.');
        console.error(error);
      });
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <ResponsiveAppBarS />
      <h1 style={{ textAlign: 'center' }}>Send Feedback to Admin</h1>

      {message && <p>{message}</p>}

      <div>
        <h3>Feedback Message</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here"
          rows="5"
          style={{ width: '100%', padding: '10px' }}
        />
      </div>

      <div>
        <button
          onClick={handleSendFeedback}
          style={{ padding: '10px 20px', marginTop: '20px' }}
          disabled={!feedback.trim()} // Disable button if feedback is empty
        >
          Send Feedback to Admin
        </button>
      </div>
    </div>
  );
}

export default StudentFeedBackToAdmin;
