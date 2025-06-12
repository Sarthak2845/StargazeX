import React from 'react';

const TelescopeRecommendations = ({ objectType, setObjectType, fetchRecommendations, recommendations, inputClass, buttonGradient }) => {
  return (
    <div className="p-6 rounded-xl shadow-md bg-[#020e1d] border-2 border-blue-600 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-pink-500 before:via-red-500 before:to-orange-500">
      <h2 className="text-2xl font-bold mb-4">🌌 Get Telescope Recommendations</h2>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="flex-grow">
          <div className="flex items-center mb-1">
            <label className="text-sm text-red-500 mr-1">*</label>
            <label className="text-sm">Object Type</label>
          </div>
          <input
            placeholder="Enter object type (planet, galaxy, nebula...)"
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
            className={`${inputClass} w-full`}
          />
        </div>
        <button
          onClick={fetchRecommendations}
          className={`${buttonGradient} self-end`}
        >
          Recommend
        </button>
      </div>
      {recommendations.length > 0 && (
        <ul className="space-y-2">
          {recommendations.map((r, i) => (
            <li key={i} className="bg-gray-800 p-3 rounded">
              <strong>{r.type}</strong>: {r.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TelescopeRecommendations;