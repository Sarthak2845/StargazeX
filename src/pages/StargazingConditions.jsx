import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function StargazingConditions() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [conditions, setConditions] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('conditions');
  const loc = useLocation();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    if(loc.state?.triggeredBy === 'card'){
      setActiveTab('upcoming');
    }
    window.scrollTo(0, 0);
    const today = new Date();
    setDate(today.toISOString().split('T')[0]);
    fetchUpcomingEvents();
  }, [loc.state]);

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/celestial/upcoming-events');
      setUpcomingEvents(res.data);
    } catch (err) {
      console.error('Failed to fetch upcoming events:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStargazingConditions = async () => {
    if (!location || !date) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://stargaze-x-backend-avinashshetty123s-projects.vercel.app/api/celestial/stargazing-conditions?date=${date}&location=${encodeURIComponent(location)}`
      );
      setConditions(res.data);
    } catch (err) {
      console.error('Failed to fetch stargazing conditions:', err);
    } finally {
      setLoading(false);
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent': return 'text-green-400';
      case 'Good': return 'text-yellow-400';
      case 'Fair': return 'text-orange-400';
      default: return 'text-red-400';
    }
  };

  const inputClass = "w-full p-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400";

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 text-white">
      <motion.h1
        className="text-4xl font-bold mb-5 p-2 text-center bg-clip-text text-transparent font-['Orbitron']"
        style={{
          background: 'linear-gradient(to right, #39FF14, #0FE9D8, #00D7FF)',
          WebkitBackgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Stargazing Conditions
      </motion.h1>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-gray-700">
        <button
          className={`px-4 py-2 ${activeTab === 'conditions' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('conditions')}
        >
          Check Conditions
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'upcoming' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Events
        </button>
      </div>

      {activeTab === 'conditions' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Search Form */}
          <motion.div
            className="border-2 border-blue-600 bg-gray-900 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">🔭 Find Stargazing Conditions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  placeholder="City, Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <button
                onClick={fetchStargazingConditions}
                disabled={loading || !location || !date}
                className={`w-full p-2 rounded ${loading || !location || !date ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? 'Loading...' : 'Check Conditions'}
              </button>
            </div>

            <div className="mt-6 bg-gray-800 p-4 rounded">
              <h3 className="font-semibold mb-2">Stargazing Tips</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Find a location away from city lights</li>
                <li>Check for clear skies with minimal cloud cover</li>
                <li>Allow your eyes 20-30 minutes to adjust to darkness</li>
                <li>Use red light to preserve night vision</li>
                <li>Bring warm clothes - temperatures drop at night</li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            className="border-2 border-blue-600 bg-gray-900 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">✨ Stargazing Results</h2>

            {conditions ? (
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Overall Quality</h3>
                    <span className={`font-bold ${getQualityColor(conditions.stargazingQuality)}`}>
                      {conditions.stargazingQuality}
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    {conditions.location} - {formatDate(conditions.date)}
                  </p>
                </div>

                {conditions.weather?.forecast && (
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="font-semibold mb-2">Weather Conditions</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p><span className="text-gray-400">Temperature:</span> {conditions.weather.forecast.temperature}</p>
                        <p><span className="text-gray-400">Cloud Cover:</span> {conditions.weather.forecast.cloudCover}</p>
                      </div>
                      <div>
                        <p><span className="text-gray-400">Humidity:</span> {conditions.weather.forecast.humidity}</p>
                        <p><span className="text-gray-400">Wind:</span> {conditions.weather.forecast.windSpeed}</p>
                      </div>
                      <div className="col-span-2">
                        <p className='text-gray-400'>Moon Phase: <span className='text-white'>{conditions.weather.forecast.moonPhase}</span></p>
                      </div>
                    </div>
                  </div>
                )}

                {conditions.celestialObjects?.length > 0 && (
                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="font-semibold mb-2">Visible Celestial Objects</h3>
                    <div className="max-h-[200px] overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-400">
                            <th className="pb-2">Object</th>
                            <th className="pb-2">Type</th>
                            <th className="pb-2">Visibility</th>
                            <th className="pb-2">Direction</th>
                          </tr>
                        </thead>
                        <tbody>
                          {conditions.celestialObjects.map((obj, i) => (
                            <tr key={i} className="border-t border-gray-700">
                              <td className="py-2">{obj.name}</td>
                              <td className="py-2 capitalize">{obj.type}</td>
                              <td className="py-2">
                                <span className={getQualityColor(obj.visibility)}>
                                  {obj.visibility}
                                </span>
                              </td>
                              <td className="py-2">{obj.direction}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p>Enter a location and date to check stargazing conditions</p>
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="border-2 border-blue-600 bg-gray-900 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">🌠 Upcoming Astronomical Events</h2>

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
        </motion.div>
      )}
    </div>
  );
}
