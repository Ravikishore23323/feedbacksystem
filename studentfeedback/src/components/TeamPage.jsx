import React from "react";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const teamMembers = [
  {
    name: "John Doe",
    role: "Project Manager",
    image: "https://via.placeholder.com/150",
    email: "john.doe@example.com",
    linkedin: "https://www.linkedin.com/in/johndoe",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    image: "https://via.placeholder.com/150",
    email: "jane.smith@example.com",
    linkedin: "https://www.linkedin.com/in/janesmith",
  },
  {
    name: "Alice Johnson",
    role: "UI/UX Designer",
    image: "https://via.placeholder.com/150",
    email: "alice.johnson@example.com",
    linkedin: "https://www.linkedin.com/in/alicejohnson",
  },
  {
    name: "Bob Brown",
    role: "Backend Developer",
    image: "https://via.placeholder.com/150",
    email: "bob.brown@example.com",
    linkedin: "https://www.linkedin.com/in/bobbrown",
  },
];

const TeamPage = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
      {/* Page Title */}
      <Box textAlign="center" marginBottom={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          <PeopleIcon fontSize="large" color="primary" /> Meet Our Team
        </Typography>
        <Typography variant="body1" color="textSecondary">
          A group of passionate individuals dedicated to making a difference.
        </Typography>
      </Box>

      {/* Team Members */}
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center", padding: 2 }}>
              <CardMedia
                component="img"
                height="150"
                image={member.image}
                alt={member.name}
                sx={{ borderRadius: "50%" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {member.role}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                    <EmailIcon color="primary" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon color="primary" />
                  </a>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TeamPage;
