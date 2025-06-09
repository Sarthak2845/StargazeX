import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyBcoyI-35jCBD4HvKmOJTp0IWNUhsKmMzQ",
  authDomain: "myfirstproject-178f5.firebaseapp.com",
  projectId: "myfirstproject-178f5",
  storageBucket: "myfirstproject-178f5.firebasestorage.app",
  messagingSenderId: "384664206421",
  appId: "1:384664206421:web:eb9d8ac710a62e0b2c68dc",
  measurementId: "G-XDPWET92Z5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (token) => {
    try {
      const res = await axios.get('http://localhost:3000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Fetched profile:', res.data);
      setProfile(res.data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  // 🔁 Check if user already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('token', token); // Save token
        fetchProfile(token);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem('token', token); // Save token after login

      await axios.post(
        'http://localhost:3000/api/user/register',
        { name: user.displayName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchProfile(token);
    } catch (err) {
      console.error('Error during login or registration:', err);
      alert('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <button
        onClick={handleLogin}
        className="bg-cyan-100 text-black px-5 py-2 rounded-lg shadow hover:bg-gray-200"
      >
        {loading ? 'Signing in...' : 'Sign In with Google'}
      </button>

      {profile && (
        <div className="mt-6 bg-white text-black p-4 rounded shadow-md text-left">
          <h2 className="text-xl font-semibold mb-2">👤 User Profile</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {auth.currentUser?.email}</p>
          <p><strong>UID:</strong> {auth.currentUser?.uid}</p>
        </div>
      )}
    </div>
  );
}
