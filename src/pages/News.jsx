import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingCard from '../components/LoadingCard';
import PictureOfDay from '../components/PictureOfDay';
import { motion } from 'framer-motion';
const NewsPage = () => {
  const [news, setNews] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/news');
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      }finally{
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen  text-white  mt-20">
      {/* Header Section with Background Image */}
      <div
        className="relative  text-white px-6 py-10 font-['Poppins'] overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0  bg-opacity-60 z-0"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center mb-12">
              <motion.h1 className="text-5xl sm:text-6xl lg:text-7xl  bg-clip-text text-transparent animate-text font-extrabold font-['Orbitron'] text-center"
                        style={{
            background: 'linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
        StarGazeX Newsroom
      </motion.h1>
          <motion.p 
          className="mt-4 text-lg sm:text-xl text-gray-300 font-['Poppins']"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
            Stay updated with the latest in space exploration, satellite tech, interstellar breakthroughs, and cosmic news from trusted sources around the world.
          </motion.p>
        </div>
      </div>
    <div className='flex justify-center items-center m-8 flex-col'>
<motion.h2
  className="relative text-5xl sm:text-6xl lg:text-7xl font-extrabold font-['Orbitron'] text-center mb-8
             bg-clip-text text-transparent transition-colors duration-300
             after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
             after:bg-purple-600 after:transition-all after:duration-300 hover:after:w-full"
  style={{
    background: 'linear-gradient(to left, #ffff00, #ff8000, #ff0080, #ff00ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}>
  Picture Of Day
</motion.h2>
<PictureOfDay />
    </div>
      {/* News Cards Section */}
      <div className="px-4 py-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? Array.from({ length: 6 }, (_, index) => <LoadingCard key={index} />) : news.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 rounded-2xl shadow-lg hover:scale-102 transition-transform duration-300 overflow-hidden"
          >
            <img
  src={item.image_url || '/news-bg.jpg'}
  alt={item.title}
  className="w-full h-48 object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/news-bg.jpg';
  }}
/>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 font-['Orbitron']">{item.title}</h2>
              <p className="text-sm text-gray-400 mb-2 font-['Poppins']">
                {new Date(item.published_at).toLocaleString()} • {item.news_site}
              </p>
              <p className="text-sm text-gray-300">
                {item.summary.slice(0, 150)}...
              </p>
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    
                >
                <button className="bg-gradient-to-r from-[#39ff14] to-[#00d7ff] text-black font-bold py-2 px-6 rounded hover:scale-105 transition-transform duration-300 mt-4 font-['Poppins']">
                    Read More
                </button>
                </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
