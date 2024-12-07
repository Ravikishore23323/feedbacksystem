import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import ResponsiveAppBarA from "../RespnsiveAppBarA";

const ViewUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all users
  useEffect(() => {
    axios.get('http://localhost:8080/sdp/users')
      .then(response => {
        console.log(response.data);  // Log the response to see its structure
        setUsers(response.data);  // Set users data in state
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users', error);
        setError('Error fetching users');
        setLoading(false);
      });
  }, []);

  // Separate users into different roles
  const students = users.filter(user => user.role === 'Student');
  const faculty = users.filter(user => user.role === 'Faculty');
  const admins = users.filter(user => user.role === 'Admin');

  const renderTable = (data) => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      <ResponsiveAppBarA />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          View Users
        </Typography>
        <Typography variant="body1" gutterBottom>
          This page allows you to view all users, separated by their roles (Student, Faculty, Admin).
        </Typography>

        {loading && <Typography variant="body1">Loading users...</Typography>}
        {error && <Typography variant="body1" color="error">{error}</Typography>}

        <Typography variant="h5" gutterBottom>
          Students
        </Typography>
        {students.length > 0 ? renderTable(students) : <Typography variant="body2">No students found.</Typography>}

        <Typography variant="h5" gutterBottom>
          Faculty
        </Typography>
        {faculty.length > 0 ? renderTable(faculty) : <Typography variant="body2">No faculty found.</Typography>}

        <Typography variant="h5" gutterBottom>
          Admins
        </Typography>
        {admins.length > 0 ? renderTable(admins) : <Typography variant="body2">No admins found.</Typography>}
      </Box>
    </div>
  );
};

export default ViewUsersPage;
