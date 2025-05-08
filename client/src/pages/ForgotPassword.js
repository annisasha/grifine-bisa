import React from "react";
import { Link, useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="ForgotPassword-container">
      <div className="ForgotPassword-left">
        <img src="logoo.png" alt="logo"></img>
      </div>
      <div className="ForgotPassword-right">
        <h2>Lupa Password?</h2>
        <div className="welcome">
          <p>Masukkan alamat email untuk menerima tautan pengaturan ulang kata sandi.</p>
        </div>
        <form>
          <p>E-mail/Nomor Telepon</p>
          <input type="text" className="input-field" />
          <button className="ForgotPassword-button" onClick={() => navigate("/SendCode")}>Kirim Kode</button>

        </form>
        <div className="ForgotPassword-text">
          <p>Sudah punya akun? <Link to="/Login" className="register-link">Masuk</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
