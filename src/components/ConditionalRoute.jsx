import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Component to conditionally show routes based on authentication status
export default function ConditionalRoute({ children, requiresAuth }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    
    return () => unsubscribe();
  }, []);
  
  // Show loading spinner while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  // If route requires auth and user is not authenticated, redirect to login
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Otherwise render the children
  return children;
}