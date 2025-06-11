import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const provider = new GoogleAuthProvider();

export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const fetchProfile = async (token) => {
    try {
      const res = await axios.get('http://localhost:3000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      
      // If user was redirected to login, send them back to the original page
      const from = new URLSearchParams(location.search).get('from');
      if (from) {
        navigate(from);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      if (err.response?.status === 401) {
        console.warn('Token expired, signing out.');
        await signOut(auth);
        sessionStorage.removeItem('token');
        setProfile(null);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        sessionStorage.setItem('token', token);
        await fetchProfile(token);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [location]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      sessionStorage.setItem('token', token);

      await axios.post(
        'http://localhost:3000/api/user/register',
        { name: user.displayName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchProfile(token);
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('token');
    setProfile(null);
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center text-white mt-24">
      <motion.h1 
        className="text-3xl font-bold mb-6 bg-clip-text text-transparent"
        style={{
          background: 'linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)',
          WebkitBackgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Account
      </motion.h1>
      
      {!profile ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-xl mb-6">Sign in to access all features</h2>
          <button
            onClick={handleLogin}
            className="bg-cyan-700 hover:bg-cyan-600 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            {loading ? 'Signing in...' : 'Sign In with Google'}
          </button>
          
          {location.search.includes('from=') && (
            <p className="mt-4 text-amber-400">
              You need to sign in to access this feature
            </p>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 p-6 rounded-xl shadow-lg text-left border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-4">👤 User Profile</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {auth.currentUser?.email}</p>
            <p><strong>UID:</strong> {auth.currentUser?.uid}</p>
          </div>
          
          <div className="mt-6 flex flex-col space-y-3">
            <button
              onClick={() => navigate('/events')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              My Events
            </button>
            <button
              onClick={() => navigate('/telescope')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
            >
              My Telescopes
            </button>
            <button
              onClick={handleLogout}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      )}

      {authChecked && !profile && !loading && !location.search.includes('from=') && (
        <p className="mt-4 text-gray-400">Please sign in to view your profile.</p>
      )}
    </div>
  );
}
