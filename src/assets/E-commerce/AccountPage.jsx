import React, { useState } from "react";
import { Button, TextField, Typography, Tabs, Tab, Box } from "@mui/material";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const [tabValue, setTabValue] = useState(0); // 0 for Login, 1 for Sign Up

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <Typography variant="h4" className="text-center mb-6">
            Account
          </Typography>

          {/* Tabs for Login and Sign Up */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            className="mb-6"
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

         
          {tabValue === 0 && (
            <Box>
              <form className="space-y-4">
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  className="mb-4"
                  sx={{ marginBottom: 2 }} 
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  className="mb-4"
                  sx={{ marginBottom: 2 }} 
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="bg-blue-500 hover:bg-blue-600"
                  sx={{ marginBottom: 4 }} 
                >
                  Login
                </Button>
              </form>
              <Typography variant="body2" className="mt-4 text-center">
                Don't have an account?{" "}
                <Link
                  to="#"
                  onClick={() => setTabValue(1)}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          )}

        
          {tabValue === 1 && (
            <Box>
              <form className="space-y-4">
                <TextField
                  label="Full Name"
                  fullWidth
                  required
                  className="mb-4"
                  sx={{ marginBottom: 2 }} 
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  className="mb-4"
                  sx={{ marginBottom: 2 }} 
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  className="mb-4"
                  sx={{ marginBottom: 2 }} 
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="bg-blue-500 hover:bg-blue-600"
                  sx={{ marginBottom: 4 }} 
                >
                  Sign Up
                </Button>
              </form>
              <Typography variant="body2" className="mt-4 text-center">
                Already have an account?{" "}
                <Link
                  to="#"
                  onClick={() => setTabValue(0)}
                  className="text-blue-500 hover:underline"
                >
                  Login
                </Link>
              </Typography>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;