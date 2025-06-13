import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../components/firebase';
import { User, Calendar, Telescope, LogOut, Newspaper, Image, Star, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import PictureOfDay from '../components/PictureOfDay';
import Events from './Events';
import TelescopeManager from './Telescope';
import DashboardNews from '../components/DashboardNews';
import StargazingConditionsComponent from '../components/StargazingConditionsComponent';
import AstronomicalEvents from '../components/AstronomicalEvents';

// Dashboard components
const Profile = () => (
  <div className="bg-[#020e1d] p-6 rounded-xl shadow-lg border border-blue-600">
    <h2 className="text-2xl font-bold mb-4 text-white">My Profile</h2>
    <div className="flex items-center mb-6">
      {auth.currentUser?.photoURL ? (
        <img 
          src={auth.currentUser.photoURL} 
          alt="Profile" 
          className="w-16 h-16 rounded-full border-2 border-purple-500"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center text-2xl font-bold">
          {auth.currentUser?.displayName?.charAt(0) || 'U'}
        </div>
      )}
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-white">{auth.currentUser?.displayName}</h3>
        <p className="text-sm text-gray-400">{auth.currentUser?.email}</p>
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-gray-300">
        <span>Member since:</span>
        <span>{auth.currentUser?.metadata?.creationTime ? new Date(auth.currentUser.metadata.creationTime).toLocaleDateString() : 'N/A'}</span>
      </div>
    </div>
  </div>
);

const AstronomyPicture = () => (
  <div className="bg-[#020e1d] p-6 rounded-xl shadow-lg border border-blue-600">
    <h2 className="text-2xl font-bold mb-4 text-white">Astronomy Picture of the Day</h2>
    <PictureOfDay />
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('pod');
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('token');
    navigate('/login');
  };
  
  // Render the active component based on the selected tab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'pod':
        return <AstronomyPicture />;
      case 'profile':
        return <Profile />;
      case 'events':
        return <Events />;
      case 'telescopes':
        return <TelescopeManager />;
      case 'news':
        return <DashboardNews />;
      case 'stargazing':
        return <StargazingConditionsComponent />;
      case 'astronomical-events':
        return <AstronomicalEvents />;
      default:
        return <AstronomyPicture />;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent"
        style={{
          background: 'linear-gradient(to right, #40E0D0, #FF8C00, #FF0080)',
          WebkitBackgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        StarGazeX Dashboard
      </motion.h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <motion.div 
          className="md:w-1/5 bg-[#020e1d] p-4 rounded-xl shadow-lg border border-blue-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4 text-white">Navigation</h2>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('pod')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'pod' ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Image size={18} />
                Picture of the Day
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('news')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'news' ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Newspaper size={18} />
                News
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('events')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'events' ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Calendar size={18} />
                Events
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('telescopes')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'telescopes' ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Telescope size={18} />
                Telescopes
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('stargazing')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'stargazing' ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Star size={18} />
                Stargazing Conditions
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('astronomical-events')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'astronomical-events' ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Moon size={18} />
                Astronomical Events
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${activeTab === 'profile' ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <User size={18} />
                Profile
              </button>
            </li>
            <li className="pt-4 border-t border-gray-700">
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 text-red-400 hover:bg-gray-800 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </li>
          </ul>
        </motion.div>
        
        {/* Main Content */}
        <motion.div 
          className="md:w-4/5 overflow-x-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="dashboard-content">
            {renderActiveComponent()}
          </div>
        </motion.div>
      </div>
      
      {/* Custom styles for embedded pages */}
      <style jsx>{`
        .dashboard-content > div {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
      `}</style>
    </div>
  );
}