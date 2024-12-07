import React  from "react";
// import ResponsiveAppBar from "../ResponsiveAppBar";
import ResponsiveAppBarA from "../RespnsiveAppBarA";
const AdminHome = () => {
    return (
      <div>
        <ResponsiveAppBarA />
        <div style={{ padding: '20px' }}>
          <h1>Welcome to Admin Home Page</h1>
          {/* Add any admin-specific content here */}
        </div>
      </div>
    );
  };
  
  export default AdminHome;