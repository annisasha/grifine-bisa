import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);
  
    try {
      await register(formData.username, formData.email, formData.password);
      setSuccessMessage("Pendaftaran berhasil! Silakan login.");
      // Delay sebentar sebelum pindah halaman (opsional)
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Gagal mendaftar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="register-container">
      <div className="register-left">
        <img src="logoo.png" alt="logo" />
      </div>
      <div className="register-right">
        <h2>Daftar</h2>
        <div className="welcome">
          <p>Selamat datang! Silahkan daftarkan akun Anda.</p>
        </div>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleRegister}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
            required
            minLength={3}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
            minLength={6}
          />
          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>
        <div className="register-text">
          <p>
            Sudah punya akun? <Link to="/login" className="register-link">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
