import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, TextField, Typography, Tabs, Tab, Box, Alert, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const AccountPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setErrors({});
    setAuthError(null);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = "Email is required";
    if (!loginData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupData.name) newErrors.name = "Name is required";
    if (!signupData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!signupData.password) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsSubmitting(true);
    setAuthError(null);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Handle successful login (redirect, etc.)
    } catch (error) {
      setAuthError("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setIsSubmitting(true);
    setAuthError(null);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Handle successful signup (redirect, etc.)
    } catch (error) {
      setAuthError("Email already in use");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
            <Typography variant="h4" component="h1" className="text-white font-bold">
              {tabValue === 0 ? "Welcome Back" : "Create Account"}
            </Typography>
          </div>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#6366f1",
                height: 3
              }
            }}
          >
            <Tab 
              label="Login" 
              icon={<FiLogIn className="text-lg" />} 
              iconPosition="start"
              sx={{ py: 2 }}
            />
            <Tab 
              label="Sign Up" 
              icon={<FiUserPlus className="text-lg" />} 
              iconPosition="start"
              sx={{ py: 2 }}
            />
          </Tabs>

          {/* Error Message */}
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 pt-2"
            >
              <Alert severity="error">{authError}</Alert>
            </motion.div>
          )}

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {tabValue === 0 ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      sx={{ mb: 2 }}
                      value={loginData.email}
                      onChange={handleLoginChange}
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: <FiMail className="text-gray-500 mr-2" />
                      }}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: <FiLock className="text-gray-500 mr-2" />
                      }}
                    />
                    <div className="text-right">
                      <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={isSubmitting}
                      startIcon={<FiLogIn />}
                      sx={{ mt: 2 }}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  </form>

                  <Divider sx={{ my: 3 }}>OR</Divider>

                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<FaGoogle />}
                      sx={{ color: "#DB4437", borderColor: "#DB4437",mb: 2 }}
                      
                    >
                      Continue with Google
                    </Button>
                   
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <TextField
                      label="Full Name"
                      name="name"
                      sx={{mb: 2 }}
                      value={signupData.name}
                      onChange={handleSignupChange}
                      fullWidth  
                      error={!!errors.name}
                      helperText={errors.name}
                      InputProps={{
                        startAdornment: <FiUser className="text-gray-500 mr-2" />
                      }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      sx={{mb: 2 }}
                      value={signupData.email}
                      onChange={handleSignupChange}
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: <FiMail className="text-gray-500 mr-2" />
                      }}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      sx={{mb: 2 }}
                      value={signupData.password}
                      onChange={handleSignupChange}
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: <FiLock className="text-gray-500 mr-2" />
                      }}
                    />
                    <TextField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      sx={{mb: 2 }}
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      fullWidth
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      InputProps={{
                        startAdornment: <FiLock className="text-gray-500 mr-2" />
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      disabled={isSubmitting}
                      startIcon={<FiUserPlus />}
                      sx={{ mt: 2 }}
                    >
                      {isSubmitting ? "Creating account..." : "Sign Up"}
                    </Button>
                  </form>

                  <Divider sx={{ my: 3 }}>OR</Divider>

                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<FaGoogle />}
                      sx={{ color: "#DB4437", borderColor: "#DB4437", mb: 2 }}
                    >
                      Continue with Google
                    </Button>
                   
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Typography variant="body2" className="mt-6 text-center text-gray-600">
              {tabValue === 0 ? (
                <>
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setTabValue(1)} 
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button 
                    onClick={() => setTabValue(0)} 
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Login
                  </button>
                </>
              )}
            </Typography>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AccountPage;
