import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // For navigation

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Handle input change for both fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = () => {
    setLoading(true);
    setError('');  // Reset error message before request

    const params = new URLSearchParams();
    params.append('email', formData.email);
    params.append('password', formData.password);

    axios.post('http://localhost:8080/sdp/signin', params)
      .then((response) => {
        const { data } = response;
        localStorage.setItem('token', data);
        // Assuming the response contains role information
        if (data.includes('Admin')) {
          navigate('/admindashboard'); // Navigate to Admin Home Page
        } else if (data.includes('Faculty')) {
          navigate('/facultydashboard'); // Navigate to Faculty Home Page
        } else if (data.includes('Student')) {
          navigate('/studentdashboard'); // Navigate to Student Home Page
        } else {
          setError('Unknown role. Please try again.');
        }
      })
      .catch((error) => {
        console.error("Login error: ", error);
        if (error.response && error.response.data) {
          setError(error.response.data);  // Show the specific error message from the backend
        } else {
          setError('Login failed. Please check your credentials and try again.');
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="signin-container">
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography variant="body1" color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sign In
        </Typography>
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
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Signin;
