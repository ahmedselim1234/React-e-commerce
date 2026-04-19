import { createContext, useContext, useState, useEffect } from 'react';
import { dummyUsers, dummyCurrentUser, dummyAddresses, demoAccounts } from '../data/dummyData';

const AuthContext = createContext(null);

const STORAGE_KEY = 'techstore_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState(dummyAddresses);
  const [loading, setLoading] = useState(true);

  // Load persisted user on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const persistUser = (u) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  // ── Auth actions ──────────────────────────────────────
  const login = (email, password) => {
    // Check demo accounts
    const demo = Object.values(demoAccounts).find(
      (a) => a.email === email && a.password === password
    );
    if (demo) {
      const found = dummyUsers.find((u) => u.email === email) || dummyCurrentUser;
      persistUser(found);
      return { success: true, user: found };
    }
    // Check all dummy users (any password works for demo)
    const found = dummyUsers.find((u) => u.email === email);
    if (found) {
      persistUser(found);
      return { success: true, user: found };
    }
    return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
  };

  const register = ({ first_name, email, phone, password }) => {
    if (dummyUsers.some((u) => u.email === email)) {
      return { success: false, message: 'البريد الإلكتروني مسجل مسبقاً' };
    }
    const newUser = {
      _id: 'u_new_' + Date.now(),
      first_name,
      email,
      phone,
      role: 'client',
      active: true,
      profileImage: '',
      createdAt: new Date().toISOString(),
    };
    persistUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => persistUser(null);

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    persistUser(updated);
    return { success: true };
  };

  const changePassword = (current, newPass) => {
    // Simulate: always succeeds
    return { success: true };
  };

  const forgotPassword = (email) => {
    const found = dummyUsers.find((u) => u.email === email);
    if (found) return { success: true };
    return { success: false, message: 'البريد الإلكتروني غير موجود' };
  };

  const verifyResetCode = (code) => {
    // Simulate: code 123456 always works
    if (code === '123456') return { success: true };
    return { success: false, message: 'الكود غير صحيح، جرب 123456' };
  };

  const resetPassword = (email, newPass) => {
    return { success: true };
  };

  // ── Address actions ───────────────────────────────────
  const addAddress = (addr) => {
    const newAddr = { ...addr, id: 'a_' + Date.now() };
    setAddresses((prev) => [...prev, newAddr]);
    return { success: true };
  };

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    return { success: true };
  };

  const updateAddress = (id, updates) => {
    setAddresses((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    return { success: true };
  };

  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';
  const isAdminOrManager = isAdmin || isManager;

  return (
    <AuthContext.Provider value={{
      user, loading, isAdmin, isManager, isAdminOrManager,
      login, register, logout, updateProfile, changePassword,
      forgotPassword, verifyResetCode, resetPassword,
      addresses, addAddress, removeAddress, updateAddress,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
