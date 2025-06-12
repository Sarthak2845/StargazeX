import React from 'react';
import { Telescope } from 'lucide-react';

const MyTelescopes = ({ myTelescopes }) => {
  return (
    <div className="p-6 rounded-xl shadow-md bg-[#020e1d] border-2 border-blue-600 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-pink-500 before:via-red-500 before:to-orange-500">
      <h2 className="text-2xl font-bold mb-4"><Telescope className='inline-block' size={30}/> My Telescopes</h2>
      {myTelescopes.length === 0 ? (
        <p className="text-gray-400">You haven't registered any telescopes yet.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-1">
          {myTelescopes.map(t => (
            <li key={t.id}>
              <span className="font-medium">{t.name}</span> — {t.model} ({t.type}) at {t.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTelescopes;