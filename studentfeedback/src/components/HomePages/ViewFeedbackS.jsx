import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsiveAppBarS from '../ResponsiveAppBarS';
import { Container, Box, Card, CardContent, Typography, CircularProgress, Divider } from '@mui/material';

function ViewFeedbackS() {
  const [studentFeedback, setStudentFeedback] = useState({
    facultyFeedback: [],
    adminFeedback: [],
  });
  const [facultyCourseData, setFacultyCourseData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming token contains student ID
    if (token) {
      const [id] = token.split(' ');  // Extract student ID from token
      setStudentId(id);

      // Fetch feedback sent by the student
      axios.get(`http://localhost:8080/feedback/student/${id}`)
        .then(response => {
          const feedback = response.data;
          // Separate feedback for faculty and admin
          const facultyFeedback = feedback.filter(fb => fb.recipientId !== 0);  // recipientId not 0 is for faculty
          const adminFeedback = feedback.filter(fb => fb.recipientId === 0);    // recipientId 0 is for admin
          setStudentFeedback({ facultyFeedback, adminFeedback });

          // Fetch faculty course details for each faculty in the feedback
          const facultyIds = facultyFeedback.map(fb => fb.recipientId);
          facultyIds.forEach(facultyId => {
            axios.get(`http://localhost:8080/sdp/courses/faculty-course-details?facultyId=${facultyId}`)
              .then(courseResponse => {
                setFacultyCourseData(prevData => ({
                  ...prevData,
                  [facultyId]: courseResponse.data,
                }));
              })
              .catch(error => {
                console.error('Error fetching faculty and course data:', error);
              });
          });
        })
        .catch(error => {
          setMessage('Error fetching feedback. Please try again.');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <ResponsiveAppBarS />
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Your Feedback
        </Typography>

        {message && (
          <Typography variant="h6" color="error" align="center" paragraph>
            {message}
          </Typography>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Display Faculty Feedback */}
            <Box mb={4}>
              <Typography variant="h5" gutterBottom>
                Faculty Feedback
              </Typography>
              {studentFeedback.facultyFeedback.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                  No feedback sent to faculty.
                </Typography>
              ) : (
                studentFeedback.facultyFeedback.map((feedback, index) => {
                  const facultyData = facultyCourseData[feedback.recipientId];
                  return (
                    <Card key={index} variant="outlined" sx={{ marginBottom: 3 }}>
                      <CardContent>
                        <Typography variant="h6" color="primary">
                          {facultyData ? `${facultyData.facultyName} - ${facultyData.courses.join(', ')}` : 'Loading Faculty and Course Data...'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {feedback.feedback}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </Box>

            {/* Display Admin Feedback */}
            <Box>
              <Typography variant="h5" gutterBottom>
                Admin Feedback
              </Typography>
              {studentFeedback.adminFeedback.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                  No feedback sent to admin.
                </Typography>
              ) : (
                studentFeedback.adminFeedback.map((feedback, index) => (
                  <Card key={index} variant="outlined" sx={{ marginBottom: 3 }}>
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        Admin
                      </Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {feedback.feedback}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </>
        )}
      </Container>
    </div>
  );
}

export default ViewFeedbackS;
