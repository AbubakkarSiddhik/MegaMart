import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "./AuthContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

const AccountPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        login({ email: user.email, uid: user.uid, name: user.displayName || "User" });
      }
    });
    return unsubscribe;
  }, [login]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setErrors({});
    setAuthError(null);
    setAuthSuccess(null);
    setValidationError(null);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value }); // Fixed typo: changed setLogin_vmData to setLoginData
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    setValidationError(null);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    setValidationError(null);
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) newErrors.email = "Invalid email format";
    if (!loginData.password) newErrors.password = "Password is required";
    else if (loginData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setValidationError("Please fix the errors in the form.");
      return false;
    }
    return true;
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
    if (Object.keys(newErrors).length > 0) {
      setValidationError("Please fix the errors in the form.");
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    setValidationError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const user = userCredential.user;
      login({ email: user.email, uid: user.uid, name: user.displayName || "User" });
      setAuthSuccess("Login successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setAuthError("Incorrect email or password");
          break;
        case "auth/too-many-requests":
          setAuthError("Too many attempts. Please try again later.");
          break;
        default:
          setAuthError("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setIsSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    setValidationError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
      const user = userCredential.user;

      // Update Firebase user profile with displayName
      await updateProfile(user, {
        displayName: signupData.name,
      });

      login({ email: user.email, uid: user.uid, name: signupData.name });
      setAuthSuccess("Account created successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.log("Signup Error:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setAuthError("This email is already in use. Please use a different email or log in.");
          break;
        case "auth/invalid-email":
          setAuthError("The email address is not valid. Please check and try again.");
          break;
        case "auth/weak-password":
          setAuthError("Password should be at least 6 characters. Please choose a stronger password.");
          break;
        default:
          setAuthError("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setAuthError(null);
    setAuthSuccess(null);
    setValidationError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      login({ email: user.email, uid: user.uid, name: user.displayName || "Google User" });
      setAuthSuccess("Signed in with Google!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.log("Google Sign-in Error:", error);
      setAuthError("An error occurred with Google sign-in. Please try again or use another method.");
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
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
            <Typography variant="h4" className="text-white font-bold">
              {tabValue === 0 ? "Welcome Back" : "Create Account"}
            </Typography>
          </div>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ "& .MuiTabs-indicator": { backgroundColor: "#6366f1", height: 3 } }}
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

          {validationError && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-6 pt-2">
              <Alert severity="error" icon={false} sx={{ textAlign: "center", backgroundColor: "#fee2e2", color: "#dc2626" }}>
                {validationError}
              </Alert>
            </motion.div>
          )}

          {authError && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-6 pt-2">
              <Alert severity="error" icon={false} sx={{ textAlign: "center", backgroundColor: "#fee2e2", color: "#dc2626" }}>
                {authError}
              </Alert>
            </motion.div>
          )}

          {authSuccess && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-6 pt-2">
              <Alert severity="success" sx={{ textAlign: "center", backgroundColor: "#d1fae5", color: "#047857" }}>
                {authSuccess}
              </Alert>
            </motion.div>
          )}

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
                      value={loginData.email}
                      onChange={handleLoginChange}
                      fullWidth
                      sx={{ mb: 2 }}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: <FiMail className="text-gray-500 mr-2" />,
                      }}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={handleLoginChange}
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: <FiLock className="text-gray-500 mr-2" />,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowLoginPassword(!showLoginPassword)} edge="end">
                              {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
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

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<FaGoogle />}
                    sx={{ color: "#DB4437", borderColor: "#DB4437", mb: 2 }}
                    onClick={handleGoogleSignIn}
                  >
                    Continue with Google
                  </Button>
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
                      value={signupData.name}
                      onChange={handleSignupChange}
                      fullWidth
                      sx={{ mb: 2 }}
                      error={!!errors.name}
                      helperText={errors.name}
                      InputProps={{
                        startAdornment: <FiUser className="text-gray-500 mr-2" />,
                      }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      fullWidth
                      sx={{ mb: 2 }}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: <FiMail className="text-gray-500 mr-2" />,
                      }}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type={showSignupPassword ? "text" : "password"}
                      value={signupData.password}
                      onChange={handleSignupChange}
                      fullWidth
                      sx={{ mb: 2 }}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        startAdornment: <FiLock className="text-gray-500 mr-2" />,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowSignupPassword(!showSignupPassword)} edge="end">
                              {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      fullWidth
                      sx={{ mb: 2 }}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      InputProps={{
                        startAdornment: <FiLock className="text-gray-500 mr-2" />,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
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

                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<FaGoogle />}
                    sx={{ color: "#DB4437", borderColor: "#DB4437", mb: 2 }}
                    onClick={handleGoogleSignIn}
                  >
                    Continue with Google
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <Typography variant="body2" className="mt-6 text-center text-gray-600">
              {tabValue === 0 ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={() => setTabValue(1)} className="text-blue-500 hover:underline font-medium">
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setTabValue(0)} className="text-blue-500 hover:underline font-medium">
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
