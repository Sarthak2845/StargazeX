import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingCard from './LoadingCard';

const DashboardNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/news');
        setNews(res.data);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-white">Space News</h2>
      
      {/* News Cards Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

export default DashboardNews;