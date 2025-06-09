import React from 'react'
import { motion } from "framer-motion";

const NavBar = () => {
  const navItems = [
    { name: 'Celestial Events', link: '/celestial-events' },
    { name: 'Events', link: '/events' },
    { name: 'News', link: '/news' },
  ];

  return (
    <nav className='bg-black fixed w-full top-0 left-0 z-50 shadow-2xl shadow-blue-700'>
      <div className='container mx-auto flex items-center justify-between py-4 px-6'>
        <motion.div
          className="text-3xl font-bold bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          StarGazeX
        </motion.div>

        <ul className="flex space-x-6 text-white">
  {navItems.map((item) => (
    <li key={item.name} className="relative cursor-pointer">
      <a
        href={item.link}
        className="
          text-white
          transition-colors duration-300
          hover:text-purple-600
          after:absolute
          after:left-0
          after:-bottom-1
          after:h-0.5
          after:w-0
          after:bg-purple-600
          after:transition-all
          after:duration-300
          hover:after:w-full
        "
      >
        {item.name}
      </a>
    </li>
  ))}
</ul>

      </div>
    </nav>
  );
}

export default NavBar;
