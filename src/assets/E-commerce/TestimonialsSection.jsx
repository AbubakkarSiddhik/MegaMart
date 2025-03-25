import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "./customer1.jpg";
import img2 from "./customer2.jpg";
import img3 from "./customer3.jpg";
import img4 from "./customer4.jpg";

const TestimonialsSection = () => {
  const navigate = useNavigate();
  const [expandedReviews, setExpandedReviews] = useState({});

  const testimonials = [
    {
      name: "John Doe",
      review:
        "Great products and fast delivery! I was amazed by the quality and how quickly my order arrived. Highly recommend MegaMart for all your shopping needs.",
      image: img1,
      rating: 5,
    },
    {
      name: "Jane Smith",
      review:
        "Love the quality and customer service! The team was very helpful, and the products exceeded my expectations. Will definitely shop here again!",
      image: img2,
      rating: 4,
    },
    {
      name: "Alice Johnson",
      review:
        "Amazing experience shopping here! The website is easy to use, and the products are top-notch. MegaMart is my go-to for online shopping.",
      image: img3,
      rating: 5,
    },
    {
      name: "Bob Brown",
      review:
        "Highly recommended for fashion lovers! The variety and quality of clothing are unmatched. I always find something I love at MegaMart.",
      image: img4,
      rating: 4.5,
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
    return <div className="flex justify-center">{stars}</div>;
  };

  const toggleExpand = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          What Our Customers Say
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-blue-100"
                />
                <StarRating rating={testimonial.rating} />
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedReviews[index] ? "max-h-[500px]" : "max-h-[60px]"
                  }`}
                >
                  <p className="text-gray-600 mt-4">{testimonial.review}</p>
                </div>
                <button
                  className="mt-4 text-blue-500 hover:text-blue-600 font-semibold"
                  onClick={() => toggleExpand(index)}
                >
                  {expandedReviews[index] ? "Read Less" : "Read More"}
                </button>
                <p className="font-semibold mt-4 text-gray-800">- {testimonial.name}</p>
              </div>
            </div>
          ))}
        </Slider>
        <div className="text-center mt-12">
          <button
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-lg transition duration-300"
            onClick={() => navigate("/reviewspage")}
          >
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
