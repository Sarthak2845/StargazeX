import React, { useEffect } from 'react';

const Popup = ({ message, type = 'error', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="fixed top-20 right-4 z-50 animate-fade-in-down">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}>
        <span>{message}</span>
        <button 
          onClick={onClose} 
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Popup;