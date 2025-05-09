import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const date = new Date();
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum’at", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = `${day}, ${date.getDate()} ${month} ${year}`;
    
    setCurrentDate(formattedDate);

    // Ambil status login
    const user = localStorage.getItem("username");
    const status = localStorage.getItem("userStatus");
    if (status === "login" && user) {
      setUsername(user);
    } else {
      setUsername("di Grifine");
    }
  }, []);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="dashboard-date"><strong>{currentDate}</strong></p>
      </div>

      <div className="greeting-box">
        <h3>Selamat Datang {username}!</h3>
        <p>Jelajahi informasi keuangan khusus petani</p>
      </div>
      
      <div className="article-section">
        <button className="article-button">Artikel</button>
        <div className="articles">
          {/* ✅ Artikel 1 */}
          <a
            href="https://www.antaranews.com/berita/4388126/bergabung-ke-koperasi-umkm-dapatkan-akses-modal-dan-pertumbuhan-usaha"
            className="article-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/article1.png" alt="Article 1" />
            <p className="article-date">10 Oktober 2024</p>
            <h4>Bergabung ke Koperasi, UMKM Dapatkan Akses Modal dan Pertumbuhan Usaha</h4>
          </a>

          {/* ✅ Artikel 2 */}
          <a
            href="https://www.antaranews.com/berita/2454681/akses-modal-gampang-usaha-makin-berkembang"
            className="article-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/article2.png" alt="Article 2" />
            <p className="article-date">09 November 2021</p>
            <h4>Akses Modal Gampang, Usaha Makin Berkembang</h4>
          </a>

          {/* ✅ Artikel 3 */}
          <a
            href="https://www.antaranews.com/berita/2179984/transformasi-akses-petani-milenial-panjang"
            className="article-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/article3.png" alt="Article 3" />
            <p className="article-date">25 Mei 2021</p>
            <h4>Transformasi Akses Petani Milenial Panjang</h4>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
