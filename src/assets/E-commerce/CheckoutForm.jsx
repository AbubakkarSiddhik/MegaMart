import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Divider, Typography, Alert, Box } from "@mui/material";
import { FiCreditCard, FiUser, FiMail, FiHome, FiLock } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Please use MM/YY format";
    }
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    clearCart();
    navigate("/order-confirmation");
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim();
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
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          background: 'linear-gradient(to right, #f0f4ff, #f9f0ff)'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          <FiCreditCard className="inline mr-2" />
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
                startAdornment: <FiUser style={{ marginRight: 10, color: '#666' }} />
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
                startAdornment: <FiMail style={{ marginRight: 10, color: '#666' }} />
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
                startAdornment: <FiHome style={{ marginRight: 10, color: '#666', alignSelf: 'flex-start' }} />
              }}
            />

            <Divider sx={{ my: 3 }} />

            {/* Payment Information */}
            <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 2 }}>
              <FiCreditCard className="inline mr-2" />
              Payment Details
            </Typography>

            <TextField
              label="Card Number"
              name="cardNumber"
              value={formatCardNumber(formData.cardNumber)}
              onChange={(e) => {
                const formattedValue = formatCardNumber(e.target.value);
                setFormData({ ...formData, cardNumber: formattedValue });
              }}
              fullWidth
              required
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              inputProps={{ maxLength: 19 }}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <FiCreditCard style={{ marginRight: 10, color: '#666' }} />
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                label="Expiry Date (MM/YY)"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.expiryDate}
                helperText={errors.expiryDate}
                inputProps={{ maxLength: 5 }}
                placeholder="MM/YY"
              />
              <TextField
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                fullWidth
                required
                type="password"
                error={!!errors.cvv}
                helperText={errors.cvv}
                inputProps={{ maxLength: 4 }}
                InputProps={{
                  startAdornment: <FiLock style={{ marginRight: 10, color: '#666' }} />
                }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Order Summary */}
            <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>₹{totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping:</Typography>
                <Typography color="success.main">FREE</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax (18%):</Typography>
                <Typography>₹{(totalPrice * 0.18).toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  ₹{(totalPrice * 1.18).toFixed(2)}
                </Typography>
              </Box>
            </Box>

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
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        )}
      </Box>
    </motion.div>
  );
};

export default CheckoutForm;
