import React,{useState} from 'react';
import UserProfile from './components/UserProfile';
import StarBackground from './components/StarBackground';
import Preloader from './components/Preloader';
import NavBar from './components/NavBar';
const App = () => {
   const [loading, setLoading] = useState(true);
  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }
  return (
    <>
  <div className="fixed inset-0 z-0">
    <StarBackground />
  </div>
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
    <NavBar />
    <h1 className="text-4xl font-bold">Welcome to StarGazeX</h1>
    <p className="mt-4 text-lg">This is a simple React application.</p>
  </div>
</>
  );
};

export default App;



