import React, { useState } from "react";
import testimonials from "./testimonials";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const ReviewsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleReviews, setVisibleReviews] = useState(6);

 
  const adjustedTestimonials = testimonials.map(testimonial => {
    if (testimonial.name === "Jane Smith") {
      return { ...testimonial, rating: 4 }; 
    } else if (testimonial.name === "James Wilson") {
      return { ...testimonial, rating: 4 };
    }
    return testimonial;
  });

  const filteredTestimonials = activeFilter === "all" 
    ? adjustedTestimonials 
    : adjustedTestimonials.filter(t => Math.floor(t.rating) === parseInt(activeFilter));

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 3);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex justify-center my-3">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < rating ? "text-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Customer Reviews</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what our customers say about their shopping experience
          </p>
        </div>

 
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveFilter("all");
              setVisibleReviews(6);
            }}
            className={`px-4 py-2 rounded-full ${activeFilter === "all" ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} shadow-sm transition-colors`}
          >
            All Reviews
          </button>
          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => {
                setActiveFilter(rating.toString());
                setVisibleReviews(6);
              }}
              className={`px-4 py-2 rounded-full flex items-center ${activeFilter === rating.toString() ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} shadow-sm transition-colors`}
            >
              {rating} <FaStar className="ml-1 text-yellow-400" />
              {rating === 1 ? "" : ""}
            </button>
          ))}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.slice(0, visibleReviews).map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="absolute top-6 left-6 text-blue-100 text-4xl">
                <FaQuoteLeft />
              </div>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-blue-100 shadow-md"
              />
              {renderStars(testimonial.rating)}
              <p className="text-gray-600 italic mb-4 relative z-10">
                {testimonial.review}
              </p>
              <div className="mt-6">
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.date}</p>
                {testimonial.purchase && (
                  <p className="text-xs text-gray-400 mt-1">
                    Purchased: {testimonial.purchase}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      
        {visibleReviews < filteredTestimonials.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreReviews}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Load More Reviews
            </button>
          </div>
        )}

       
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reviews found for this rating.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;