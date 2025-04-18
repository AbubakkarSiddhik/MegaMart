import React, { useContext, useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { AuthContext } from "./AuthContext";
  import { Box, Typography, Paper, Button } from "@mui/material";
  import { ArrowBack, ShoppingCart } from "@mui/icons-material";
  // import { collection, getDocs } from "firebase/firestore"; // Uncomment if using Firestore
  // import { db } from "../../firebase"; // Uncomment if using Firestore

  const OrdersPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([
      { id: 1, date: "2025-04-01", items: "T-Shirt", total: "$20" },
      { id: 2, date: "2025-04-03", items: "Shoes", total: "$50" },
    ]);

    // Uncomment and implement to fetch orders from Firestore
    /*
    useEffect(() => {
      const fetchOrders = async () => {
        const ordersCollection = collection(db, `users/${user.uid}/orders`);
        const querySnapshot = await getDocs(ordersCollection);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      };
      if (user) fetchOrders();
    }, [user]);
    */

    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/profile")}
          sx={{ mb: 2 }}
        >
          Back
        </Button>

        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          My Orders
        </Typography>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Paper key={order.id} sx={{ p: 2, mb: 2, bgcolor: "grey.100" }}>
              <Typography>Order ID: {order.id}</Typography>
              <Typography>Date: {order.date}</Typography>
              <Typography>Items: {order.items}</Typography>
              <Typography>Total: {order.total}</Typography>
            </Paper>
          ))
        ) : (
          <Typography>No orders yet.</Typography>
        )}
      </Box>
    );
  };

  export default OrdersPage;