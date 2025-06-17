// src/components/UserProfile.jsx (enhanced version)
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
import { User, LogOut, ChevronRight, LogIn, Telescope, Calendar, Newspaper, Star } from 'lucide-react';

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
    window.scrollTo(0,0);
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
        className="text-3xl font-extrabold mb-6 bg-clip-text text-transparent font-['Orbitron']"
        style={{
          background: 'linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)',
          WebkitBackgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {profile ? 'Your Cosmic Profile' : 'Join the StarGazeX Community'}
      </motion.h1>

      {!profile ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#020e1d] p-8 rounded-xl shadow-lg border-2 border-blue-600 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl -z-20">
            <div className="stars absolute w-full h-full"></div>
          </div>

          <motion.div
            className="text-4xl font-extrabold bg-clip-text text-transparent m-3 font-['Orbitron']"
            style={{
              background: 'linear-gradient(to left , #4B0082, #8F00FF, #D400FF, #FF00C8, #FF1493)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            StarGazeX
          </motion.div>

          <h2 className="text-xl mb-6 font-['Orbitron']">Explore the Universe with Us</h2>

          <p className="mb-8 text-gray-300">
            Sign in to access stargazing events, telescope sharing, and personalized astronomical recommendations.
          </p>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform  flex items-center justify-center w-full"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-fit border-t-2 border-b-2 border-white"></div>
            ) : (
              <>
                <LogIn size={18} className="mr-2" />
                Sign In with Google
              </>
            )}
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
      className="relative p-[2px] rounded-xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_hsl(283,99.2%,53.5%),_hsl(311,75.1%,51.2%),_hsl(330,85.1%,60.6%),_hsl(353,94.8%,69.8%),_hsl(17.6,100%,68.6%))] animate-text" />

      <div className="relative bg-[#0d0c0d] p-6 rounded-xl text-left w-full h-full z-10">
        <div className="flex items-center mb-6">
          {auth.currentUser?.photoURL ? (
            <img
              src={auth.currentUser.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-cyan-600"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center text-2xl font-bold text-white">
              {profile.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-pink-500">
              {profile.name}
            </h2>
            <p className="text-sm text-fuchsia-500">
              {auth.currentUser?.email}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => navigate('/events')}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex justify-between items-center"
          >
            <span className="flex items-center">
              <Calendar size={18} className="mr-2" />
              Events
            </span>
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => navigate('/news')}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex justify-between items-center"
          >
            <span className="flex items-center">
              <Newspaper size={18} className="mr-2" />
              News
            </span>
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => navigate('/stargazing')}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex justify-between items-center"
          >
            <span className="flex items-center">
              <Star size={18} className="mr-2" />
              Stargazing
            </span>
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => navigate('/telescope')}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex justify-between items-center"
          >
            <span className="flex items-center">
              <Telescope size={18} className="mr-2" />
              Telescopes
            </span>
            <ChevronRight size={18} />
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-[#bd0221] via-[#B3001F] to-[#4D000A] hover:from-red-700 hover:to-red-900 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
        >
          <LogOut size={18} className="mr-2" />
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
