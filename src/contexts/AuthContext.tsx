import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types/index.js';
import { api } from '../services/api.js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  demoLogin: (role: 'admin' | 'contributor' | 'student') => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isContributor: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    try {
      const data = await api.getMe();
      if (data && data.user) {
        setUser(data.user);
      }
    } catch {
      api.clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('pyqvault_token');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const data = await api.login({ email, password: pass });
    api.setToken(data.token);
    setUser(data.user);
  };

  const register = async (name: string, email: string, pass: string, role?: UserRole) => {
    const data = await api.register({ name, email, password: pass, role });
    api.setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    api.clearToken();
    setUser(null);
  };

  const demoLogin = async (role: 'admin' | 'contributor' | 'student') => {
    if (role === 'admin') {
      await login('admin@pyqvault.edu', 'Admin@123');
    } else if (role === 'contributor') {
      await login('contributor@pyqvault.edu', 'Contrib@123');
    } else {
      await login('student@pyqvault.edu', 'Student@123');
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isContributor = user?.role === 'contributor' || user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        demoLogin,
        isAuthenticated,
        isAdmin,
        isContributor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
