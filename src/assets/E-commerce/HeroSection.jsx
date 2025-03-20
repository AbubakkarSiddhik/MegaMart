import { useNavigate } from "react-router-dom"; 
import SplitText from "./SplitText"; 
import HeroImage from './Hero.jpg'; 

const HeroSection = () => {
  const navigate = useNavigate(); 

  const handleAnimationComplete = () => {
    console.log("Hero text animation completed!");
  };

  return (
    <section
      className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage})` }} 
    >
      <div className="relative text-center text-white px-6">
        <SplitText
          text="Discover the Best Deals"
          className="text-4xl md:text-6xl font-bold"
          delay={100}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />

        <p className="mt-4 text-lg md:text-xl">
          Shop the latest trends with exclusive discounts
        </p>

        <button
          onClick={() => navigate("/shop")} 
          className="mt-20 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-md transition duration-300"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
