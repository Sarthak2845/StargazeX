import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Stargazing', link: '/stargazing' },
    { name: 'Events', link: '/events', requiresAuth: true },
    { name: 'News', link: '/news' },
    { name: 'Telescope', link: '/telescope', requiresAuth: true }
  ];

  // Filter nav items based on authentication status
  const visibleNavItems = navItems.filter(item => !item.requiresAuth || isLoggedIn);

  const handleNavClick = (item) => {
    if (item.requiresAuth && !isLoggedIn) {
      navigate(`/login?from=${item.link}`);
    } else {
      navigate(item.link);
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-black fixed w-full top-0 left-0 z-50 border-b-2 border-blue-800 font-['Orbitron']">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/">
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
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white">
          {visibleNavItems.map((item) => (
            <li key={item.name} className="relative cursor-pointer">
              <button
                onClick={() => handleNavClick(item)}
                className="text-white transition-colors duration-300 hover:text-purple-600
                  after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
                  after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </button>
            </li>
          ))}
          
          {/* User Profile Button */}
          <li className="relative cursor-pointer">
            <button
              onClick={() => navigate('/login')}
              className="text-white transition-colors duration-300 hover:text-purple-600
                flex items-center gap-1"
            >
              <User size={18} />
              {isLoggedIn ? 'Profile' : 'Login'}
            </button>
          </li>
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
          {visibleNavItems.map((item) => (
            <li key={item.name} className="py-2 w-full border-b border-gray-700">
              <button
                onClick={() => handleNavClick(item)}
                className="block w-full text-left text-white hover:text-purple-600 transition-colors duration-300"
              >
                {item.name}
              </button>
            </li>
          ))}
          
          {/* User Profile Button (Mobile) */}
          <li className="py-2 w-full border-b border-gray-700">
            <button
              onClick={() => {
                navigate('/login');
                setIsOpen(false);
              }}
              className=" w-full text-left text-white hover:text-purple-600 transition-colors duration-300 flex items-center gap-2"
            >
              <User size={18} />
              {isLoggedIn ? 'Profile' : 'Login'}
            </button>
          </li>
        </motion.ul>
      )}
    </nav>
  );
};

export default NavBar;
