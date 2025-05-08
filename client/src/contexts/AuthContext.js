import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/authService'; // Ambil dari API service kamu

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek saat pertama kali buka halaman, apakah sudah ada token?
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const guestMode = localStorage.getItem('guestMode');

    if (token) {
      // Jika ada token, kita anggap sudah login
      setUser({ token, username });
    } else if (guestMode) {
      // Kalau guestMode aktif, kita set user sebagai tamu
      setUser({ guest: true });
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    
    // Simpan token dan informasi user lainnya seperti username
    localStorage.setItem('token', data.token); // Simpan token
    localStorage.setItem('username', data.username); // Simpan username login
    localStorage.removeItem('guestMode'); // Hapus guestMode jika login normal
    setUser({ token: data.token, username: data.username }); // Simpan username
  };

  const loginAsGuest = () => {
    localStorage.setItem('guestMode', 'true');
    localStorage.removeItem('token'); // Pastikan tidak ada token
    setUser({ guest: true }); // Set user ke guest
  };

  const register = async (username, email, password) => {
    const data = await registerUser(username, email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setUser({ token: data.token, username: data.username });
  };  

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('guestMode');
    setUser(null); // Clear user state
  };

  const value = {
    user,
    login,
    loginAsGuest,
    logout,
    register, // Ditambahin
    isGuest: user?.guest || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
