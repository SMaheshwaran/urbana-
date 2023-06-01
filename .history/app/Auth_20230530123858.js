// authContext.js
"use client"
import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial value is null or fetch user from local storage if available

  const login = (userData) => {
    // Perform login logic, e.g., authenticate with the server
    // Set the authenticated user data
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic, e.g., clear authentication token
    // Clear the user data
    setUser(null);
  };

  const isAdmin = () => user && user.role === 'admin';
  const isSuperAdmin = () => user && user.role === 'superadmin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isSuperAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
