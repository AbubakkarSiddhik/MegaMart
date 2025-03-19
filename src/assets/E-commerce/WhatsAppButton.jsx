import React from "react";
import whatsappLogo from "./whatsapp.png"; 

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/8248794519" 
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        cursor: "pointer",
      }}
    >
      <img
        src={whatsappLogo}
        alt="WhatsApp"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </a>
  );
};

export default WhatsAppButton;