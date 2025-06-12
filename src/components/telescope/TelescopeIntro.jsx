import React from 'react';
import { Telescope, MoonStar } from 'lucide-react';

const TelescopeIntro = () => {
  return (
    <div className="bg-[#020e1d] p-6 rounded-xl shadow-md relative border-2 border-blue-600">
      <h1 className="text-3xl font-bold mb-3 font-['Orbitron'] text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-500">
        Telescope Sharing Network
      </h1>
      <p className="mb-3">
        Not everyone has access to a telescope, but the night sky belongs to us all. 
        Our telescope sharing network connects astronomy enthusiasts with telescope owners in their area.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-[#041b11] p-4 rounded-lg border-2 border-green-500">
          <h3 className="text-xl font-semibold mb-2">
            <Telescope className='inline-block' size={30}/> For Telescope Owners
          </h3>
          <p>
            Register your telescope and share your passion for astronomy with others. 
            Set your own availability and terms for sharing your equipment.
          </p>
        </div>
        <div className="bg-[#041b11] p-4 rounded-lg border-2 border-green-500">
          <h3 className="text-xl font-semibold mb-2">
            <MoonStar className='inline-block' size={30}/> For Stargazers
          </h3>
          <p>
            Find telescopes available in your area. Connect with owners to arrange 
            viewing sessions or short-term rentals for your stargazing adventures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TelescopeIntro;