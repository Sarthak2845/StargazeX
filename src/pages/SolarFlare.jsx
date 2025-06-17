import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function SolarFlare() {
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [timestamp, setTimestamp] = useState('');
  const [locationName, setLocationName] = useState('');
  const [manualCoords, setManualCoords] = useState({ x: '', y: '', radial: '' });
  const [error, setError] = useState('');
  const [predictionType, setPredictionType] = useState('location'); // 'location' or 'coordinates'

  useEffect(() => {
    fetchFeatures();
    setTimestamp(new Date().toISOString().slice(0, 16));
  }, []);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/model/features');
      setFeatures(response.data.features);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch feature information');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      let endpoint, inputData;
      
      if (predictionType === 'location') {
        endpoint = '/solar-predict';
        inputData = { 
          location: locationName,
          timestamp 
        };
      } else {
        endpoint = '/predict';
        inputData = {
          timestamp,
          location: {
            x: parseFloat(manualCoords.x),
            y: parseFloat(manualCoords.y),
            radial: parseFloat(manualCoords.radial)
          }
        };
      }

      const response = await axios.post(`http://localhost:3000/api/model${endpoint}`, inputData);
      setPrediction(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (category) => {
    switch(category) {
      case "Low": return "text-green-500";
      case "Medium": return "text-yellow-500";
      case "High": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const inputClass = "w-full p-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400";

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 text-white">
      <motion.h1 
        className="text-4xl font-bold mb-5 p-2 text-center bg-clip-text text-transparent font-['Orbitron']"
        style={{
          background: 'linear-gradient(to right, #FF8C00, #FF0080, #FF5733)',
          WebkitBackgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Solar Flare Prediction
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <motion.div 
          className="border-2 border-orange-600 bg-gray-900 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">☀️ Predict Solar Flares</h2>
          
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {/* Prediction Type Selector */}
          <div className="flex gap-2 mb-4 text-sm">
            <button
              type="button"
              onClick={() => setPredictionType('location')}
              className={`flex-1 p-2 rounded ${predictionType === 'location' ? 'bg-orange-600' : 'bg-gray-700'}`}
            >
              By Location
            </button>
            <button
              type="button"
              onClick={() => setPredictionType('coordinates')}
              className={`flex-1 p-2 rounded ${predictionType === 'coordinates' ? 'bg-orange-600' : 'bg-gray-700'}`}
            >
              By Coordinates
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Timestamp input (always shown) */}
            <div>
              <label className="block text-sm font-medium mb-1">Timestamp</label>
              <input
                type="datetime-local"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            
            {/* Location input (shown for location mode) */}
            {predictionType === 'location' && (
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  placeholder="City, Country or Latitude,Longitude"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className={inputClass}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Enter location to automatically calculate solar position
                </p>
              </div>
            )}
            
            {/* Manual coordinates input (shown for coordinates mode) */}
            {predictionType === 'coordinates' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">X Position (arcseconds)</label>
                  <input
                    type="number"
                    placeholder="120"
                    value={manualCoords.x}
                    onChange={(e) => setManualCoords({...manualCoords, x: e.target.value})}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Y Position (arcseconds)</label>
                  <input
                    type="number"
                    placeholder="30"
                    value={manualCoords.y}
                    onChange={(e) => setManualCoords({...manualCoords, y: e.target.value})}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Radial (arcseconds)</label>
                  <input
                    type="number"
                    placeholder="200"
                    value={manualCoords.radial}
                    onChange={(e) => setManualCoords({...manualCoords, radial: e.target.value})}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading || 
                (predictionType === 'location' && !locationName) || 
                (predictionType === 'coordinates' && (!manualCoords.x || !manualCoords.y || !manualCoords.radial))
              }
              className={`w-full p-2 rounded ${loading ? 'bg-gray-700' : 'bg-orange-600 hover:bg-orange-700'}`}
            >
              {loading ? 'Processing...' : 'Predict Solar Activity'}
            </button>
          </form>

          <div className="mt-6 bg-gray-800 p-4 rounded">
            <h3 className="font-semibold mb-2">About Solar Flare Prediction</h3>
            <p className="text-sm">
              This tool predicts the likelihood of solar flares occurring in the next 30 minutes based on 
              the provided timestamp and location coordinates. The risk level indicates the potential impact 
              on communications and electronic systems.
            </p>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div 
          className="border-2 border-orange-600 bg-gray-900 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">🔥 Prediction Results</h2>
          
          {prediction ? (
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-3">Solar Flare Risk Assessment</h3>
                
                <div className="flex items-center justify-center my-6">
                  <div className={`text-5xl font-bold ${getRiskColor(prediction.riskCategory)}`}>
                    {prediction.riskCategory || "Unknown"} RISK
                  </div>
                </div>
                
                <div className="flex justify-center items-center mb-4">
                  <div className="w-full max-w-xs bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        prediction.riskCategory === "Low" ? "bg-green-500" : 
                        prediction.riskCategory === "Medium" ? "bg-yellow-500" : 
                        prediction.riskCategory === "High" ? "bg-red-500" : "bg-gray-500"
                      }`}
                      style={{ width: `${(prediction.riskScore || 0) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">{Math.round((prediction.riskScore || 0) * 100)}%</span>
                </div>
                
                {prediction.riskAssessment && (
                  <div className="text-center mb-4 p-3 bg-gray-700/50 rounded">
                    <p>{prediction.riskAssessment.description}</p>
                  </div>
                )}
                
                {prediction.warning && (
                  <div className="bg-yellow-900/30 border border-yellow-600 text-yellow-200 p-3 rounded text-sm mt-4">
                    <strong>Warning:</strong> {prediction.warning}
                    {prediction.note && <p className="mt-1">{prediction.note}</p>}
                  </div>
                )}
              </div>
              
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2">Solar Position Data</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="text-gray-400">X Position:</span> {prediction.inputFeatures["x.pos.asec"]}″</p>
                  <p><span className="text-gray-400">Y Position:</span> {prediction.inputFeatures["y.pos.asec"]}″</p>
                  <p><span className="text-gray-400">Radial:</span> {prediction.inputFeatures.radial}″</p>
                  {prediction.solarPosition && (
                    <>
                      <p><span className="text-gray-400">Azimuth:</span> {Math.round(prediction.solarPosition.azimuth)}°</p>
                      <p><span className="text-gray-400">Zenith:</span> {Math.round(prediction.solarPosition.zenith)}°</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="font-semibold mb-2">Time Features</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p><span className="text-gray-400">Hour (UTC):</span> {prediction.inputFeatures.hour}</p>
                  <p><span className="text-gray-400">Day of Week:</span> {prediction.inputFeatures.dayofweek}</p>
                  <p><span className="text-gray-400">Timestamp:</span> {new Date(timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <p>Enter details to get solar flare prediction</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}