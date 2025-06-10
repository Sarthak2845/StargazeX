import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import axios from 'axios';

const provider = new GoogleAuthProvider();

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const fetchProfile = async (token) => {
    try {
      const res = await axios.get('http://localhost:3000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
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
  }, []);

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
    <div className="p-6 max-w-md mx-auto text-center text-white">
      {!profile ? (
        <button
          onClick={handleLogin}
          className="bg-cyan-700 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg shadow"
        >
          {loading ? 'Signing in...' : 'Sign In with Google'}
        </button>
      ) : (
        <>
          <div className="mt-6 bg-gray-900 text-white p-4 rounded shadow text-left border border-gray-700">
            <h2 className="text-xl font-semibold mb-2">👤 User Profile</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {auth.currentUser?.email}</p>
            <p><strong>UID:</strong> {auth.currentUser?.uid}</p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        </>
      )}

      {authChecked && !profile && !loading && (
        <p className="mt-4 text-gray-400">Please sign in to view your profile.</p>
      )}
    </div>
  );
}
