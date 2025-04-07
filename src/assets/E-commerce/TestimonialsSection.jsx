import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import img1 from "./customer1.jpg";
import img2 from "./customer2.jpg";
import img3 from "./customer3.jpg";
import img4 from "./customer4.jpg";

const TestimonialsSection = () => {
  const navigate = useNavigate();
  const [expandedReviews, setExpandedReviews] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "John Doe",
      review: "Great products and fast delivery! I was amazed by the quality and how quickly my order arrived. Highly recommend MegaMart for all your shopping needs. The customer service team was exceptionally helpful when I had questions about my order.",
      shortReview: "Great products and fast delivery! I was amazed by the quality...",
      image: img1,
      rating: 5,
      role: "Frequent Shopper"
    },
    {
      name: "Jane Smith",
      review: "Love the quality and customer service! The team was very helpful, and the products exceeded my expectations. Will definitely shop here again! The return process was also incredibly smooth when I needed to exchange an item.",
      shortReview: "Love the quality and customer service! The team was very helpful...",
      image: img2,
      rating: 4,
      role: "Fashion Blogger"
    },
    {
      name: "Alice Johnson",
      review: "Amazing experience shopping here! The website is easy to use, and the products are top-notch. MegaMart is my go-to for online shopping. I particularly appreciate the detailed product descriptions and multiple photos for each item.",
      shortReview: "Amazing experience shopping here! The website is easy to use...",
      image: img3,
      rating: 5,
      role: "Interior Designer"
    },
    {
      name: "Bob Brown",
      review: "Highly recommended for fashion lovers! The variety and quality of clothing are unmatched. I always find something I love at MegaMart. The personalized recommendations based on my browsing history are spot-on.",
      shortReview: "Highly recommended for fashion lovers! The variety and quality...",
      image: img4,
      rating: 4.5,
      role: "Tech Entrepreneur"
    },
  ];

  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
        key={i}
        className={`text-2xl ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
      );
    }
    return <div className="flex justify-center space-x-1">{stars}</div>;
  };

  const toggleExpand = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const CustomArrow = ({ onClick, direction }) => (
    <motion.button
      onClick={onClick}
      className={`absolute top-1/2 z-10 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg ${direction === 'left' ? 'left-0 -ml-4' : 'right-0 -mr-4'}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {direction === 'left' ? <FaChevronLeft className="text-blue-500" /> : <FaChevronRight className="text-blue-500" />}
    </motion.button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Customers Say
        </motion.h2>
        <motion.p 
          className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hear from our satisfied customers about their shopping experiences
        </motion.p>

        <div className="relative">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-3">
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: currentSlide === index ? 1.02 : 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-xl shadow-md h-full flex flex-col"
                >
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                      />
                      <FaQuoteLeft className="absolute -top-2 -left-2 text-blue-400 text-xl bg-white p-1 rounded-full" />
                    </div>
                  </div>
                  
                  <StarRating rating={testimonial.rating} />
                  
                  <div className="mt-6 flex-grow">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={expandedReviews[index] ? "expanded" : "collapsed"}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-600"
                      >
                        {expandedReviews[index] ? testimonial.review : testimonial.shortReview}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-4 text-blue-500 hover:text-blue-600 font-medium text-sm self-start"
                  >
                    {expandedReviews[index] ? "Show Less" : "Read More"}
                  </button>

                  <div className="mt-6">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/reviewspage")}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center mx-auto"
          >
            View All Reviews
            <FiArrowRight className="ml-2" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
