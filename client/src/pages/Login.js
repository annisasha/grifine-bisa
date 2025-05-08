import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
  
    console.log("Form data before login:", formData); // Log data sebelum login
  
    try {
      await login(formData.email, formData.password);
      setSuccessMessage("Berhasil masuk!");
      // Delay sebentar sebelum pindah halaman (opsional)
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError("Email atau password salah");
    }
  };  

  const handleGuestLogin = () => {
    localStorage.setItem('guestMode', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="logoo.png" alt="logo" />
      </div>
      <div className="login-right">
        <h2>Masuk</h2>
        <div className="welcome">
          <p>Selamat datang kembali! Silahkan masuk ke akun Anda.</p>
        </div>
        
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleLogin}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
          />
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Ingat Akun</label>
          </div>
          <div className="forgotpassword-text">
            <p>
              <Link to="/ForgotPassword" className="forgotpassword-link">
                Lupa Password?
              </Link>
            </p>
          </div>
          <button type="submit" className="login-button">Masuk</button>
        </form>
        <div className="register-text">
          <p>Belum punya akun? <Link to="/Register" className="register-link">Daftar</Link></p>
          <p onClick={handleGuestLogin} className="guest-text">Masuk Sebagai Tamu</p>
        </div>
      </div>
    </div>
  );
};

export default Login;