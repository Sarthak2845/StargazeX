import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const PictureOfDay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/pod')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch APOD data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center text-red-500 mt-10">Failed to load data.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative rounded-2xl p-[3px] max-w-3xl mx-auto bg-gradient-to-r from-[hsl(275,100%,25.5%)] via-[hsl(290,100%,50%)] to-[hsl(328,100%,53.9%)] shadow-2xl"
    >
      <div className="backdrop-blur-md bg-[hsl(260,6%,10%)] rounded-2xl p-6">
        {/* Image */}
        <div className="overflow-hidden rounded-xl mb-4">
          <img
            src={data.url}
            alt={data.title}
            className="w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/600x400/3A004C/FFFFFF?text=Image+Not+Available`;
            }}
          />
        </div>

        {/* Title */}
        <div className="flex items-center mb-3 space-x-3">
          <Rocket className="text-cyan-700" size={28} />
          <h2 className="text-xl font-bold text-white font-['Orbitron']">{data.title}</h2>
        </div>

        {/* Explanation */}
        <p className="text-gray-200 text-sm leading-relaxed max-h-64 overflow-y-auto pr-2 font-['Poppins']">
          {data.explanation}
        </p>

        {/* Date */}
        <div className="mt-4 text-sm bg-linear-to-r from-pink-500 via-red-500 to-orange-500 p-2 w-fit rounded-md text-black font-bold">{data.date}</div>
      </div>
    </motion.div>
  );
};

export default PictureOfDay;

