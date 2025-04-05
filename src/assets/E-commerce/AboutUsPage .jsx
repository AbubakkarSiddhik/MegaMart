import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TeamMemberCard from './TeamMemberCard';
import AboutUsImage from './about-us.jpeg';
import AboutUsImage1 from './about-us1.jpg';
import TeamMember1 from './team-member-1.jpg';
import TeamMember2 from './team-member-2.jpg';
import TeamMember3 from './team-member-3.jpg';
import { 
  FaLightbulb, 
  FaUsers, 
  FaHandshake, 
  FaGlobe, 
  FaRocket, 
  FaShoppingCart 
} from 'react-icons/fa';
import { GiGrowth } from 'react-icons/gi';
import { MdOutlineEmojiPeople, MdOutlineDesignServices } from 'react-icons/md';

const AboutUsPage = () => {
    const navigate = useNavigate(); 

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <div className="bg-white text-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden">
           
            <section
                className="relative h-[500px] md:h-[600px] flex items-center justify-center bg-cover bg-center"
                style={{ 
                    backgroundImage: ` url(${AboutUsImage1})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            >
               <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
                <motion.div 
                    className="relative text-center text-white max-w-4xl mx-auto px-6"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h1 
                        className="text-4xl md:text-6xl font-bold mb-4 text-white"
                        variants={itemVariants}
                    >
                        About Our Journey
                    </motion.h1>
                    <motion.p 
                        className="text-lg md:text-xl text-white/90 mb-8"
                        variants={itemVariants}
                    >
                        We are passionate about delivering excellence and making a difference.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <button
                            onClick={() => navigate("/shop")}
                            className="group relative px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                <FaShoppingCart className="mr-2 group-hover:translate-x-1 transition-transform" />
                                Explore MegaMart
                            </span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Our Story */}
            <motion.section 
                className="py-16 px-6 max-w-6xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center text-blue-600"
                    whileHover={{ scale: 1.05 }}
                >
                    <GiGrowth className="mr-3 text-blue-500" />
                    Our Story
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.p 
                            className="text-lg mb-6 flex items-start text-gray-700"
                            whileHover={{ x: 5 }}
                        >
                            <FaGlobe className="text-blue-500 mt-1 mr-3 flex-shrink-0 text-2xl" />
                            Founded in 2010, MegaMart began as a small team with a bold vision: to revolutionize
                            the way people shop online. What started as a dream to make shopping more convenient,
                            affordable, and enjoyable has grown into a trusted global platform, serving millions of
                            customers worldwide.
                        </motion.p>
                        <motion.p 
                            className="text-lg mb-6 flex items-start text-gray-700"
                            whileHover={{ x: 5 }}
                        >
                            <FaRocket className="text-purple-500 mt-1 mr-3 flex-shrink-0 text-2xl" />
                            Our journey has been shaped by challenges, learning, and relentless innovation. From
                            expanding to 10 countries in 2015 to reaching 1 million happy customers by 2020, we've
                            come a long way.
                        </motion.p>
                        <motion.p 
                            className="text-lg mb-8 flex items-start text-gray-700"
                            whileHover={{ x: 5 }}
                        >
                            <MdOutlineEmojiPeople className="text-green-500 mt-1 mr-3 flex-shrink-0 text-2xl" />
                            At MegaMart, we believe in more than just delivering products—we strive to create
                            exceptional shopping experiences that bring joy and value to every customer.
                        </motion.p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                onClick={() => navigate("/shop")}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                            >
                                <FaShoppingCart className="mr-2" />
                                Start Shopping
                            </button>
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        className="bg-white p-1 rounded-xl shadow-xl"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <img 
                            src={AboutUsImage} 
                            alt="Our Story" 
                            className="rounded-lg w-full h-auto object-cover" 
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* Our Mission */}
            <motion.section 
                className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold mb-8 text-white flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaLightbulb className="mr-3 text-yellow-300" />
                        Our Mission
                    </motion.h2>
                    <motion.p 
                        className="text-lg max-w-2xl mx-auto text-white/90"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Our mission is to empower individuals and businesses by providing innovative solutions
                        that simplify their lives and help them achieve their goals. We strive to create a
                        positive impact through our products and services.
                    </motion.p>
                </div>
            </motion.section>

            {/* Our Team */}
            <motion.section 
                className="py-16 px-6 max-w-6xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-600 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                >
                    <FaUsers className="mr-3 text-blue-500" />
                    Meet Our Team
                </motion.h2>
                <motion.div 
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={itemVariants}>
                        <TeamMemberCard
                            name="John Doe"
                            role="CEO & Founder"
                            image={TeamMember1}
                            description="John is a visionary leader with over 15 years of experience in the industry."
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <TeamMemberCard
                            name="Jane Smith"
                            role="Chief Marketing Officer"
                            image={TeamMember2}
                            description="Jane is a creative strategist who drives our brand's success."
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <TeamMemberCard
                            name="Alex Johnson"
                            role="Lead Developer"
                            image={TeamMember3}
                            description="Alex is a tech enthusiast who ensures our products are cutting-edge."
                        />
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Why Choose Us */}
            <motion.section 
                className="bg-gray-50 py-16 px-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-600 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaHandshake className="mr-3 text-green-500" />
                        Why Choose Us?
                    </motion.h2>
                    <motion.div 
                        className="grid md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className="bg-white p-8 rounded-xl shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div className="flex justify-center text-5xl mb-4 text-blue-500">
                                <FaLightbulb />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Innovative Solutions</h3>
                            <p className="text-gray-600">
                                We stay ahead of the curve by embracing the latest technologies and trends.
                            </p>
                        </motion.div>
                        <motion.div 
                            className="bg-white p-8 rounded-xl shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div className="flex justify-center text-5xl mb-4 text-purple-500">
                                <MdOutlineDesignServices />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Customer-Centric Approach</h3>
                            <p className="text-gray-600">
                                Your satisfaction is our priority. We listen, adapt, and deliver.
                            </p>
                        </motion.div>
                        <motion.div 
                            className="bg-white p-8 rounded-xl shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                        >
                            <div className="flex justify-center text-5xl mb-4 text-green-500">
                                <FaUsers />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Experienced Team</h3>
                            <p className="text-gray-600">
                                Our team of experts brings years of experience and passion to every project.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutUsPage;
