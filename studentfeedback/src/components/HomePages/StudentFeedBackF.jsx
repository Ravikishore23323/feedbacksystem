import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsiveAppBarS from '../ResponsiveAppBarS';

function StudentFeedBackF() {
  const [courses, setCourses] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [studentId, setStudentId] = useState(null);

  // Fetch student data and registered courses
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming token contains the student ID
    if (token) {
      const [id] = token.split(' ');  // Extract student ID from token
      setStudentId(id);

      // Fetch courses for the student
      axios.get(`http://localhost:8080/sdp/courses/registered?studentId=${id}`)
        .then(response => setCourses(response.data))
        .catch(error => console.error("Error fetching courses:", error));
    }
  }, []);

  // Handle sending feedback
  const handleSendFeedback = () => {
    if (!selectedFaculty || !feedback.trim()) {
      setMessage('Please select a faculty and provide feedback.');
      return;
    }

    // Construct feedback object
    console.log("Faculty ID:", selectedFaculty.id);
    console.log("Feedback:", feedback);
    console.log("Courses:", courses);
    const feedbackData = {
      senderId: studentId,
      recipientId: selectedFaculty.id,
      feedbackType: 'student', // As the feedback is from a student
      feedback: feedback,
    };

    // Send feedback to backend
    axios.post('http://localhost:8080/feedback/send', feedbackData)
      .then(response => {
        setMessage('Feedback sent successfully!');
        setFeedback('');
        setSelectedFaculty(null);
      })
      .catch(error => {
        setMessage('Error sending feedback. Please try again.');
        console.error(error);
      });
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <ResponsiveAppBarS />
      <h1 style={{ textAlign: 'center' }}>Send Feedback to Faculty</h1>

      {message && <p>{message}</p>}

      <h2>Registered Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div>
          <h3>Select a Faculty</h3>
          <select
            onChange={(e) => setSelectedFaculty(JSON.parse(e.target.value))}
            value={selectedFaculty ? JSON.stringify(selectedFaculty) : ''}
          >
            <option value="">Select Faculty</option>
            {courses.map((course) => (
              <option key={course.id} value={JSON.stringify(course.faculty)}>
                {course.faculty.name} - {course.courseName}
              </option>
            ))}
          </select>
        </div>
      )}

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
          disabled={!selectedFaculty || !feedback.trim()} // Disable button if faculty is not selected or feedback is empty
        >
          Send Feedback
        </button>
      </div>
    </div>
  );
}

export default StudentFeedBackF;
