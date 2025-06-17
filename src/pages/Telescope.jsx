import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../components/firebase';
import Popup from '../components/Popup';

// Import components
import TelescopeIntro from '../components/telescope/TelescopeIntro';
import TelescopeForm from '../components/telescope/TelescopeForm';
import MyTelescopes from '../components/telescope/MyTelescopes';
import AllTelescopes from '../components/telescope/AllTelescopes';
import TelescopeRecommendations from '../components/telescope/TelescopeRecommendations';

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
    window.scrollTo(0, 0);
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
  const buttonGradient = "bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 px-4 py-2 rounded text-white";

  const closePopup = () => {
    setPopup({ ...popup, visible: false });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white mt-16">
      <Popup 
        message={popup.message} 
        type={popup.type} 
        isVisible={popup.visible} 
        onClose={closePopup} 
      />
      
      <TelescopeIntro />
      
      <TelescopeForm 
        form={form}
        setForm={setForm}
        errors={errors}
        handleRegister={handleRegister}
        types={types}
        inputClass={inputClass}
        buttonGradient={buttonGradient}
      />
      
      <MyTelescopes myTelescopes={myTelescopes} />
      
      <AllTelescopes allTelescopes={allTelescopes} />
      
      <TelescopeRecommendations
        objectType={objectType}
        setObjectType={setObjectType}
        fetchRecommendations={fetchRecommendations}
        recommendations={recommendations}
        inputClass={inputClass}
        buttonGradient={buttonGradient}
      />
    </div>
  );
}