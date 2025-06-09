import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: 'ADMIN' | 'USER' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'ADMIN' | 'USER' | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('role');
      if (token) {
        setIsAuthenticated(true);
        setUserRole(role === 'ADMIN' ? 'ADMIN' : 'USER');
      }
      setLoading(false); // Set loading to false after checking auth status
    };
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken);
        localStorage.setItem('role', response.data.role);
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        navigate(response.data.role === 'ADMIN' ? '/admin' : '/home');
      }
    } catch (err) {
      alert('Invalid credentials!');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, loading }}>
      {!loading && children} {/* Render children only after loading is complete */}
    </AuthContext.Provider>
  );
};
