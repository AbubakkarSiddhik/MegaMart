import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Divider, Typography, Alert, Box } from "@mui/material";
import { FiUser, FiMail, FiHome, FiPhone } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { AuthContext } from "./AuthContext";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxAmount = (totalPrice * 0.18).toFixed(2);
  const totalWithTax = (totalPrice * 1.18).toFixed(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendConfirmationEmail = async () => {
    if (cart.length === 0) {
      throw new Error("Cart is empty, cannot send email.");
    }
    if (!user) {
      throw new Error("No user logged in, cannot process order.");
    }
    const orderId = `#${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`;
    const orders = cart.map((item) => ({
      name: item.name || "Unknown Item",
      qty: item.quantity || 1,
      units: "units",
      price: `₹${((item.price || 0) * (item.quantity || 1)).toFixed(2)}`,
    }));
    const templateParams = {
      order_id: orderId,
      orders: orders,
      cost_shipping: "₹0.00",
      cost_tax: `₹${taxAmount}`,
      cost_total: `₹${totalWithTax}`,
      to_email: formData.email,
    };
    console.log("Template Params:", JSON.stringify(templateParams, null, 2));

    try {
      const emailResponse = await emailjs.send(
        "service_megamart",
        "template_0liiubs",
        templateParams,
        "59Sg07zD-RFRGHdm0"
      );
      console.log("Confirmation email sent:", emailResponse.status, emailResponse.text);

      // Save order to top-level orders collection, including quantity
      await addDoc(collection(db, "orders"), {
        orderId,
        date: serverTimestamp(),
        items: cart.map((item) => ({
          name: item.name || "Unknown Item",
          price: item.price ? `₹${item.price.toFixed(2)}` : "₹0.00",
          quantity: item.quantity || 1, // Include quantity
        })),
        total: `₹${totalWithTax}`,
        userId: user.uid,
        userEmail: formData.email,
        shippingAddress: formData.address,
      });

      return orderId;
    } catch (error) {
      console.error("Email or order save failed:", error);
      throw new Error(`Failed to send confirmation email or save order: ${error.message || error.text}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionStatus("Processing your order...");

    try {
      const orderId = await sendConfirmationEmail();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clearCart();
      navigate("/order-confirmation", { state: { orderId } });
    } catch (error) {
      setSubmissionStatus(`Failed to process order. Please try again. (${error.message})`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 mt-8"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          background: "linear-gradient(to right, #f0f4ff, #f9f0ff)",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
          <FiUser className="inline mr-2" />
          Checkout
        </Typography>

        {cart.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            Your cart is empty. Please add items before checkout.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2, mb: 2 }}>
              <FiUser className="inline mr-2" />
              Personal Information
            </Typography>

            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <FiUser style={{ marginRight: 10, color: "#666" }} />,
              }}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <FiMail style={{ marginRight: 10, color: "#666" }} />,
              }}
            />

            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.phone}
              helperText={errors.phone}
              inputProps={{ maxLength: 10 }}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <FiPhone style={{ marginRight: 10, color: "#666" }} />,
              }}
            />

            <TextField
              label="Shipping Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={3}
              error={!!errors.address}
              helperText={errors.address}
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: <FiHome style={{ marginRight: 10, color: "#666", alignSelf: "flex-start" }} />,
              }}
            />

            <Divider sx={{ my: 3 }} />

            {/* Order Summary */}
            <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 2 }}>
              Order Summary
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>₹{totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Shipping:</Typography>
                <Typography color="success.main">FREE</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Tax (18%):</Typography>
                <Typography>₹{taxAmount}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  ₹{totalWithTax}
                </Typography>
              </Box>
            </Box>

            {submissionStatus && (
              <Alert severity={submissionStatus.includes("Failed") ? "error" : "info"} sx={{ mb: 3 }}>
                {submissionStatus}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isSubmitting || cart.length === 0}
              startIcon={isSubmitting ? null : <FaCheckCircle />}
              sx={{ mt: 2, py: 1.5 }}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        )}
      </Box>
    </motion.div>
  );
};

export default CheckoutForm;
