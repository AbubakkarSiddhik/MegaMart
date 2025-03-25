import React from 'react';
import { useNavigate } from 'react-router-dom';
import TeamMemberCard from './TeamMemberCard';
import AboutUsImage from './about-us.jpeg';
import AboutUsImage1 from './about-us1.jpg';
import TeamMember1 from './team-member-1.jpg';
import TeamMember2 from './team-member-2.jpg';
import TeamMember3 from './team-member-3.jpg';

    
const AboutUsPage = () => {
    const navigate = useNavigate(); 
  return (
    <div className="bg-white text-gray-800 bg-gradient-to-r from-blue-50 to-purple-50">
     
      <section
        className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${AboutUsImage1})` }}
      >
        <div className="absolute inset-0  bg-opacity-50"></div>
        <div className="relative text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl">
            We are passionate about delivering excellence and making a difference.
          </p>
        </div>
      </section>

     
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg mb-4">
              Founded in 2010, MegaMart began as a small team with a bold vision: to revolutionize
              the way people shop online. What started as a dream to make shopping more convenient,
              affordable, and enjoyable has grown into a trusted global platform, serving millions of
              customers worldwide.
            </p>
            <p className="text-lg">
              Our journey has been shaped by challenges, learning, and relentless innovation. From
              expanding to 10 countries in 2015 to reaching 1 million happy customers by 2020, we’ve
              come a long way. Today, we are proud to be a leader in the e-commerce industry, driven
              by our core values of <strong>customer-centricity, innovation, and integrity</strong>.
            </p>
            <p className="text-lg mt-4">
              At MegaMart, we believe in more than just delivering products—we strive to create
              exceptional shopping experiences that bring joy and value to every customer. Join us on
              our journey and experience the future of online shopping today!
            </p>
            <button
  onClick={() => navigate("/shop")}
  className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-md transition duration-300"
>
  Explore MegaMart
</button>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <img src={AboutUsImage} alt="Our Story" className="rounded-lg" />
          </div>
        </div>
      </section>

      
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Our mission is to empower individuals and businesses by providing innovative solutions
            that simplify their lives and help them achieve their goals. We strive to create a
            positive impact through our products and services.
          </p>
        </div>
      </section>

     
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <TeamMemberCard
            name="John Doe"
            role="CEO & Founder"
            image={TeamMember1}
            description="John is a visionary leader with over 15 years of experience in the industry."
          />
          <TeamMemberCard
            name="Jane Smith"
            role="Chief Marketing Officer"
            image={TeamMember2}
            description="Jane is a creative strategist who drives our brand's success."
          />
          <TeamMemberCard
            name="Alex Johnson"
            role="Lead Developer"
            image={TeamMember3}
            description="Alex is a tech enthusiast who ensures our products are cutting-edge."
          />
        </div>
      </section>

     
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">Innovative Solutions</h3>
              <p className="text-gray-600">
                We stay ahead of the curve by embracing the latest technologies and trends.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">Customer-Centric Approach</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We listen, adapt, and deliver.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4">Experienced Team</h3>
              <p className="text-gray-600">
                Our team of experts brings years of experience and passion to every project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;