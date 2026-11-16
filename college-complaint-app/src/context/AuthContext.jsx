import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  apiLogin,
  apiRegister,
  apiGetComplaints,
  apiCreateComplaint,
  apiAdminUpdate,
  apiDeptUpdate
} from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('quantum_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [complaints, setComplaints] = useState([]);

  // Persist logged-in user session
  useEffect(() => {
    if (user) {
      localStorage.setItem('quantum_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('quantum_user');
    }
  }, [user]);

  // Fetch all complaints from SQLite database on load
  const loadComplaints = async () => {
    try {
      const res = await apiGetComplaints();
      setComplaints(res.data);
    } catch (err) {
      console.error('Failed to load complaints from backend:', err);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const login = async (email, password, role) => {
    try {
      const res = await apiLogin(email, password, role);
      setUser(res.data);
      await loadComplaints();
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false };
    }
  };

  const registerStudent = async (studentData) => {
    try {
      const res = await apiRegister(studentData);
      setUser(res.data);
      await loadComplaints();
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const addComplaint = async (newComplaint) => {
    try {
      const payload = {
        ...newComplaint,
        studentName: user?.name || 'Rahul Sharma',
        studentRoll: user?.rollNumber || '21CSE045'
      };
      const res = await apiCreateComplaint(payload);
      setComplaints((prev) => [res.data, ...prev]);
      return res.data;
    } catch (err) {
      console.error('Error submitting complaint:', err);
    }
  };

  const updateComplaintStatus = async (id, newStatus, adminRemarks, department) => {
    try {
      const res = await apiAdminUpdate(id, {
        status: newStatus,
        adminRemarks,
        department
      });
      setComplaints((prev) => prev.map((c) => (c.id === id ? res.data : c)));
    } catch (err) {
      console.error('Error updating complaint status:', err);
    }
  };

  const updateDepartmentProgress = async (id, newStatus, staffRemarks, estDate) => {
    try {
      const res = await apiDeptUpdate(id, {
        status: newStatus,
        staffRemarks,
        estimatedResolution: estDate
      });
      setComplaints((prev) => prev.map((c) => (c.id === id ? res.data : c)));
    } catch (err) {
      console.error('Error updating department progress:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        registerStudent,
        logout,
        complaints,
        addComplaint,
        updateComplaintStatus,
        updateDepartmentProgress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);