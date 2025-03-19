import React from "react";
import { Button, TextField, Typography } from "@mui/material";

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
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6 md:mt-25">
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                sx={{ marginBottom: 2 }} 
              />
              <TextField
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                sx={{ marginBottom: 2 }} 
              />
              <TextField
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
                sx={{ marginBottom: 2 }} 
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="bg-blue-500 hover:bg-blue-600"
              >
                Send Message
              </Button>
            </form>
          </div>

   
          <div className="space-y-8">
         
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Office</h3>
              <Typography variant="body1" className="mb-2">
                <strong>Address:</strong> 123 MegaMart St, City, Country
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Phone:</strong> +919876543210
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Email:</strong> support@megamart.com
              </Typography>
              <Typography variant="body1">
                <strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
              </Typography>
            </div>

            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Location</h3>
              <div className="overflow-hidden rounded-lg">
                <iframe
                  title="MegaMart Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.95373531531664!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a6c8f4f4b5!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1622549400000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;