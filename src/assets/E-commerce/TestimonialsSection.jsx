import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      review: "Great products and fast delivery!",
      image: "https://via.placeholder.com/100x100?text=John",
      rating: 5,
    },
    {
      name: "Jane Smith",
      review: "Love the quality and customer service!",
      image: "https://via.placeholder.com/100x100?text=Jane",
      rating: 4,
    },
    {
      name: "Alice Johnson",
      review: "Amazing experience shopping here!",
      image: "https://via.placeholder.com/100x100?text=Alice",
      rating: 5,
    },
    {
      name: "Bob Brown",
      review: "Highly recommended for fashion lovers!",
      image: "https://via.placeholder.com/100x100?text=Bob",
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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
    <section className="py-12 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-2">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <StarRating rating={testimonial.rating} />
              <p className="text-gray-600 mt-4">"{testimonial.review}"</p>
              <p className="font-semibold mt-4">- {testimonial.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TestimonialsSection;
