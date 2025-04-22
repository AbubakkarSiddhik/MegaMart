import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Divider, 
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Stack,
  Grid,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  ArrowBack, 
  ShoppingCart, 
  CalendarToday,
  LocalOffer,
  Store,
  CheckCircle,
  HourglassEmpty,
  LocalShipping,
  Refresh
} from "@mui/icons-material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Timestamp } from "firebase/firestore";

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const ordersCollection = collection(db, `users/${user.uid}/orders`);
        const querySnapshot = await getDocs(ordersCollection);
        const ordersData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const date = data.date instanceof Timestamp ? data.date.toDate() : null;
          return {
            id: doc.id,
            orderId: data.orderId || `#${doc.id.substring(0, 8).toUpperCase()}`,
            date,
            items: Array.isArray(data.items) ? data.items.map(item => ({
              name: item.name || "Unknown Item",
              price: item.price ? `₹${item.price}` : "₹0.00" // Use saved price or default
            })) : [{ name: "Unknown Item", price: "₹0.00" }],
            total: data.total || "₹0.00",
            status: data.status || "Processing"
          };
        });
        // Sort by date (newest first)
        ordersData.sort((a, b) => (b.date || 0) - (a.date || 0));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusChip = (status) => {
    const statusMap = {
      "Processing": { color: "warning", icon: <HourglassEmpty /> },
      "Shipped": { color: "info", icon: <LocalShipping /> },
      "Delivered": { color: "success", icon: <CheckCircle /> }
    };
    
    const statusInfo = statusMap[status] || { color: "default", icon: <HourglassEmpty /> };
    
    return (
      <Chip
        icon={statusInfo.icon}
        label={status}
        color={statusInfo.color}
        variant="outlined"
        size={isMobile ? "small" : "medium"}
        sx={{ ml: 1 }}
      />
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    const numericAmount = typeof amount === "string" ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(numericAmount);
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2
        }}
      >
        <CircularProgress size={isMobile ? 40 : 60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading your orders...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          textAlign: "center",
          px: 2
        }}
      >
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          startIcon={<Refresh />}
          size={isMobile ? "small" : "medium"}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        py: 4,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/profile")}
        sx={{ mb: 3 }}
        variant="outlined"
        size={isMobile ? "small" : "medium"}
      >
        {isMobile ? "Back" : "Back to Profile"}
      </Button>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <ShoppingCart sx={{ 
          fontSize: isMobile ? 32 : 40, 
          color: "primary.main" 
        }} />
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" fontWeight="bold">
          My Orders
        </Typography>
        {!isMobile && (
          <Chip 
            label={`${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`} 
            color="primary" 
            variant="outlined"
          />
        )}
      </Stack>

      {orders.length > 0 ? (
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Paper 
                elevation={2} 
                sx={{ 
                  borderRadius: 2,
                  overflow: "hidden",
                  borderLeft: "4px solid",
                  borderColor: "primary.main"
                }}
              >
                <Box sx={{ p: isMobile ? 1.5 : 3 }}>
                  <Stack 
                    direction={{ xs: "column", sm: "row" }} 
                    justifyContent="space-between" 
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={1}
                    sx={{ mb: 2 }}
                  >
                    <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight="bold">
                      {order.orderId}
                    </Typography>
                    {getStatusChip(order.status)}
                  </Stack>

                  <Divider sx={{ my: isMobile ? 1 : 2 }} />

                  <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 1 : 2 }}>
                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CalendarToday color="action" fontSize={isMobile ? "small" : "medium"} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(order.date)}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocalOffer color="action" fontSize={isMobile ? "small" : "medium"} />
                        <Typography variant="body2" color="text.secondary">
                          Total (including 18% tax): {formatCurrency(order.total)}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
                    Items Ordered:
                  </Typography>
                  <List dense sx={{ py: 0 }}>
                    {order.items.map((item, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: "grey.200", 
                            width: isMobile ? 24 : 32, 
                            height: isMobile ? 24 : 32 
                          }}>
                            <Store fontSize={isMobile ? "small" : "medium"} color="action" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={`${item.name} - ${formatCurrency(item.price)}`}
                          primaryTypographyProps={{
                            variant: isMobile ? "body2" : "body1",
                            noWrap: isMobile
                          }}
                        />
                      </ListItem>
                    ))}
                    {order.items.length > 3 && (
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>
                        +{order.items.length - 3} more items
                      </Typography>
                    )}
                  </List>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            textAlign: "center",
            p: 4
          }}
        >
          <ShoppingCart sx={{ 
            fontSize: isMobile ? 60 : 80, 
            color: "action.disabled", 
            mb: 2 
          }} />
          <Typography variant={isMobile ? "h6" : "h5"} color="text.secondary" gutterBottom>
            No orders yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your order history will appear here once you make a purchase
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Store />}
            onClick={() => navigate("/")}
            size={isMobile ? "small" : "medium"}
          >
            Start Shopping
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
