import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Edit,
  ExitToApp,
  Person,
  Email,
  Fingerprint,
  Phone,
  LocationOn,
  CalendarToday,
  Lock,
  ArrowBack,
  ShoppingCart,
} from "@mui/icons-material";


const ProfileField = ({ icon, label, value }) => (
  <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
    <Grid item xs={1}>
      {icon}
    </Grid>
    <Grid item xs={11}>
      <TextField
        label={label}
        value={value || "Not set"}
        fullWidth
        variant="outlined"
        InputProps={{
          readOnly: true,
          sx: {
            "& .MuiInputBase-input": {
              color: "text.primary",
              fontWeight: 500,
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "divider",
            },
          },
        }}
      />
    </Grid>
  </Grid>
);

const ProfilePage = () => {
  const { user, logout, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  const handleEditProfile = () => {
    navigate("/profile/editprofilepage");
  };

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Please log in to view your profile.
        </Typography>
      </Box>
    );
  }

  // Mock orders data
  const orders = [
    { id: 1, date: "2025-04-01", items: "T-Shirt, Jeans", total: "$45.99", status: "Delivered" },
    { id: 2, date: "2025-04-03", items: "Running Shoes", total: "$89.99", status: "Shipped" },
  ];

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
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card elevation={3}>
            <CardContent sx={{ p: 0 }}>
              {/* Profile Header */}
              <Box
                sx={{
                  bgcolor: "primary.main",
                  p: 3,
                  color: "primary.contrastText",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Stack direction="column" alignItems="center">
                  <Avatar
                    src={user.profilePic || ""}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 2,
                      bgcolor: "secondary.main",
                      fontSize: "2.5rem",
                    }}
                  >
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                </Stack>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                  {user.name || "Unknown User"}
                </Typography>
                <Typography variant="subtitle1">{user.email}</Typography>
                {user.updatedAt && (
                  <Typography variant="caption">
                    Last updated: {new Date(user.updatedAt).toLocaleString()}
                  </Typography>
                )}
              </Box>

              {/* Profile Details */}
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Person fontSize="medium" />
                  Personal Information
                </Typography>

                <ProfileField icon={<Person />} label="Full Name" value={user.name} />
                <ProfileField icon={<Email />} label="Email" value={user.email} />
                <ProfileField icon={<Fingerprint />} label="User ID" value={user.uid} />
                <ProfileField icon={<Phone />} label="Phone" value={user.phoneNumber || user.phone} />
                <ProfileField icon={<LocationOn />} label="Address" value={user.address} />
                <ProfileField 
                  icon={<CalendarToday />} 
                  label="Member Since" 
                  value={user.metadata?.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString() 
                    : "Unknown"} 
                />

                {/* <Divider sx={{ my: 3 }} />

                Orders Section
                <Typography
                  variant="h6"
                  sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <ShoppingCart fontSize="medium" />
                  Recent Orders
                </Typography>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <Paper 
                      key={order.id} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        bgcolor: "grey.100",
                        '&:hover': {
                          bgcolor: 'grey.200',
                          cursor: 'pointer',
                        },
                        transition: 'background-color 0.3s',
                      }}
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Order #{order.id}</Typography>
                          <Typography variant="body2">{order.date}</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                          <Typography variant="subtitle2">{order.total}</Typography>
                          <Typography 
                            variant="body2" 
                            color={
                              order.status === "Delivered" ? "success.main" : 
                              order.status === "Shipped" ? "info.main" : "text.secondary"
                            }
                          >
                            {order.status}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">{order.items}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))
                ) : (
                  <Box textAlign="center" py={2}>
                    <Typography variant="body1" color="text.secondary">
                      You haven't placed any orders yet.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      sx={{ mt: 2 }}
                      onClick={() => navigate("/shop")}
                    >
                      Start Shopping
                    </Button>
                  </Box>
                )}

                <Divider sx={{ my: 3 }} /> */}

                <Typography
                  variant="h6"
                  sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Lock fontSize="medium" />
                  Account Actions
                </Typography>

                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={handleEditProfile}
                  sx={{ mb: 2 }}
                >
                  Edit Profile
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<ExitToApp />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;
