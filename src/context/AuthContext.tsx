import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { currentUser } from '../mock/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  location: string;
  joinDate: string;
  avatar: string;
  reportingManager: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check from localStorage
    const storedUser = localStorage.getItem('employee_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Auto-login with mock user for demo
      setUser(currentUser);
      localStorage.setItem('employee_user', JSON.stringify(currentUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('employee_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('employee_user');
  };

  const updateUser = (updatedData: Partial<User>) => {
    const updated = { ...user, ...updatedData } as User;
    setUser(updated);
    localStorage.setItem('employee_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
