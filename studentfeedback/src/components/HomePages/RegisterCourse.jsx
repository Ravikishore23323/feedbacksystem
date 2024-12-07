import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsiveAppBarS from '../ResponsiveAppBarS';

function RegisterCourse() {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);  // To hold the registered courses
  const [studentId, setStudentId] = useState(null);  // This will hold the studentId
  const [message, setMessage] = useState("");

  // Fetch the token and extract the student ID when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      // Assuming the token is in the format "id role"
      const [id] = token.split(' ');  // Split by space and get the first part (the ID)
      setStudentId(id);  // Set the student ID in the state

      // Fetch courses the student is already registered for
      axios.get(`http://localhost:8080/sdp/courses/registered`, {
        params: { studentId: id }
      })
        .then((response) => setRegisteredCourses(response.data))
        .catch((error) => console.error("Error fetching registered courses:", error));
    }
    
    // Fetch available courses
    axios.get('http://localhost:8080/sdp/courses/all')
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Handle course registration
  const handleRegister = (courseId) => {
    if (studentId) {
      axios.post('http://localhost:8080/sdp/courses/register', null, {
        params: { courseId, studentId },
      })
        .then((response) => setMessage(response.data))
        .catch((error) => setMessage(error.response?.data || "Error registering for course."));
    } else {
      setMessage('Student ID is not available.');
    }
  };

  // Filter out already registered courses from the available courses
  const availableCourses = courses.filter(course => 
    !registeredCourses.some(registeredCourse => registeredCourse.id === course.id)
  );

  return (
    <div style={{ marginTop: '100px' }}>
      <ResponsiveAppBarS />
      <h1 style={{ textAlign: 'center' }}>Register for a Course</h1>
      {message && <p>{message}</p>}
      <h2>Available Courses</h2>
      {availableCourses.length === 0 ? (
        <p>No available courses to register.</p>
      ) : (
        <ul>
          {availableCourses.map((course) => (
            <li key={course.id}>
              {course.courseName} ({course.courseCode})
              <button onClick={() => handleRegister(course.id)}>Register</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RegisterCourse;
