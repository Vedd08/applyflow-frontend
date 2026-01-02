import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

/* ================= ROLE DETECTION ================= */
const detectRoleFromPath = () => {
  const path = window.location.pathname;

  if (path.startsWith('/admin')) return 'admin';
  if (path.startsWith('/recruiter')) return 'recruiter';
  return 'student';
};

const getRoleKey = (role) => {
  if (role === 'admin') return 'admin';
  if (role === 'recruiter') return 'recruiter';
  return 'student';
};

/* ================= LOAD STORED USER ================= */
const getStoredUser = () => {
  try {
    const role = detectRoleFromPath();
    const storedUser = localStorage.getItem(`${role}_user`);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());

  /* ================= LOGIN ================= */
  const login = (data) => {
    const roleKey = getRoleKey(data.user.role);

    localStorage.setItem(`${roleKey}_token`, data.token);
    localStorage.setItem(`${roleKey}_user`, JSON.stringify(data.user));

    setUser(data.user);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    const role = detectRoleFromPath();
    const roleKey = getRoleKey(role);

    localStorage.removeItem(`${roleKey}_token`);
    localStorage.removeItem(`${roleKey}_user`);

    setUser(null);
  };

  /* ================= SYNC ON TAB CHANGE ================= */
  useEffect(() => {
    const role = detectRoleFromPath();
    const storedUser = localStorage.getItem(`${role}_user`);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
