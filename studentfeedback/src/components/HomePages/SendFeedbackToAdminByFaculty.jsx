import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container } from '@mui/material';

import ResponsiveAppBar from "../ResponsiveAppBar";

function SendFeedbackToAdminByFaculty() {
  const [feedbackContent, setFeedbackContent] = useState('');
  const [message, setMessage] = useState('');

  // Get facultyId from token (assuming the token contains facultyId)
  const token = localStorage.getItem('token');
  const [facultyId] = token ? token.split(' ') : [null];  // Extract faculty ID from token

  const handleSendFeedback = () => {
    // Check if feedback content is not empty
    if (!feedbackContent.trim()) {
      setMessage("Please provide feedback content.");
      return;
    }

    // Create the feedback object
    const feedback = {
      senderId: facultyId,  // senderId is the facultyId from the token
      recipientId: 0,  // recipientId 0 means admin
      feedback: feedbackContent,
      feedbackType: "Faculty",  // Set feedbackType as "Faculty"
    };

    // Send the feedback to the backend
    axios.post('http://localhost:8080/feedback/send', feedback)
      .then((response) => {
        setMessage('Feedback sent to admin successfully.');
        setFeedbackContent('');
      })
      .catch((error) => {
        setMessage('Error sending feedback. Please try again.');
        console.error(error);
      });
  };

  return (
    <div>
    <ResponsiveAppBar />
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>Send Feedback to Admin</Typography>
      
      {/* TextField for feedback content */}
      <TextField
        fullWidth
        label="Enter Feedback"
        multiline
        rows={4}
        value={feedbackContent}
        onChange={(e) => setFeedbackContent(e.target.value)}
        variant="outlined"
        style={{ marginBottom: '20px' }}
      />
      
      {/* Button to send feedback */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendFeedback}
        fullWidth
      >
        Send Feedback
      </Button>

      {/* Display message after sending feedback */}
      {message && <Typography variant="body1" color="textSecondary" style={{ marginTop: '20px' }}>{message}</Typography>}
    </Container>
    </div>
  );
}

export default SendFeedbackToAdminByFaculty;
