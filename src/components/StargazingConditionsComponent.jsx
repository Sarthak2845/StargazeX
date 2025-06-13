import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function StargazingConditionsComponent() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [conditions, setConditions] = useState(null);
  const [loading, setLoading] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fetch stargazing conditions
  const fetchStargazingConditions = async () => {
    if (!location || !date) return;
    
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/api/celestial/stargazing-conditions?date=${date}&location=${encodeURIComponent(location)}`
      );
      setConditions(res.data);
    } catch (err) {
      console.error('Failed to fetch stargazing conditions:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get quality color based on stargazing quality
  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent': return 'text-green-400';
      case 'Good': return 'text-yellow-400';
      default: return 'text-red-400';
    }
  };

  // Input field styling
  const inputClass = "w-full p-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400";

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-white">Stargazing Conditions</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Search Form */}
        <div className="bg-[#020e1d] p-6 rounded-xl shadow-lg border border-blue-600">
          <h2 className="text-xl font-bold mb-4">🔭 Find Stargazing Conditions</h2>
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

          {/* Tips for stargazing */}
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
        </div>

        {/* Right Column - Results */}
        <div className="bg-[#020e1d] p-6 rounded-xl shadow-lg border border-blue-600">
          <h2 className="text-xl font-bold mb-4">✨ Stargazing Results</h2>
          
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

              {/* Weather Information */}
              {conditions.weather && (
                <div className="bg-gray-800 p-4 rounded">
                  <h3 className="font-semibold mb-2">Weather Conditions</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p><span className="text-gray-400">Temperature:</span> {conditions.weather.temperature}</p>
                      <p><span className="text-gray-400">Cloud Cover:</span> {conditions.weather.cloudCover}</p>
                    </div>
                    <div>
                      <p><span className="text-gray-400">Humidity:</span> {conditions.weather.humidity}</p>
                      <p><span className="text-gray-400">Wind:</span> {conditions.weather.windSpeed}</p>
                    </div>
                    <div>
                      <p className='text-gray-400'>Moon Phase: <span className='text-white'>{conditions.weather.moonPhase}</span></p>
                    </div>
                  </div>
                </div>
              )}

              {/* Celestial Objects */}
              {conditions.celestialObjects && conditions.celestialObjects.length > 0 && (
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
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <p>Enter a location and date to check stargazing conditions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}