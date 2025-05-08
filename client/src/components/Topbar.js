import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./styles.css";

const Topbar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = React.useState(false);

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`topbar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      {user && user.username ? (
        <div className="topbar-profile-wrapper" onClick={toggleDropdown}>
          <div className="topbar-profile">
            <div className="profile-icon">{initials}</div>
            <span className="profile-name">{user.username}</span>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-logout">
              <button onClick={() => setShowConfirmLogout(true)}>Keluar</button>
            </div>
          )}
        </div>
      ) : (
        <div className="topbar-auth-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Masuk
          </button>
          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Daftar
          </button>
        </div>
      )}

      {showConfirmLogout && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <p>Anda yakin ingin keluar?</p>
            <div className="logout-buttons">
              <button onClick={() => setShowConfirmLogout(false)}>Batal</button>
              <button
                className="logout-btn"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
