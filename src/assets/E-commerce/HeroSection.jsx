import { useNavigate } from "react-router-dom"; 
import HeroImage from './Hero.jpg'; 

const HeroSection = () => {
  const navigate = useNavigate(); 

  return (
    <section
      className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage})` }} 
    >
      
      

      
      <div className="relative text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold">Discover the Best Deals</h1>
        <p className="mt-4 text-lg md:text-xl">Shop the latest trends with exclusive discounts</p>

       
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