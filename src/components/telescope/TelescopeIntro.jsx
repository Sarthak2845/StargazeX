import React from 'react';
import { Telescope, MoonStar } from 'lucide-react';
import { motion } from 'framer-motion';

const TelescopeIntro = () => {
  return (
    <motion.div 
      className="bg-none pb-6 rounded-xl shadow-md relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <motion.h1 
        className="text-4xl font-bold mb-5 p-2 text-center bg-clip-text text-transparent font-['Orbitron']"
        style={{
        background: 'linear-gradient(to right, #39FF14, #0FE9D8, #00D7FF)',
        WebkitBackgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        Telescope Sharing Network
      </motion.h1>
      <p className="mb-3">
        Not everyone has access to a telescope, but the night sky belongs to us all. 
        Our telescope sharing network connects astronomy enthusiasts with telescope owners in their area.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <motion.div 
          className="bg-[#041b11] p-4 rounded-lg border-2 border-green-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}>
          <h3 className="text-xl font-semibold mb-2">
            <Telescope className='inline-block' size={30}/> For Telescope Owners
          </h3>
          <p>
            Register your telescope and share your passion for astronomy with others. 
            Set your own availability and terms for sharing your equipment.
          </p>
        </motion.div>
        <motion.div 
          className="bg-[#041b11] p-4 rounded-lg border-2 border-green-500"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}>
          <h3 className="text-xl font-semibold mb-2">
            <MoonStar className='inline-block' size={30}/> For Stargazers
          </h3>
          <p>
            Find telescopes available in your area. Connect with owners to arrange 
            viewing sessions or short-term rentals for your stargazing adventures.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TelescopeIntro;