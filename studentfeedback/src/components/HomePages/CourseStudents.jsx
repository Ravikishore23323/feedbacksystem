import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResponsiveAppBar from "../ResponsiveAppBar";
function CourseStudents() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [facultyId, setFacultyId] = useState(null);

  // Fetch the token and extract the faculty ID when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      const [id, role] = token.split(' ');  // Assuming the token contains the ID and role
      if (role === 'Faculty') {
        setFacultyId(id);  // Set the faculty ID in state if the role is Faculty
      } else {
        console.error("Unauthorized access: User is not a faculty.");
      }
    } else {
      console.error("No token found.");
    }

    if (facultyId) {
      // Fetch courses taught by the faculty
      axios.get(`http://localhost:8080/sdp/courses/all`)
        .then((response) => setCourses(response.data.filter(course => course.faculty.id === parseInt(facultyId))))
        .catch((error) => console.error("Error fetching courses:", error));
    }
  }, [facultyId]);

  // Fetch students for the selected course
  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
    axios.get('http://localhost:8080/sdp/courses/students', {
      params: { facultyId, courseId },
    })
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <ResponsiveAppBar />
      <h1>View Registered Students</h1>
      <h2>Your Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.courseName} ({course.courseCode})
              <button onClick={() => handleSelectCourse(course.id)}>View Students</button>
            </li>
          ))}
        </ul>
      )}
      {selectedCourse && (
        <>
          <h2>Students Registered for {courses.find(c => c.id === selectedCourse)?.courseName}</h2>
          {students.length === 0 ? (
            <p>No students registered for this course.</p>
          ) : (
            <ul>
              {students.map((student) => (
                <li key={student.id}>
                  {student.name} ({student.email})
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default CourseStudents;
