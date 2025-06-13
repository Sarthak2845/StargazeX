import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function AstronomicalEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fetch upcoming astronomical events
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3000/api/celestial/upcoming-events');
        setUpcomingEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch upcoming events:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-white">Upcoming Astronomical Events</h2>
      
      <div className="bg-[#020e1d] p-6 rounded-xl shadow-lg border border-blue-600">
        <h2 className="text-xl font-bold mb-4">🌠 Celestial Calendar</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800 p-4 rounded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">{event.name}</h3>
                  <span className="text-purple-400">{formatDate(event.date)}</span>
                </div>
                <p className="text-sm mt-1">{event.description}</p>
                {event.peakVisibility && (
                  <p className="text-sm text-gray-400 mt-1">
                    Best viewing time: {event.peakVisibility}
                  </p>
                )}
                {event.type && (
                  <span className="inline-block mt-2 text-xs bg-gray-700 px-2 py-1 rounded">
                    {event.type}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No upcoming astronomical events found.</p>
        )}
      </div>
    </div>
  );
}