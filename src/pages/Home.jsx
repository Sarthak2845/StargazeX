import React from 'react';
import { useEffect } from 'react';
import { CalendarDays, Rocket, Telescope, Newspaper, Sun, Brush, Cog, MapPin, Camera, BookOpen, Cloud } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-10 pt-24 max-w-screen-xl mx-auto">

      {/* Hero Title */}
      <motion.h1
      className="text-5xl sm:text-6xl lg:text-7xl bg-gradient-to-l from-[#FF00FF] via-[#FF8000] to-[#FF0080] bg-clip-text text-transparent  font-extrabold font-['Orbitron'] text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
        StarGazeX
      </motion.h1>

      {/* Subtitle */}
      <motion.h3
      className="text-lg sm:text-2xl text-center p-4 mt-4 font-bold font-['Orbitron']"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
        Explore the Universe Anytime, Anywhere
      </motion.h3>

      {/* Description */}
      <motion.p
      className="text-sm sm:text-lg text-center font-['Poppins'] max-w-3xl mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
        Track celestial events, discover stargazing meetups, and stay updated with the latest space news — all in one place.
      </motion.p>

      {/* CTA Button */}
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}>
        <Link to="/login">
          <button className="bg-gradient-to-r from-[#39ff14] to-[#00d7ff] text-black font-bold py-2 px-6 rounded hover:scale-105 transition-transform duration-300 mt-4 font-['Poppins'] cursor-pointer">
            Get Started Now <Rocket className="inline ml-2" />
          </button>
        </Link>
      </motion.div>

      {/* Why Section */}
      <motion.h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Orbitron'] mt-16 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.3 }}>
        Why StarGazeX?
      </motion.h1>

      {/* Feature Cards */}
      <motion.div
      className="flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-6 mt-10 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}>
        {/* Card 1 - Stargazing upcoming events*/}
        <SpotlightCard className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%]" spotlightColor="rgba(255, 1, 132, 0.3)">
          <Link to="/stargazing" state={{ triggeredBy: 'card' }}>
            <div>
              <CalendarDays className="inline m-3" size={60} />
              <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Real-Time Space Tracking
              </h2>
              <p className="text-sm sm:text-lg font-['Poppins']">
                Stay updated on meteor showers, eclipses, ISS passes, and more — tailored to your location.
              </p>
            </div>
          </Link>
        </SpotlightCard>

        {/* Card 2 - Events*/}
        <SpotlightCard className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%]" spotlightColor="rgba(0, 255, 243, 0.3)">
          <Link to="/events">
            <div>
              <MapPin className="inline m-3" size={60} />
              <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Local Stargazing Events
              </h2>
              <p className="text-sm sm:text-lg font-['Poppins']">
                Find and host stargazing meetups near you. Share the sky with your community.
              </p>
            </div>
          </Link>
        </SpotlightCard>

        {/* Card 3 - Weather Forecasts*/}
        <SpotlightCard className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%]" spotlightColor="rgba(73, 0, 255, 0.3)">
          <Link to="/stargazing">
            <div>
              <Cloud className="inline m-3" size={60} />
              <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 bg-gradient-to-r bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Stargazing Weather
              </h2>
              <p className="text-sm sm:text-lg font-['Poppins']">
                Get specialized astronomy weather forecasts with visibility conditions for optimal viewing.
              </p>
            </div>
          </Link>
        </SpotlightCard>
        
        {/* Card 4 - Telescope Sharing Network */}
        <SpotlightCard className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%]" spotlightColor="rgba(255, 140, 0, 0.3)">
          <Link to="/telescope">
            <div>
              <Telescope className="inline m-3" size={60} />
              <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 bg-gradient-to-r bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Telescope Sharing Network
              </h2>
              <p className="text-sm sm:text-lg font-['Poppins']">
                Connect with fellow astronomers to share equipment and viewing opportunities in your area.
              </p>
            </div>
          </Link>
        </SpotlightCard>
                
        {/* Card 5 - News */}
        <SpotlightCard className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%]" spotlightColor="rgba(50, 205, 50, 0.3)">
          <Link to="/news">
            <div>
              <Newspaper className="inline m-3" size={60} />
              <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Space News Feed
              </h2>
              <p className="text-sm sm:text-lg font-['Poppins']">
                Never miss a discovery. Get daily updates from trusted space sources.
              </p>
            </div>
          </Link>
        </SpotlightCard>
        {/* Card 6 - Solar Flare Prediction */}
        <SpotlightCard className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%]" spotlightColor="rgba(235, 235, 0, 0.3)">
          <Link to="/solarflare">
            <div>
              <Sun className="inline m-3" size={60} />
              <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Solar Flare Predictions
              </h2>
              <p className="text-sm sm:text-lg font-['Poppins']">
                Stay ahead of the storm. Get early warnings of solar flares with smart, real-time predictions.
              </p>
            </div>
          </Link>
        </SpotlightCard>
      </motion.div>

      {/* Tech Stack Section */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Orbitron'] mt-16 text-center">
        Build With
      </h1>

      <div className="flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-6 mt-10 w-full">
        {/* Frontend */}
        <SpotlightCard className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%] flex flex-col items-center justify-center" spotlightColor="rgba(197, 196, 196, 0.3)">
          <Brush className="inline m-3" size={60} />
          <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 text-center bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
            FrontEnd
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { src: "/react-svgrepo-com.svg", alt: "React" },
              { src: "/tailwind-svgrepo-com.svg", alt: "Tailwind" },
              { src: "/motion.png", alt: "Framer Motion" },
              { src: "/react-router.svg", alt: "React Router" }
            ].map((tech, i) => (
              <div key={i} className="w-16 sm:w-20 h-16 sm:h-20 bg-neutral-900 p-2 rounded-xl flex items-center justify-center">
                <img src={tech.src} alt={tech.alt} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Backend */}
        <SpotlightCard className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%] flex flex-col items-center justify-center" spotlightColor="rgba(197, 196, 196, 0.3)">
          <Cog className="inline m-3" size={60} />
          <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 text-center bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
            BackEnd
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { src: "/node-js-svgrepo-com.svg", alt: "Node.js" },
              { src: "/express-js.svg", alt: "Express.js" },
              { src: "/firebase-svgrepo-com.svg", alt: "Firebase" },
              { src: "/MongoDB_Spring-Green.svg", alt: "MongoDB" }
            ].map((tech, i) => (
              <div key={i} className="w-16 sm:w-20 h-16 sm:h-20 bg-neutral-900 p-2 rounded-xl flex items-center justify-center">
                <img src={tech.src} alt={tech.alt} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Home;


