import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Basic from './Basic'; // Correct path to Basic component
import Signin from './Signin';
import Signup from './Signup';
import AdminHome from './HomePages/AdminHome';
import FacultyHome from './HomePages/FacultyHome';
import StudentHome from './HomePages/StudentHome';
import AddFacultyPage from './HomePages/AddFacultyPage';
import ViewFacultyPage from './HomePages/ViewFacultyPage';
import ViewUsersPage from './HomePages/ViewUsersPage';
import ViewFeedbackPage from './HomePages/ViewFeedbackPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import TeamPage from './TeamPage';
import AddCourse from './HomePages/AddCourse';
import RegisterCourse from './HomePages/RegisterCourse';
import CourseStudents from './HomePages/CourseStudents';
import StudentFeedBackF from './HomePages/StudentFeedBackF';
import StudentFeedBackToAdmin from './HomePages/StudentFeedBackToAdmin';
import ViewFeedbackS from './HomePages/ViewFeedbackS';
import SendFeedbackToAdminByFaculty from './HomePages/SendFeedbackToAdminByFaculty';
import ViewFeedbackF from './HomePages/ViewFeedbackF';
const RouteComponent = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Basic />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Admin Routes */}
        <Route path="/admindashboard" element={<AdminHome />} />
        <Route path="/addfaculty" element={<AddFacultyPage />} />
        <Route path="/viewfaculty" element={<ViewFacultyPage />} />
        <Route path="/viewusers" element={<ViewUsersPage />} />
        <Route path="/viewfeedback" element={<ViewFeedbackPage />} />
        <Route path="/addcourse" element={<AddCourse />} />

        {/* Faculty Routes */}
        <Route path="/facultydashboard" element={<FacultyHome />} />
        <Route path='/coursestudents' element={<CourseStudents />} />
        <Route path='/sendfeedbacktoadminbyfaculty' element={<SendFeedbackToAdminByFaculty/>} />
        <Route path="/viewfeedbackforfaculty" element={<ViewFeedbackF />} />
        
        {/* Student Routes */}
        <Route path="/studentdashboard" element={<StudentHome />} />
        <Route path="/registercourse" element={<RegisterCourse />} />
        <Route path="/sendfeedbacktofaculty" element={<StudentFeedBackF />} />
        <Route path="/sendfeedbacktoadmin" element={<StudentFeedBackToAdmin />} />
        <Route path="/viewfeedbackforstudent" element={<ViewFeedbackS />} />
        
        {/* Static Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </Router>
  );
};

export default RouteComponent;
