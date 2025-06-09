import React from 'react';
import GradientText from '../components/GradientText';
import { CalendarDays, Rocket, Telescope,Newspaper, Brush, Cog } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-10 pt-24">
      <GradientText
        colors={["#ffff00", "#ff8000", "#ff0080", "#ff00ff"]}
        animationSpeed={4.5}
        showBorder={false}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Orbitron'] font-extrabold hover:scale-105 transition-transform duration-300 text-center"
      >
        StarGazeX
      </GradientText>

      <h3 className="text-xl sm:text-2xl text-center p-4 m-2 font-bold font-['Orbitron']">
        Explore the Universe Anytime, Anywhere
      </h3>

      <p className="text-base sm:text-lg text-center m-2 font-['Poppins'] max-w-3xl">
        Track celestial events, discover stargazing meetups, and stay updated with the latest space news — all in one place
      </p>

      <button className="bg-gradient-to-r from-[#39ff14] to-[#00d7ff] text-black font-bold py-2 px-6 rounded cursor-pointer hover:scale-105 transition-transform duration-300 mt-4 font-['Poppins']">
        Get Started Now <Rocket className="inline ml-2" />
      </button>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Orbitron'] mt-16 text-center">
        Why StarGazeX?
      </h1>

      <div className="flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-6 mt-10 w-full">
        <SpotlightCard
          className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%]"
          spotlightColor="rgba(255, 1, 132, 0.66)"
        >
          <CalendarDays className="inline m-3" size={60} />
          <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4">Real-Time Space Tracking</h2>
          <p className="text-base sm:text-lg font-['Poppins']">
            Stay updated on meteor showers, eclipses, ISS passes, and more — tailored to your location.
          </p>
        </SpotlightCard>

        <SpotlightCard
          className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%]"
          spotlightColor="rgba(0, 255, 243, 0.66)"
        >
          <Telescope className="inline m-3" size={60} />
          <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4">Local Stargazing Events</h2>
          <p className="text-base sm:text-lg font-['Poppins']">
            Find and host stargazing meetups near you. Share the sky with your community.
          </p>
        </SpotlightCard>

        <SpotlightCard
          className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%]"
          spotlightColor="rgba(73, 0, 255, 0.78)"
        >
          <Newspaper className="inline m-3" size={60} />
          <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4">Space News Feed</h2>
          <p className="text-base sm:text-lg font-['Poppins']">
            Never miss a discovery. Get daily updates from trusted space sources.
          </p>
        </SpotlightCard>
      </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Orbitron'] mt-16 text-center">
        Build With
      </h1>
      <div className='flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-6 mt-10 w-full'> 
      <SpotlightCard
  className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%] flex flex-col items-center justify-center"
  spotlightColor="rgba(0, 255, 243, 0.66)"
>
  <Brush className="inline m-3" size={60} />
  <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 text-center">FrontEnd</h2>

  <div className="flex flex-wrap gap-3 justify-center">
    {[
      { src: "/react-svgrepo-com.svg", alt: "React" },
      { src: "/tailwind-svgrepo-com.svg", alt: "Tailwind" },
      { src: "/motion.png", alt: "Framer Motion" },
      { src: "/react-router.svg", alt: "React Router" }
    ].map((tech, i) => (
      <div
        key={i}
        className="w-20 h-20 bg-neutral-900 p-2 rounded-xl flex items-center justify-center "
      >
        <img src={tech.src} alt={tech.alt} className="max-w-full max-h-full object-contain" />
      </div>
    ))}
  </div>
</SpotlightCard>
      <SpotlightCard
  className="p-6 w-full sm:w-[90%] md:w-[45%] lg:w-[30%] flex flex-col items-center justify-center"
  spotlightColor="rgba(0, 255, 243, 0.66)"
>
  <Cog className="inline m-3" size={60} />
  <h2 className="text-xl sm:text-2xl font-bold font-['Orbitron'] mb-4 text-center">BackEnd</h2>

  <div className="flex flex-wrap gap-3 justify-center">
    {[
      { src: "/public/node-js-svgrepo-com.svg", alt: "Node.js" },
      { src: "/public/express-js.svg", alt: "Express.js" },
      { src: "/public/firebase-svgrepo-com.svg", alt: "Firebase" }
    ].map((tech, i) => (
      <div
        key={i}
        className="w-20 h-20 bg-neutral-900 p-2 rounded-xl flex items-center justify-center "
      >
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

