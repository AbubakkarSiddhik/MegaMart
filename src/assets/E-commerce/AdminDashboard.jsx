import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  useMediaQuery,
  useTheme,
  Chip,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  Email,
  ReceiptLong,
  CalendarToday,
  CurrencyRupee,
  Assignment,
  SentimentDissatisfied,
  FilterList,
  MoreVert,
  Refresh,
  CheckCircle,
  Cancel,
  LocalShipping,
  AccessTime,
  Edit,
  Delete,
  Print,
  MarkEmailRead,
  Visibility,
} from "@mui/icons-material";
import { collection, getDocs, Timestamp, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({
    totalOrders: 0,
    delivered: 0,
    processing: 0,
    cancelled: 0,
    shipped: 0,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const OWNER_EMAIL = "owner@gmail.com";

  // Update last viewed timestamp when the owner visits the dashboard
  useEffect(() => {
    const updateLastViewedTimestamp = async () => {
      if (user && user.email === OWNER_EMAIL) {
        try {
          const userDocRef = doc(db, "users", OWNER_EMAIL);
          await setDoc(
            userDocRef,
            {
              email: OWNER_EMAIL,
              lastViewedTimestamp: Timestamp.now(),
            },
            { merge: true }
          );
        } catch (error) {
          console.error("Error updating last viewed timestamp:", error);
        }
      }
    };

    updateLastViewedTimestamp();
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user || user.email !== OWNER_EMAIL) {
      setError("Access denied. Only the owner can view this dashboard.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const ordersCollection = collection(db, "orders");
      const querySnapshot = await getDocs(ordersCollection);
      const ordersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const date = data.date instanceof Timestamp ? data.date.toDate() : null;
        return {
          id: doc.id,
          orderId: data.orderId || `#${doc.id.substring(0, 8).toUpperCase()}`,
          userEmail: data.userEmail || "N/A",
          total: data.total || "₹0.00",
          date,
          items: Array.isArray(data.items) ? data.items : [],
          status: data.status || "Processing",
        };
      });

      // Sort orders by date in descending order (newest first)
      ordersData.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.getTime() - a.date.getTime();
      });

      setOrders(ordersData);
      calculateStats(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      setError("Failed to load orders. Please try again later.");
      showSnackbar("Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ordersData) => {
    const total = ordersData.length;
    const delivered = ordersData.filter((o) => o.status === "Delivered").length;
    const processing = ordersData.filter((o) => o.status === "Processing").length;
    const cancelled = ordersData.filter((o) => o.status === "Cancelled").length;
    const shipped = ordersData.filter((o) => o.status === "Shipped").length;

    setStats({
      totalOrders: total,
      delivered,
      processing,
      cancelled,
      shipped,
    });
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
        label={status}
        color={color}
        size="small"
        icon={iconMap[status] || null}
        sx={{
          fontWeight: 500,
          minWidth: 100,
          "& .MuiChip-icon": { color: "inherit" },
        }}
      />
    );
  };

  const handleActionClick = (event, order) => {
    event.stopPropagation();
    setSelectedOrder(order);
    setAnchorEl(event.currentTarget);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedOrder) return;

    try {
      const orderRef = doc(db, "orders", selectedOrder.id);
      await updateDoc(orderRef, {
        status: newStatus,
      });
      showSnackbar(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order:", error);
      showSnackbar("Failed to update order status", "error");
    } finally {
      handleActionClose();
      handleDialogClose();
    }
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return;

    try {
      const orderRef = doc(db, "orders", selectedOrder.id);
      await deleteDoc(orderRef);
      showSnackbar("Order deleted successfully");
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      showSnackbar("Failed to delete order", "error");
    } finally {
      handleActionClose();
      handleDialogClose();
    }
  };

  const handleSendConfirmation = () => {
    if (!selectedOrder) return;
    showSnackbar(`Confirmation email sent to ${selectedOrder.userEmail}`);
    handleActionClose();
  };

  const handlePrintInvoice = () => {
    if (!selectedOrder) return;
    showSnackbar(`Invoice for order ${selectedOrder.orderId} generated`);
    handleActionClose();
  };

  const handleViewDetails = () => {
    if (!selectedOrder) return;
    navigate(`/order/${selectedOrder.id}`);
    handleActionClose();
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setStatusFilter(filter);
    handleFilterClose();
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress size={isMobile ? 40 : 60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  if (error || !user || user.email !== OWNER_EMAIL) {
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
          px: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "error.main", mb: 2 }}>
          <Assignment />
        </Avatar>
        <Typography color="error" variant="h6">
          {error || "Access denied. Please log in as the owner."}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/account")}
          size={isMobile ? "small" : "medium"}
          sx={{ mt: 2 }}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", py: 4, px: { xs: 2, sm: 4 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 2 : 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/profile")}
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          >
            {isMobile ? "Back" : "Back to Profile"}
          </Button>

          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Assignment sx={{ mr: 1, verticalAlign: "middle" }} />
            Owner Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Refresh data">
            <IconButton onClick={fetchOrders} color="primary">
              <Refresh />
            </IconButton>
          </Tooltip>

          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={handleFilterClick}
            size={isMobile ? "small" : "medium"}
          >
            Filter
          </Button>

          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem
              onClick={() => handleFilterSelect("all")}
              selected={statusFilter === "all"}
            >
              All Orders
            </MenuItem>
            <MenuItem
              onClick={() => handleFilterSelect("Processing")}
              selected={statusFilter === "Processing"}
            >
              Processing
            </MenuItem>
            <MenuItem
              onClick={() => handleFilterSelect("Shipped")}
              selected={statusFilter === "Shipped"}
            >
              Shipped
            </MenuItem>
            <MenuItem
              onClick={() => handleFilterSelect("Delivered")}
              selected={statusFilter === "Delivered"}
            >
              Delivered
            </MenuItem>
            <MenuItem
              onClick={() => handleFilterSelect("Cancelled")}
              selected={statusFilter === "Cancelled"}
            >
              Cancelled
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", boxShadow: 3 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h4" component="div">
                {stats.totalOrders}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <ReceiptLong color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  All time orders
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", boxShadow: 3 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Processing
              </Typography>
              <Typography variant="h4" component="div">
                {stats.processing}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <AccessTime color="warning" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  In progress
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", boxShadow: 3 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Shipped
              </Typography>
              <Typography variant="h4" component="div">
                {stats.shipped}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <LocalShipping color="info" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  In transit
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: "100%", boxShadow: 3 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Delivered
              </Typography>
              <Typography variant="h4" component="div">
                {stats.delivered}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Recent Orders
        <Chip
          label={`${filteredOrders.length} orders`}
          size="small"
          sx={{ ml: 1, fontWeight: 500 }}
        />
        {statusFilter !== "all" && (
          <Button
            size="small"
            onClick={() => setStatusFilter("all")}
            sx={{ ml: 1 }}
          >
            Clear filter
          </Button>
        )}
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: 3, borderRadius: 2 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>
                  <ReceiptLong fontSize="small" sx={{ mr: 1 }} />
                  Order ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>
                  <Email fontSize="small" sx={{ mr: 1 }} />
                  User Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>
                  <CurrencyRupee fontSize="small" sx={{ mr: 1 }} />
                  Total
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>
                  <CalendarToday fontSize="small" sx={{ mr: 1 }} />
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", bgcolor: "background.paper" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                  onClick={() => navigate(`/order/${order.id}`)}
                >
                  <TableCell>
                    <Typography fontWeight="500">{order.orderId}</Typography>
                  </TableCell>
                  <TableCell>{order.userEmail}</TableCell>
                  <TableCell>
                    <Typography fontWeight="500">{order.total}</Typography>
                  </TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>{getStatusChip(order.status)}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => handleActionClick(e, order)}
                      aria-label="order actions"
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleActionClose}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem
              onClick={() => {
                setDialogType("status");
                setOpenDialog(true);
              }}
            >
              <LocalShipping fontSize="small" sx={{ mr: 1 }} />
              Update Status
            </MenuItem>
            <MenuItem onClick={handleSendConfirmation}>
              <MarkEmailRead fontSize="small" sx={{ mr: 1 }} />
              Send Confirmation
            </MenuItem>
            <MenuItem onClick={handlePrintInvoice}>
              <Print fontSize="small" sx={{ mr: 1 }} />
              Print Invoice
            </MenuItem>
            <MenuItem onClick={handleViewDetails}>
              <Visibility fontSize="small" sx={{ mr: 1 }} />
              View Details
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                setDialogType("delete");
                setOpenDialog(true);
              }}
              sx={{ color: "error.main" }}
            >
              <Delete fontSize="small" sx={{ mr: 1 }} />
              Delete Order
            </MenuItem>
          </Menu>

          <Dialog
            open={openDialog && dialogType === "status"}
            onClose={handleDialogClose}
          >
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Update status for order {selectedOrder?.orderId}
              </DialogContentText>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                <Button
                  variant={
                    selectedOrder?.status === "Processing" ? "contained" : "outlined"
                  }
                  onClick={() => handleStatusChange("Processing")}
                  startIcon={<AccessTime />}
                  sx={{ justifyContent: "flex-start" }}
                >
                  Processing
                </Button>
                <Button
                  variant={
                    selectedOrder?.status === "Shipped" ? "contained" : "outlined"
                  }
                  onClick={() => handleStatusChange("Shipped")}
                  startIcon={<LocalShipping />}
                  sx={{ justifyContent: "flex-start" }}
                >
                  Shipped
                </Button>
                <Button
                  variant={
                    selectedOrder?.status === "Delivered" ? "contained" : "outlined"
                  }
                  onClick={() => handleStatusChange("Delivered")}
                  startIcon={<CheckCircle />}
                  sx={{ justifyContent: "flex-start" }}
                >
                  Delivered
                </Button>
                <Button
                  variant={
                    selectedOrder?.status === "Cancelled" ? "contained" : "outlined"
                  }
                  onClick={() => handleStatusChange("Cancelled")}
                  startIcon={<Cancel />}
                  color="error"
                  sx={{ justifyContent: "flex-start" }}
                >
                  Cancelled
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDialog && dialogType === "delete"}
            onClose={handleDialogClose}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete order {selectedOrder?.orderId}? This
                action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleDeleteOrder} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {filteredOrders.length === 0 && (
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                color: "text.secondary",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SentimentDissatisfied sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
              <Typography variant="h6" gutterBottom>
                No orders found
              </Typography>
              <Typography variant="body2">
                {statusFilter === "all"
                  ? "There are no orders in the system yet."
                  : `There are no ${statusFilter.toLowerCase()} orders.`}
              </Typography>
              {statusFilter !== "all" && (
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setStatusFilter("all")}
                  sx={{ mt: 2 }}
                >
                  View all orders
                </Button>
              )}
            </Box>
          )}
        </TableContainer>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
