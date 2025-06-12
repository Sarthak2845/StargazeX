import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../components/firebase';
import { Telescope, MoonStar, Earth, MapPin, Phone } from 'lucide-react';
import Popup from '../components/Popup';

export default function TelescopeManager() {
  const [types, setTypes] = useState([]);
  const [myTelescopes, setMyTelescopes] = useState([]);
  const [allTelescopes, setAllTelescopes] = useState([]);
  const [form, setForm] = useState({
    name: '',
    location: '',
    type: '',
    model: '',
    contactinfo: '',
    aperture: '',
    focalLength: ''
  });
  const [objectType, setObjectType] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [popup, setPopup] = useState({ visible: false, message: '', type: 'error' });
  const [errors, setErrors] = useState({});

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
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
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

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Telescope name is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.type) newErrors.type = 'Type is required';
    if (!form.model.trim()) newErrors.model = 'Model is required';
    if (!form.contactinfo.trim()) newErrors.contactinfo = 'Contact info is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      setPopup({
        visible: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }
    
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
        contactinfo: '',
        aperture: '',
        focalLength: ''
      });
      fetchMyTelescopes();
      fetchAllTelescopes();
      setPopup({
        visible: true,
        message: 'Telescope registered successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error('Registration failed:', err);
      setPopup({
        visible: true,
        message: 'Registration failed: ' + (err.response?.data?.message || err.message),
        type: 'error'
      });
    }
  };

  const fetchRecommendations = async () => {
    if (!objectType.trim()) {
      setPopup({
        visible: true,
        message: 'Please enter an object type',
        type: 'error'
      });
      return;
    }
    
    try {
      const res = await axios.get(`http://localhost:3000/api/telescope/recommendations?objectType=${objectType}`);
      setRecommendations(res.data);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
      setPopup({
        visible: true,
        message: 'Failed to fetch recommendations',
        type: 'error'
      });
    }
  };

  const inputClass = "w-full p-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-400";
  
  // Space-themed CSS classes
  const cardClass = "p-6 rounded-xl shadow-md bg-[#020e1d] border-2 border-blue-600 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-pink-500 before:via-red-500 before:to-orange-500";
  const buttonGradient = "bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 px-4 py-2 rounded text-white";

  const closePopup = () => {
    setPopup({ ...popup, visible: false });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white mt-16 font-['poppins']">
      <Popup 
        message={popup.message} 
        type={popup.type} 
        isVisible={popup.visible} 
        onClose={closePopup} 
      />
      {/* Feature Introduction */}
      <div className="bg-[#020e1d] p-6 rounded-xl shadow-md  relative border-2 border-blue-600">
        <h1 className="text-3xl font-bold mb-3 font-['Orbitron'] text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-500">Telescope Sharing Network</h1>
        <p className="mb-3">Not everyone has access to a telescope, but the night sky belongs to us all. Our telescope sharing network connects astronomy enthusiasts with telescope owners in their area.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-[#041b11] p-4 rounded-lg border-2 border-green-500">
            <h3 className="text-xl font-semibold mb-2"><Telescope className='inline-block' size={30}/> For Telescope Owners</h3>
            <p>Register your telescope and share your passion for astronomy with others. Set your own availability and terms for sharing your equipment.</p>
          </div>
          <div className="bg-[#041b11] p-4 rounded-lg border-2 border-green-500">
            <h3 className="text-xl font-semibold mb-2"><MoonStar className='inline-block' size={30}/> For Stargazers</h3>
            <p>Find telescopes available in your area. Connect with owners to arrange viewing sessions or short-term rentals for your stargazing adventures.</p>
          </div>
        </div>
      </div>
      
      {/* Register Telescope */}
      <div className={cardClass}>
        <h2 className="text-2xl font-bold mb-4"><Telescope className='inline-block' size={30}/> Register Telescope</h2>
        <p className="text-sm text-red-400 mb-4">* Required fields</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <label className="text-sm text-red-500 mr-1">*</label>
              <label className="text-sm">Telescope Name</label>
            </div>
            <input
              name="name"
              placeholder="Telescope Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <label className="text-sm text-red-500 mr-1">*</label>
              <label className="text-sm">Location</label>
            </div>
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className={`${inputClass} ${errors.location ? 'border-red-500' : ''}`}
            />
            {errors.location && <span className="text-red-500 text-xs mt-1">{errors.location}</span>}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <label className="text-sm text-red-500 mr-1">*</label>
              <label className="text-sm">Type</label>
            </div>
            <select
              name="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className={`${inputClass} ${errors.type ? 'border-red-500' : ''}`}
            >
              <option value="">Select Type</option>
              {types.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            {errors.type && <span className="text-red-500 text-xs mt-1">{errors.type}</span>}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <label className="text-sm text-red-500 mr-1">*</label>
              <label className="text-sm">Model</label>
            </div>
            <input
              name="model"
              placeholder="Model"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              className={`${inputClass} ${errors.model ? 'border-red-500' : ''}`}
            />
            {errors.model && <span className="text-red-500 text-xs mt-1">{errors.model}</span>}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <label className="text-sm text-red-500 mr-1">*</label>
              <label className="text-sm">Contact Info</label>
            </div>
            <input
              name="contactinfo"
              placeholder="Contact Info"
              value={form.contactinfo}
              onChange={(e) => setForm({ ...form, contactinfo: e.target.value })}
              className={`${inputClass} ${errors.contactinfo ? 'border-red-500' : ''}`}
            />
            {errors.contactinfo && <span className="text-red-500 text-xs mt-1">{errors.contactinfo}</span>}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <label className="text-sm">Aperture (optional)</label>
            </div>
            <input
              name="aperture"
              placeholder="Aperture (optional)"
              value={form.aperture}
              onChange={(e) => setForm({ ...form, aperture: e.target.value })}
              className={inputClass}
            />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <label className="text-sm">Focal Length (optional)</label>
            </div>
            <input
              name="focalLength"
              placeholder="Focal Length (optional)"
              value={form.focalLength}
              onChange={(e) => setForm({ ...form, focalLength: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <button
          onClick={handleRegister}
          className={`${buttonGradient} w-fit mt-4 cursor-pointer hover:scale-105 transition-transform`}
        >
          Register Telescope
        </button>
      </div>

      {/* My Telescopes */}
      <div className={cardClass}>
        <h2 className="text-2xl font-bold mb-4"><Telescope className='inline-block' size={30}/> My Telescopes</h2>
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
      <div className={cardClass}>
        <h2 className="text-2xl font-bold mb-4"><Earth  className='inline-block' size={30}/> All Telescopes</h2>
        {allTelescopes.length === 0 ? (
          <p className="text-gray-400">No telescopes found in the system.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allTelescopes.map(telescope => (
              <li
                key={telescope.id}
                className="p-4 rounded-xl shadow-md bg-[#041b11] text-white hover:bg-[#071b04] transition border-2 border-green-600 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-pink-500 before:via-red-500 before:to-orange-500"
              >
                <h3 className="text-lg font-semibold">{telescope.name}</h3>
                <p className="text-sm text-gray-300">
                  <span className="font-medium">{telescope.model}</span> — {telescope.type}
                </p>
                <p className="text-sm text-gray-400"><MapPin className='inline-block pr-1' size={20}/> Located at <span className="italic">{telescope.location}</span></p>
                <p className="text-sm text-gray-400"><Phone className='inline-block pr-1' size={20}/> Contact: <span className="italic">{telescope.contactinfo}</span></p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recommendations */}
      <div className={cardClass}>
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
    </div>
  );
}

