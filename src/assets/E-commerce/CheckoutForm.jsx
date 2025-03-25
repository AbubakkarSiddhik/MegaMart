import { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

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

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");

    clearCart();
    navigate("/order-confirmation");
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
       
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }} 
        />

   
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }} 
        />

        
        <TextField
          label="Shipping Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 4 }} 
        />

       
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>

     
        <TextField
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }} 
        />

        
        <div className="flex gap-4">
          <TextField
            label="MM/YY"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="CVV"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>

       
        <h3 className="text-lg font-semibold mt-6">Total: ${totalPrice.toFixed(2)}</h3>

       
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 4 }} 
        >
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
