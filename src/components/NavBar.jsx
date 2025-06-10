import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { link } from 'motion/react-client';
import Telescope from '../pages/Telescope';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Celestial Events', link: '/celestial-events' },
    { name: 'Events', link: '/events' },
    { name: 'News', link: '/news' },
    {
      name:"Telescope",link:'/telescope'
    }
  ];

  return (
    <nav className="bg-black fixed w-full top-0 left-0 z-50 border-b-2 border-blue-800 font-['Orbitron']">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/">
                <motion.div
          className="text-3xl font-bold bg-clip-text text-transparent"
          style={{
            background: 'linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          StarGazeX
        </motion.div>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white">
          {navItems.map((item) => (
            <li key={item.name} className="relative cursor-pointer">
              <a
                href={item.link}
                className="text-white transition-colors duration-300 hover:text-purple-600
                  after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
                  after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.ul
          className="flex flex-col items-start bg-black w-full px-6 pb-4 md:hidden text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <li key={item.name} className="py-2 w-full border-b border-gray-700">
              <a
                href={item.link}
                className="block w-full text-white hover:text-purple-600 transition-colors duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
};

export default NavBar;
