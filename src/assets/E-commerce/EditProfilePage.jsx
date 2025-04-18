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
} from "@mui/material";
import { ArrowBack, AddPhotoAlternate } from "@mui/icons-material";

const EditProfilePage = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(user.name || "");
  const [profilePic, setProfilePic] = useState(user.profilePic || "");

  const handleSave = () => {
    updateUserProfile({ ...user, name, profilePic });
    navigate("/profile");
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Edit Profile
        </Typography>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            src={profilePic}
            sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
          >
            {name.charAt(0)?.toUpperCase() || "U"}
          </Avatar>
          <IconButton
            color="primary"
            component="label"
            sx={{ mb: 2 }}
          >
            <AddPhotoAlternate />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </IconButton>
        </Box>
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSave}
          sx={{ mb: 2 }}
        >
          Save Changes
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/profile")}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfilePage;