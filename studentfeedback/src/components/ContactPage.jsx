import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactPage = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Page Title */}
      <Box textAlign="center" marginBottom={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We'd love to hear from you! Reach out with any questions or feedback.
        </Typography>
      </Box>

      {/* Contact Information Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", padding: 2 }}>
            <EmailIcon fontSize="large" color="primary" />
            <CardContent>
              <Typography variant="h6">Email</Typography>
              <Typography variant="body2" color="textSecondary">
                support@studentfeedback.com
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", padding: 2 }}>
            <PhoneIcon fontSize="large" color="primary" />
            <CardContent>
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body2" color="textSecondary">
                +1-800-555-1234
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", padding: 2 }}>
            <LocationOnIcon fontSize="large" color="primary" />
            <CardContent>
              <Typography variant="h6">Address</Typography>
              <Typography variant="body2" color="textSecondary">
                123 Feedback Lane, EduCity, World
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contact Form */}
      <Box
        component="form"
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Send Us a Message
        </Typography>
        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Your Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
        />
        <Button variant="contained" color="primary" size="large">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ContactPage;
