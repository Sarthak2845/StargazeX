import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../components/firebase';

export default function TelescopeManager() {
  const [types, setTypes] = useState([]);
  const [myTelescopes, setMyTelescopes] = useState([]);
  const [allTelescopes, setAllTelescopes] = useState([]);
  const [form, setForm] = useState({
    name: '',
    location: '',
    type: '',
    model: '',
    contactinfo:'',
    aperture: '',
    focalLength: ''
  });
  const [objectType, setObjectType] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const getToken = async () => {
    const user = auth.currentUser;
    return user ? await user.getIdToken() : localStorage.getItem('token');
  };

  useEffect(() => {
    fetchTelescopeTypes();
    fetchMyTelescopes();
    fetchAllTelescopes();
  }, []);

  const fetchTelescopeTypes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/telescope/types');
      setTypes(res.data);
    } catch (err) {
      console.error('Failed to fetch telescope types:', err);
    }
  };

  const fetchMyTelescopes = async () => {
    try {
      const token = await getToken();
      const res = await axios.get('http://localhost:3000/api/telescope/my-telescopes', {
        headers: { Authorization: `Bearer ${token}`,'Cache-Control': 'no-store',
    'Pragma': 'no-cache',
    'Expires': '0' }
      });
      console.log('Fetched telescopes:', res.data);
      setMyTelescopes(res.data);
    } catch (err) {
      console.error('Failed to fetch my telescopes:', err);
    }
  };

  const fetchAllTelescopes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/telescope/all');
      setAllTelescopes(res.data);
    } catch (err) {
      console.error('Failed to fetch all telescopes:', err);
    }
  };

  const handleRegister = async () => {
    try {
      const token = await getToken();
      await axios.post(
        'http://localhost:3000/api/telescope/register',
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setForm({
        name: '',
        location: '',
        type: '',
        model: '',
          contactinfo:'',
        aperture: '',
        focalLength: ''
      });
      fetchMyTelescopes();
      fetchAllTelescopes();
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/telescope/recommendations?objectType=${objectType}`);
      setRecommendations(res.data);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    }
  };

  const inputClass = "w-full p-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 text-white">
      {/* Register Telescope */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">📡 Register Telescope</h2>
        <div className="space-y-3">
          <input
            name="name"
            placeholder="Telescope Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className={inputClass}
          />
          <select
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className={inputClass}
          >
            <option value="">Select Type</option>
            {types.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <input
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className={inputClass}
          />
             <input
            name="contactinfo"
            placeholder="Contact Info"
            value={form.contactinfo}
            onChange={(e) => setForm({ ...form, contactinfo: e.target.value })}
            className={inputClass}
          />
          <input
            name="aperture"
            placeholder="Aperture (optional)"
            value={form.aperture}
            onChange={(e) => setForm({ ...form, aperture: e.target.value })}
            className={inputClass}
          />
          <input
            name="focalLength"
            placeholder="Focal Length (optional)"
            value={form.focalLength}
            onChange={(e) => setForm({ ...form, focalLength: e.target.value })}
            className={inputClass}
          />
          <button
            onClick={handleRegister}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white w-full"
          >
            Register Telescope
          </button>
        </div>
      </div>

      {/* My Telescopes */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">🔭 My Telescopes</h2>
        {myTelescopes.length === 0 ? (
          <p className="text-gray-400">You haven't registered any telescopes yet.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1">
            {myTelescopes.map(t => (
              <li key={t.id}>
                <span className="font-medium">{t.name}</span> — {t.model} ({t.type}) at {t.location}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* All Telescopes */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">🌍 All Telescopes</h2>
        {allTelescopes.length === 0 ? (
          <p className="text-gray-400">No telescopes found in the system.</p>
        ) : (
    <ul className="space-y-4">
  {allTelescopes.map(telescope => (
    <li
      key={telescope.id}
      className="p-4 rounded-xl shadow-md bg-gray-800 text-white hover:bg-gray-700 transition"
    >
      <h3 className="text-lg font-semibold">{telescope.name}</h3>
      <p className="text-sm text-gray-300">
        <span className="font-medium">{telescope.model}</span> — {telescope.type}
      </p>
      <p className="text-sm text-gray-400">📍 Located at <span className="italic">{telescope.location}</span></p>
      <p className="text-sm text-gray-400">📞 Contact: <span className="italic">{telescope.contactinfo}</span></p>
    </li>
  ))}
</ul>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">🌌 Get Telescope Recommendations</h2>
        <div className="flex gap-2 mb-4">
          <input
            placeholder="Enter object type (planet, galaxy, nebula...)"
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
            className={`${inputClass} flex-grow`}
          />
          <button
            onClick={fetchRecommendations}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white"
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
    </div>
  );
}
