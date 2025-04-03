import React from "react";
import { Button, TextField, Typography, InputAdornment, Box, Divider } from "@mui/material";
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  AccessTime as AccessTimeIcon,
  Send as SendIcon,
  ContactMail as ContactMailIcon,
  Business as BusinessIcon,
  Map as MapIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";

const ContactPage = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 ">
      <div className="container mx-auto px-4 sm:px-6 ">
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <ContactMailIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Contact Us
          </h2>
        </Box>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       
       

          
          <div className="space-y-8">
          <div className=" bg-white p-8 rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ">
            <Box display="flex" alignItems="center" mb={4}>
              <SendIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h3" fontWeight="bold">
                Send Us a Message
              </Typography>
            </Box>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ marginBottom: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={5}
                required
                variant="outlined"
                sx={{ marginBottom: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MessageIcon color="primary" sx={{ alignSelf: 'flex-start', mt: 1 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                endIcon={<SendIcon />}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                  },
                }}
              >
                Send Message
              </Button>
            </form>
          </div>
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <Box display="flex" alignItems="center" mb={3}>
                <BusinessIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3" fontWeight="bold">
                  Our Office
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <Box mb={3} display="flex" alignItems="flex-start">
                <LocationOnIcon color="primary" sx={{ mt: 0.5, mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Address</Typography>
                  <Typography variant="body1">123 MegaMart St, City, Country</Typography>
                </Box>
              </Box>
              
              <Box mb={3} display="flex" alignItems="flex-start">
                <PhoneIcon color="primary" sx={{ mt: 0.5, mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Phone</Typography>
                  <Typography variant="body1">+919876543210</Typography>
                </Box>
              </Box>
              
              <Box mb={3} display="flex" alignItems="flex-start">
                <EmailIcon color="primary" sx={{ mt: 0.5, mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                  <Typography variant="body1">support@megamart.com</Typography>
                </Box>
              </Box>
              
              <Box display="flex" alignItems="flex-start">
                <ScheduleIcon color="primary" sx={{ mt: 0.5, mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Working Hours</Typography>
                  <Typography variant="body1">Mon - Fri, 9:00 AM - 6:00 PM</Typography>
                </Box>
              </Box>
            </div>
           
       
          </div>
          <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ">
              <Box display="flex" alignItems="center" mb={3} >
                <MapIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h3" fontWeight="bold">
                  Our Location
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <iframe
                  title="MegaMart Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.95373531531664!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a6c8f4f4b5!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1622549400000!5m2!1sen!2sus"
                  width="100%"
                  height="800"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
