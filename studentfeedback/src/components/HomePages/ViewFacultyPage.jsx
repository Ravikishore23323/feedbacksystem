import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import ResponsiveAppBarA from "../RespnsiveAppBarA";
const ViewFacultyPage = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch faculty data when the component is mounted
  useEffect(() => {
    axios.get('http://localhost:8080/sdp/getfaculty')
      .then((response) => {
        setFacultyList(response.data); // Assuming response.data contains the list of faculty
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load faculty list. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Render the faculty list in a table
  const renderFacultyList = () => {
    if (facultyList.length === 0) {
      return (
        <div>
        <ResponsiveAppBarA />
        <Typography variant="body1" color="textSecondary">
          No faculty members available.
        </Typography>
        </div>
      );
    }

    return (
      <div>
        <ResponsiveAppBarA />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facultyList.map((faculty) => (
              <TableRow key={faculty.email}>
                <TableCell>{faculty.name}</TableCell>
                <TableCell>{faculty.email}</TableCell>
                <TableCell>{faculty.dept}</TableCell>
                <TableCell>{faculty.phno}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  };

  return (
    <div>
      <ResponsiveAppBarA />
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        View Faculty
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can view the list of all faculty members in the system.
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      ) : (
        renderFacultyList()
      )}
    </Box>
    </div>
  );
};

export default ViewFacultyPage;
