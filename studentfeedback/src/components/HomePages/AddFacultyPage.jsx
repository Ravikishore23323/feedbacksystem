import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ResponsiveAppBarA from "../RespnsiveAppBarA"; // Assuming this is your navbar component

const AddFacultyPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phno: '',
    dept: '',
    profilePic: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePic: file,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = () => {
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('phno', formData.phno);
    data.append('dept', formData.dept);

    if (formData.profilePic) {
      data.append('profilePic', formData.profilePic);
    }

    axios.post('http://localhost:8080/sdp/signup/faculty', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        alert('Faculty registered successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          phno: '',
          dept: '',
          profilePic: null,
        });
      })
      .catch((error) => {
        setError('Signup failed. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {/* Navbar */}
      <ResponsiveAppBarA />

      {/* Page content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Faculty Signup
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please provide your details to register as a faculty member.
        </Typography>

        {error && (
          <Typography variant="body1" color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        )}

        <Box
          sx={{
            maxWidth: 500,
            margin: '0 auto',
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            type="email"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phno"
            value={formData.phno}
            onChange={handleInputChange}
            margin="normal"
            type="tel"
          />
          <TextField
            fullWidth
            label="Department"
            name="dept"
            value={formData.dept}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="file"
            onChange={handleProfilePicChange}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="body2">
                    {formData.profilePic ? 'Profile Pic Selected' : 'No Profile Pic'}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddFacultyPage;
