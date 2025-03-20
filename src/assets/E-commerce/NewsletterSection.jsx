import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const NewsletterSection = () => (
  <Box sx={{ py: 6, backgroundColor: "#1e293b", color: "#f8fafc", textAlign: "center" }}>
    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#38bdf8", mb: 2 }}>
      Subscribe to Our Newsletter
    </Typography>
    <Typography variant="body1" sx={{ mb: 3, color: "#e2e8f0" }}>
      Stay updated with the latest news, special offers, and exclusive deals directly in your inbox.
    </Typography>
    <Box 
      component="form" 
      sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" }, 
        justifyContent: "center", 
        gap: 2,
        maxWidth: 600,
        mx: "auto"
      }}
    >
      <TextField
        type="email"
        placeholder="Enter your email"
        variant="outlined"
        fullWidth
        sx={{
          backgroundColor: "#f8fafc", 
          borderRadius: "8px", 
          '& input': { color: "#1e293b" }
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ 
          px: 4, 
          backgroundColor: "#38bdf8", 
          '&:hover': { backgroundColor: "#0284c7" },
          borderRadius: "8px",
          fontWeight: "bold",
          textTransform: "uppercase"
        }}
      >
        Subscribe
      </Button>
    </Box>
    <Typography variant="body2" sx={{ mt: 2, color: "#e2e8f0" }}>
      Your privacy is important to us. Unsubscribe anytime.
    </Typography>
  </Box>
);

export default NewsletterSection;