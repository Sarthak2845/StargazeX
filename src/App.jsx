import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import StarBackground from './components/StarBackground';
import Preloader from './components/Preloader';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import News from './pages/News';
import Telescope from './pages/Telescope';
import Events from './pages/Events';
import StargazingConditions from './pages/StargazingConditions';
import AuthRoute from './components/AuthRoute';
import SolarSystem from './pages/SolarSytem';
import Dashboard from './pages/Dashboard';
import { auth } from './components/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <Router>
      {/* Star Background */}
      <div className="fixed inset-0 z-0">
        <StarBackground />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col min-h-screen text-white">
        {/* Only show NavBar on non-dashboard routes */}
        <Routes>
          <Route path="/dashboard" element={null} />
          <Route path="*" element={<NavBar />} />
        </Routes>
        
        <main className="flex-grow font-['Poppins']">
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <UserProfile />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/news" element={isLoggedIn ? <Navigate to="/dashboard" /> : <News />} />
            <Route path="/stargazing" element={isLoggedIn ? <Navigate to="/dashboard" /> : <StargazingConditions />} />
            <Route path="/solarsystem" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SolarSystem />} />
            <Route path="/events" element={
              <AuthRoute>
                <Navigate to="/dashboard" />
              </AuthRoute>
            } />
            <Route path="/telescope" element={
              <AuthRoute>
                <Navigate to="/dashboard" />
              </AuthRoute>
            } />
            <Route path="/dashboard" element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            } />
          </Routes>
        </main>

        {/* Only show Footer on non-dashboard routes */}
        <Routes>
          <Route path="/dashboard" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;