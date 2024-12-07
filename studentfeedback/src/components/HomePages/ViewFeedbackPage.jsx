import React , { useEffect, useState }from 'react';
import axios from 'axios';
import ResponsiveAppBarA from "../RespnsiveAppBarA";
const ViewFeedbackPage = () => {

  const [studentFeedback, setStudentFeedback] = useState([]);
  const [facultyFeedback, setFacultyFeedback] = useState([]);
  const [adminReceivedFeedback, setAdminReceivedFeedback] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all feedback for admin
  useEffect(() => {
    // Fetch feedback from all sources (students and faculty)
    axios.get('http://localhost:8080/feedback/admin')
      .then(response => {
        const allFeedback = response.data;

        // Separate feedback based on sender (student or faculty)
        const studentFeedback = allFeedback.filter(fb => fb.feedbackType === 'student');
        const facultyFeedback = allFeedback.filter(fb => fb.feedbackType === 'Faculty');
        
        setStudentFeedback(studentFeedback);
        setFacultyFeedback(facultyFeedback);
      })
      .catch(error => {
        setMessage('Error fetching feedback. Please try again.');
      });

    // Fetch feedback sent to admin (recipientId = 0)
    axios.get('http://localhost:8080/feedback/admin/received')
      .then(response => {
        setAdminReceivedFeedback(response.data);
        setLoading(false);
      })
      .catch(error => {
        setMessage('Error fetching admin feedback. Please try again.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <ResponsiveAppBarA />
      <h1 style={{ textAlign: 'center' }}>All Feedback</h1>

      {loading && <p>Loading feedback...</p>}

      {message && <p>{message}</p>}

      {/* Display Student Feedback */}
      <div>
        <h2>Feedback from Students</h2>
        {studentFeedback.length === 0 ? (
          <p>No feedback received from students yet.</p>
        ) : (
          <div>
            {studentFeedback.map((fb, index) => (
              <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
                <h4>Course: {fb.courseName} - Sender ID: {fb.senderId}</h4>
                <p><strong>Feedback:</strong> {fb.feedback}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display Faculty Feedback */}
      <div>
        <h2>Feedback from Faculty</h2>
        {facultyFeedback.length === 0 ? (
          <p>No feedback received from faculty yet.</p>
        ) : (
          <div>
            {facultyFeedback.map((fb, index) => (
              <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
                <h4>Course: {fb.courseName} - Sender ID: {fb.senderId}</h4>
                <p><strong>Feedback:</strong> {fb.feedback}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display Admin Received Feedback */}
      <div>
        <h2>Feedback Sent to Admin</h2>
        {adminReceivedFeedback.length === 0 ? (
          <p>No feedback has been sent to the admin yet.</p>
        ) : (
          <div>
            {adminReceivedFeedback.map((fb, index) => (
              <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
                <h4>Sender ID: {fb.senderId}</h4>
                <p><strong>Feedback:</strong> {fb.feedback}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



export default ViewFeedbackPage;
