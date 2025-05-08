import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SendCode.css"; // ✅ Import CSS untuk halaman ini

const SendCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]); // ✅ State untuk menyimpan kode OTP

  // Fungsi untuk menangani input kode OTP
  const handleInputChange = (index, event) => {
    const value = event.target.value;
    if (!isNaN(value) && value.length <= 1) { // ✅ Hanya terima angka dan max 1 digit
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Pindah ke input berikutnya jika ada
      if (value !== "" && index < 3) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  // Fungsi ketika klik "Lanjutkan"
  const handleSubmit = () => {
    if (code.join("").length === 4) {
      navigate("/ResetPassword"); // ✅ Ganti dengan halaman reset password nantinya
    } else {
      alert("Masukkan 4 digit kode verifikasi");
    }
  };

  return (
    <div className="sendcode-container">
      {/* Bagian Kiri (Logo) */}
      <div className="sendcode-left">
        <img src="/logoo.png" alt="Grifine Logo" className="logo" />
      </div>

      {/* Bagian Kanan (Form Input Kode) */}
      <div className="sendcode-right">
        <h2 className="sendcode-title">Atur Ulang Password</h2>
        <p className="sendcode-subtitle">
          Kami telah mengirim kode ke <strong>naotomori@gmail.com</strong>
        </p>

        {/* Input Kode OTP */}
        <div className="code-input-container">
          {code.map((num, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              className="code-input"
              maxLength="1"
              value={num}
              onChange={(e) => handleInputChange(index, e)}
            />
          ))}
        </div>

        {/* Link jika kode tidak diterima */}
        <p className="resend-code">
          Tidak menerima kodenya? <Link to="/ForgotPassword" className="resend-link">Klik disini</Link>
        </p>

        {/* Tombol Lanjutkan */}
        <button className="sendcode-button" onClick={handleSubmit}>
          Lanjutkan
        </button>

        {/* Link Kembali ke Login */}
        <div className="back-to-login">
                  <p>Sudah punya akun? <Link to="/Login" className="register-link">Masuk</Link></p>
                </div>
      </div>
    </div>
  );
};

export default SendCode;
