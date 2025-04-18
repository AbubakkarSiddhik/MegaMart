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
  styled,
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
  AddPhotoAlternate,
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
  const [profilePic, setProfilePic] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  const handleEditProfile = () => {
    navigate("/profile/editprofilepage");
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        updateUserProfile({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
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

  console.log("Profile Page User:", user); // Debug log to verify user object

  // Mock orders data (replace with actual data from a database or context)
  const orders = [
    { id: 1, date: "2025-04-01", items: "T-Shirt", total: "$20" },
    { id: 2, date: "2025-04-03", items: "Shoes", total: "$50" },
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
                    src={profilePic || user.profilePic || ""}
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
                  <IconButton
                    color="inherit"
                    component="label"
                    sx={{ position: "absolute", top: 10, right: 10 }}
                  >
                    <AddPhotoAlternate />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleProfilePicChange}
                    />
                  </IconButton>
                </Stack>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                  {user.name || "Unknown User"} {/* Use "Unknown User" as a fallback */}
                </Typography>
                <Typography variant="subtitle1">{user.email}</Typography>
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
                <ProfileField icon={<Phone />} label="Phone" value={user.phone} />
                <ProfileField icon={<LocationOn />} label="Address" value={user.address} />
                <ProfileField icon={<CalendarToday />} label="Member Since" value={user.joinDate} />

                <Divider sx={{ my: 3 }} />

                {/* Orders Section */}
                <Typography
                  variant="h6"
                  sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <ShoppingCart fontSize="medium" />
                  Your Orders
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

                <Divider sx={{ my: 3 }} />

                <Typography
                  variant="h6"
                  sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Lock fontSize="medium" />
                  Security
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
                  color="secondary"
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
    </Box>
  );
};

export default ProfilePage;