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
import { User, LogOut, ChevronRight, LogIn } from 'lucide-react';

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
        {profile ? 'Your Cosmic Profile' : 'Join the StarGazeX Community'}
      </motion.h1>
      
      {!profile ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#020e1d] p-8 rounded-xl shadow-lg border-2 border-blue-600 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-pink-500 before:via-red-500 before:to-orange-500"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl -z-20">
            <div className="stars absolute w-full h-full"></div>
          </div>
          
          <img src="/telescope-icon.png" alt="StarGazeX" className="w-24 h-24 mx-auto mb-6" />
          
          <h2 className="text-xl mb-6 font-['Orbitron']">Explore the Universe with Us</h2>
          
          <p className="mb-8 text-gray-300">
            Sign in to access stargazing events, telescope sharing, and personalized astronomical recommendations.
          </p>
          
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-full"
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
          className="bg-[#020e1d] p-6 rounded-xl shadow-lg text-left border-2 border-blue-600 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-pink-500 before:via-red-500 before:to-orange-500"
        >
          <div className="flex items-center mb-6">
            {auth.currentUser?.photoURL ? (
              <img 
                src={auth.currentUser.photoURL} 
                alt="Profile" 
                className="w-16 h-16 rounded-full border-2 border-purple-500"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center text-2xl font-bold">
                {profile.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-400">{auth.currentUser?.email}</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex justify-between items-center"
            >
              <span className="flex items-center">
                <User size={18} className="mr-2" />
                Dashboard
              </span>
              <ChevronRight size={18} />
            </button>
            
            <button
              onClick={() => navigate('/events')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex justify-between items-center"
            >
              <span className="flex items-center">
                <User size={18} className="mr-2" />
                My Events
              </span>
              <ChevronRight size={18} />
            </button>
            
            <button
              onClick={() => navigate('/telescope')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex justify-between items-center"
            >
              <span className="flex items-center">
                <User size={18} className="mr-2" />
                My Telescopes
              </span>
              <ChevronRight size={18} />
            </button>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </motion.div>
      )}

      {authChecked && !profile && !loading && !location.search.includes('from=') && (
        <p className="mt-4 text-gray-400">Please sign in to view your profile.</p>
      )}
      
      {/* Add some stars in the background */}
      <style jsx>{`
        .stars {
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), 
                            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.3;
          animation: twinkle 5s infinite;
        }
        
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 0.4; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
