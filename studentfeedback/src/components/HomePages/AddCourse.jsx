import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import ResponsiveAppBarA from "../RespnsiveAppBarA";

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null); // For dropdown selection
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch available faculty on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8080/sdp/courses/available-faculty')
      .then((response) => {
        setFacultyList(response.data); // Assuming response.data is an array of faculty objects
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load faculty list.');
        setLoading(false);
      });
  }, []);

  const handleSubmit = () => {
    if (!courseName || !courseCode || (!selectedFaculty)) {
      setError('Please fill in all fields and select faculty.');
      return;
    }

    setError('');
    setLoading(true);

    const facultyId = selectedFaculty;
    axios
      .post(
        `http://localhost:8080/sdp/courses/add?courseName=${encodeURIComponent(
          courseName
        )}&courseCode=${encodeURIComponent(courseCode)}&facultyId=${facultyId}`
      )
      .then(() => {
        setSuccess('Course added successfully!');
        setCourseName('');
        setCourseCode('');
        setSelectedFaculty(null);
      })
      .catch(() => {
        setError('Failed to add course.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <ResponsiveAppBarA />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',  // Center vertically
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Course
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        {success && (
          <Typography variant="body1" color="success.main" gutterBottom>
            {success}
          </Typography>
        )}

        {!loading && (
          <Box component="form" noValidate autoComplete="off" sx={{ maxWidth: 400, width: '100%' }}>
            <TextField
              fullWidth
              label="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              margin="normal"
            />

            <Typography variant="h6" gutterBottom>
              Select Faculty
            </Typography>

            {/* Dropdown for selecting faculty */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="faculty-select-label">Available Faculty</InputLabel>
              <Select
                labelId="faculty-select-label"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                label="Available Faculty"
              >
                {facultyList.map((faculty) => (
                  <MenuItem key={faculty.id} value={faculty.id}>
                    {faculty.name} - {faculty.dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
              Add Course
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AddCourse;
