import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, Timestamp } from "../../firebase";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBack,
  Email,
  ReceiptLong,
  CurrencyRupee,
  LocalShipping,
  CheckCircle,
  Cancel,
  AccessTime,
  Home,
  CalendarToday,
} from "@mui/icons-material";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
          const data = orderSnap.data();

          let date;
          if (data.date instanceof Timestamp) {
            date = data.date.toDate();
          } else if (data.date instanceof Date) {
            date = data.date;
          } else {
            date = new Date();
          }

          const items = Array.isArray(data.items)
            ? data.items.map(item => ({
                name: item.name || "Unknown Item",
                price: typeof item.price === "string"
                  ? parseFloat(item.price.replace(/[^\d.]/g, "")) || 0
                  : item.price || 0,
                quantity: parseInt(item.quantity) || 1,
                description: item.description || "",
              }))
            : [];

          setOrder({
            id: orderSnap.id,
            date,
            items,
            userEmail: data.userEmail || "N/A",
            shippingAddress: data.shippingAddress || "",
            status: data.status || "Processing",
            orderId: data.orderId || `#${orderSnap.id.substring(0, 8).toUpperCase()}`,
          });
        } else {
          setError("Order not found");
        }
      } catch (err) {
        setError(`Failed to load order details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const formatCurrency = (amount) => {
    if (isNaN(amount)) return "₹0.00";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusChip = (status) => {
    const iconMap = {
      Delivered: <CheckCircle fontSize="small" sx={{ mr: 0.5 }} />,
      Cancelled: <Cancel fontSize="small" sx={{ mr: 0.5 }} />,
      Processing: <AccessTime fontSize="small" sx={{ mr: 0.5 }} />,
      Shipped: <LocalShipping fontSize="small" sx={{ mr: 0.5 }} />,
    };

    const color =
      status === "Delivered"
        ? "success"
        : status === "Cancelled"
        ? "error"
        : status === "Shipped"
        ? "info"
        : "warning";

    return (
      <Chip
        label={status || "Unknown"}
        color={color}
        size="medium"
        icon={iconMap[status] || null}
        sx={{
          fontWeight: 600,
          minWidth: 120,
          "& .MuiChip-icon": { color: "inherit" },
        }}
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress size={60} />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading order details...
        </Typography>
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", py: 4, px: { xs: 2, sm: 4 }, textAlign: "center" }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No order data available
        </Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate("/owner-dashboard")} variant="outlined">
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const subtotal = order.items.reduce((sum, item) => {
    const rawPrice = item.price || 0;
    const quantity = item.quantity || 1;
    return sum + rawPrice * quantity;
  }, 0);

  const tax = subtotal * 0.18;
  const totalCalculated = subtotal + tax;

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", py: 4, px: { xs: 2, sm: 4 } }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/owner-dashboard")}
        variant="outlined"
        sx={{ mb: 3 }}
        size={isMobile ? "small" : "medium"}
      >
        Back to Dashboard
      </Button>

      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <ReceiptLong sx={{ mr: 1, color: "primary.main" }} />
        Order Details: {order.orderId}
      </Typography>

      <Paper sx={{ p: 3, boxShadow: 3, borderRadius: 2, mb: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Order Summary</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Email color="primary" sx={{ mr: 1 }} />
            <Typography><strong>Customer Email:</strong> {order.userEmail}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CalendarToday color="primary" sx={{ mr: 1 }} />
            <Typography><strong>Order Date:</strong> {formatDate(order.date)}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalShipping color="primary" sx={{ mr: 1 }} />
            <Typography component="div" sx={{ display: "flex", alignItems: "center" }}>
              <strong>Status:</strong> <Box sx={{ ml: 1 }}>{getStatusChip(order.status)}</Box>
            </Typography>
          </Box>
          {order.shippingAddress && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Home color="primary" sx={{ mr: 1 }} />
              <Typography><strong>Shipping Address:</strong> {order.shippingAddress}</Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CurrencyRupee color="primary" sx={{ mr: 1 }} />
            <Typography><strong>Total Amount:</strong> {formatCurrency(totalCalculated)}</Typography>
          </Box>
        </Stack>
      </Paper>

      <Typography variant="h6" gutterBottom>Order Items</Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Quantity</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Unit Price</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item, index) => {
              const rawPrice = item.price || 0;
              const quantity = item.quantity || 1;
              const itemTotal = rawPrice * quantity;

              return (
                <TableRow key={index}>
                  <TableCell>
                    <Typography fontWeight={500}>{item.name}</Typography>
                    {item.description && (
                      <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">{quantity}</TableCell>
                  <TableCell align="right">{formatCurrency(rawPrice)}</TableCell>
                  <TableCell align="right">{formatCurrency(itemTotal)}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2} sx={{ fontWeight: 600 }}>Subtotal</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{formatCurrency(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: 600 }}>Tax (18%)</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{formatCurrency(tax)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: 600 }}>Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{formatCurrency(totalCalculated)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderDetail;
