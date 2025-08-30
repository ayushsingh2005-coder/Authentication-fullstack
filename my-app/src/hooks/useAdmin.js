// Custom hook for admin authentication and state
import { useState, useEffect } from 'react';

export const useAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = () => {
    try {
      const token = localStorage.getItem('adminToken');
      const adminData = localStorage.getItem('adminUser');
      
      if (token && adminData) {
        setAdmin(JSON.parse(adminData));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking admin auth:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  return {
    admin,
    isAuthenticated,
    loading,
    logout,
    checkAdminAuth
  };
};