import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  AddPhotoAlternate,
  Person,
  Email,
  Phone,
  LocationOn,
  Save,
  Cancel,
} from "@mui/icons-material";

const EditProfilePage = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    profilePic: user?.profilePic || "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile(formData);
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update profile",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setSnackbar({
        open: true,
        message: "Please select an image file",
        severity: "error",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: "Image size should be less than 2MB",
        severity: "error",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

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

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card elevation={3}>
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  p: 3,
                  color: "primary.contrastText",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Avatar
                    src={formData.profilePic}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 2,
                      bgcolor: "secondary.main",
                      fontSize: "2.5rem",
                    }}
                  >
                    {formData.name.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                  {/* <IconButton
                    color="inherit"
                    component="label"
                    sx={{ 
                      position: "absolute", 
                      bottom: 10, 
                      right: 10,
                      backgroundColor: "rgba(0,0,0,0.4)",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.6)",
                      }
                    }}
                  >
                    <AddPhotoAlternate />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleProfilePicChange}
                    />
                  </IconButton> */}
                </Box>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                  Edit Your Profile
                </Typography>
              </Box>

              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Person fontSize="medium" />
                  Personal Information
                </Typography>

                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Grid item xs={1}>
                    <Person />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Grid item xs={1}>
                    <Email />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Grid item xs={1}>
                    <Phone />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                  <Grid item xs={1}>
                    <LocationOn />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    disabled={loading}
                    sx={{ flex: 1 }}
                  >
                    {loading ? <CircularProgress size={24} /> : "Save Changes"}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={() => navigate("/profile")}
                    sx={{ flex: 1 }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </Box>
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

export default EditProfilePage;
