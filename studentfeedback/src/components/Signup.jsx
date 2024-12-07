import React, { useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { FaBriefcase, FaUserGraduate, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const Signup = () => {
  const [activeCard, setActiveCard] = useState(null);
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

  const navigate = useNavigate();  // Initialize useNavigate

  const handleCardClick = (cardType) => {
    setActiveCard(cardType);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phno: '',
      dept: '',
      profilePic: null,
    });
    setError('');
  };

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

    if (activeCard === 'student' || activeCard === 'faculty') {
      data.append('phno', formData.phno);
      if (formData.profilePic) {
        data.append('profilePic', formData.profilePic);
      }
    }

    if (activeCard === 'faculty') {
      data.append('dept', formData.dept);
    }

    axios.post(`http://localhost:8080/sdp/signup/${activeCard}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        alert(`${activeCard.charAt(0).toUpperCase() + activeCard.slice(1)} registered successfully!`);
        resetForm();
        setActiveCard(null);
      })
      .catch((error) => {
        setError('Signup failed. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="signup-container">
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
      {activeCard ? (
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
            Signup as {activeCard.charAt(0).toUpperCase() + activeCard.slice(1)}
          </Typography>
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
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
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
          {(activeCard === 'student' || activeCard === 'faculty') && (
            <>
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
                type="file"
                onChange={handleProfilePicChange}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="body2">{formData.profilePic ? 'Profile Pic Selected' : 'No Profile Pic'}</Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          {activeCard === 'faculty' && (
            <TextField
              fullWidth
              label="Department"
              name="dept"
              value={formData.dept}
              onChange={handleInputChange}
              margin="normal"
            />
          )}
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <Grid item>
            <Card>
              <CardContent onClick={() => handleCardClick('admin')} sx={{ cursor: 'pointer' }}>
                <FaUserShield size={50} />
                <Typography variant="h6">SIGNUP AS ADMIN</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/signin')} // Redirect to sign-in
                  fullWidth
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent onClick={() => handleCardClick('student')} sx={{ cursor: 'pointer' }}>
                <FaUserGraduate size={50} />
                <Typography variant="h6">SIGNUP AS STUDENT</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/signin')} // Redirect to sign-in
                  fullWidth
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardContent onClick={() => handleCardClick('faculty')} sx={{ cursor: 'pointer' }}>
                <FaBriefcase size={50} />
                <Typography variant="h6">SIGNUP AS FACULTY</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/signin')} 
                  fullWidth
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Signup;
