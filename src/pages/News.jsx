import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingCard from '../components/LoadingCard';
const NewsPage = () => {
  const [news, setNews] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
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
              <h1 className="text-5xl sm:text-6xl lg:text-7xl  bg-clip-text text-transparent animate-text font-extrabold font-['Orbitron'] text-center"
                        style={{
            background: 'linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
              >
        StarGazeX Newsroom
      </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300 font-['Poppins']">
            Stay updated with the latest in space exploration, satellite tech, interstellar breakthroughs, and cosmic news from trusted sources around the world.
          </p>
        </div>
      </div>

      {/* News Cards Section */}
      <div className="px-4 py-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? Array.from({ length: 6 }, (_, index) => <LoadingCard key={index} />) : news.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 rounded-2xl shadow-lg hover:scale-102 transition-transform duration-300 overflow-hidden"
          >
         <img
  src={item.image_url || '/public/news-bg.jpg'} // Replace with your actual public image path
  alt={item.title}
  className="w-full h-48 object-cover"
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
