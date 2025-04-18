import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, TextField, Typography, Alert } from "@mui/material";
import { FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent! Please check your inbox.");
      setTimeout(() => navigate("/account"), 3000); // Redirect to account page after 3 seconds
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("The email address is not valid. Please check and try again.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email address.");
          break;
        default:
          setError("An error occurred. Please try again.");
      }
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
              Forgot Password
            </Typography>
          </div>

          <div className="p-6">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="px-6 pt-2">
                <Alert severity="error" icon={false} sx={{ textAlign: "center", backgroundColor: "#fee2e2", color: "#dc2626" }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            {success && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-6 pt-2">
                <Alert severity="success" sx={{ textAlign: "center", backgroundColor: "#d1fae5", color: "#047857" }}>
                  {success}
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Typography variant="body2" className="text-gray-600" sx={{ mb: 3 }}>
                Enter your email address, and we'll send you a link to reset your password.
              </Typography>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                error={!!error && !success}
                helperText={error && !success ? error : ""}
                InputProps={{
                  startAdornment: <FiMail className="text-gray-500 mr-2" />,
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isSubmitting}
                sx={{ mt: 2,mb: 2 }}
                
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <Typography variant="body2" className="mt-6 text-center text-gray-600">
              <Link to="/account" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </Typography>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;