import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import StarBackground from './components/StarBackground';
import Preloader from './components/Preloader';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import News from './pages/News';

const App = () => {
  const [loading, setLoading] = useState(true);

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
        <NavBar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            {/* Add more routes here */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;





