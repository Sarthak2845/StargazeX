import React from 'react';
import { Telescope } from 'lucide-react';
import { motion } from 'framer-motion';

const TelescopeForm = ({ form, setForm, errors, handleRegister, types, inputClass, buttonGradient }) => {
  return (
    <motion.div 
      className="p-6 rounded-xl shadow-md bg-[#020e1d] border-2 border-blue-600 relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-r"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}>
      <h2 className="text-2xl font-bold mb-4"><Telescope className='inline-block' size={30}/> Register Telescope</h2>
      <p className="text-sm text-red-400 mb-4">* Required fields</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <label className="text-sm text-red-500 mr-1">*</label>
            <label className="text-sm">Telescope Name</label>
          </div>
          <input
            name="name"
            placeholder="Telescope Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <label className="text-sm text-red-500 mr-1">*</label>
            <label className="text-sm">Location</label>
          </div>
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className={`${inputClass} ${errors.location ? 'border-red-500' : ''}`}
          />
          {errors.location && <span className="text-red-500 text-xs mt-1">{errors.location}</span>}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <label className="text-sm text-red-500 mr-1">*</label>
            <label className="text-sm">Type</label>
          </div>
          <select
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className={`${inputClass} ${errors.type ? 'border-red-500' : ''}`}
          >
            <option value="">Select Type</option>
            {types.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          {errors.type && <span className="text-red-500 text-xs mt-1">{errors.type}</span>}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <label className="text-sm text-red-500 mr-1">*</label>
            <label className="text-sm">Model</label>
          </div>
          <input
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className={`${inputClass} ${errors.model ? 'border-red-500' : ''}`}
          />
          {errors.model && <span className="text-red-500 text-xs mt-1">{errors.model}</span>}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <label className="text-sm text-red-500 mr-1">*</label>
            <label className="text-sm">Contact Info</label>
          </div>
          <input
            name="contactinfo"
            placeholder="Contact Info"
            value={form.contactinfo}
            onChange={(e) => setForm({ ...form, contactinfo: e.target.value })}
            className={`${inputClass} ${errors.contactinfo ? 'border-red-500' : ''}`}
          />
          {errors.contactinfo && <span className="text-red-500 text-xs mt-1">{errors.contactinfo}</span>}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <label className="text-sm">Aperture (optional)</label>
          </div>
          <input
            name="aperture"
            placeholder="Aperture (optional)"
            value={form.aperture}
            onChange={(e) => setForm({ ...form, aperture: e.target.value })}
            className={inputClass}
          />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <label className="text-sm">Focal Length (optional)</label>
          </div>
          <input
            name="focalLength"
            placeholder="Focal Length (optional)"
            value={form.focalLength}
            onChange={(e) => setForm({ ...form, focalLength: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <button
        onClick={handleRegister}
        className={`${buttonGradient} w-fit mt-4 cursor-pointer hover:scale-105 transition-transform`}
      >
        Register Telescope
      </button>
    </motion.div>
  );
};

export default TelescopeForm;