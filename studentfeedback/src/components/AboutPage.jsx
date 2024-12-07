import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarRateIcon from "@mui/icons-material/StarRate";

const AboutPage = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Page Title */}
      <Box textAlign="center" marginBottom={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          <FeedbackIcon fontSize="large" color="primary" /> Student Feedback System
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Enhance learning experiences with constructive feedback.
        </Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4}>
        {/* Feature 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/300x140" // Replace with your image URL
              alt="Feedback"
            />
            <CardContent>
              <Typography variant="h6">
                <PeopleAltIcon color="secondary" /> User-Centric
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Designed for students and faculty to provide meaningful feedback easily.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/300x140" // Replace with your image URL
              alt="Analytics"
            />
            <CardContent>
              <Typography variant="h6">
                <StarRateIcon color="success" /> Feedback Analytics
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Analyze feedback trends to enhance educational standards.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://via.placeholder.com/300x140" // Replace with your image URL
              alt="Secure"
            />
            <CardContent>
              <Typography variant="h6">
                <FeedbackIcon color="error" /> Secure and Confidential
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ensure secure feedback submission with strict privacy protocols.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Box textAlign="center" marginTop={4}>
        <Typography variant="h6">
          Join us in shaping a better learning experience for everyone.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>
    </Container>
  );
};

export default AboutPage;
