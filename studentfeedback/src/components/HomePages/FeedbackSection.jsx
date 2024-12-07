import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from '@mui/material';

const FeedbackSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    rating: '',
    feedback: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // You can add functionality to send the data to an API or handle it as needed
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Student Feedback Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Subject</InputLabel>
          <Select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <MenuItem value="Math">Math</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Art">Art</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="subtitle1" gutterBottom>
          Rating
        </Typography>
        <RadioGroup
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </RadioGroup>
        <TextField
          fullWidth
          margin="normal"
          label="Feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          multiline
          rows={4}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit Feedback
        </Button>
      </form>
    </Box>
  );
};

export default FeedbackSection;
