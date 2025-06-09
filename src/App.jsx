import React,{useState} from 'react';
import UserProfile from './components/UserProfile';
import StarBackground from './components/StarBackground';
import Preloader from './components/Preloader';
const App = () => {
   const [loading, setLoading] = useState(true);
  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }
  return (
    <>  
     <StarBackground /> 
    
  
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-4xl font-bold">Welcome to StarGazeX</h1>
        <p className="mt-4 text-lg">This is a simple React application.</p>
         <UserProfile />
      </div>
    </>
  );
};

export default App;



