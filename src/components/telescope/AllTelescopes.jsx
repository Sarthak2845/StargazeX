import React from 'react';
import { Earth, MapPin, Phone } from 'lucide-react';

const AllTelescopes = ({ allTelescopes }) => {
  return (
    <div className="p-6 rounded-xl shadow-md bg-[#020e1d] border-2 border-blue-600 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-pink-500 before:via-red-500 before:to-orange-500">
      <h2 className="text-2xl font-bold mb-4"><Earth className='inline-block' size={30}/> All Telescopes</h2>
      {allTelescopes.length === 0 ? (
        <p className="text-gray-400">No telescopes found in the system.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allTelescopes.map(telescope => (
            <li
              key={telescope.id}
              className="p-4 rounded-xl shadow-md bg-[#041b11] text-white hover:border-2 hover:border-green-500 transition border-2 border-transparent relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r before:from-pink-500 before:via-red-500 before:to-orange-500"
            >
              <h3 className="text-lg font-semibold">{telescope.name}</h3>
              <p className="text-sm text-gray-300">
                <span className="font-medium">{telescope.model}</span> — {telescope.type}
              </p>
              <p className="text-sm text-gray-400"><MapPin className='inline-block pr-1' size={20}/> Located at <span className="italic">{telescope.location}</span></p>
              <p className="text-sm text-gray-400"><Phone className='inline-block pr-1' size={20}/> Contact: <span className="italic">{telescope.contactinfo}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllTelescopes;