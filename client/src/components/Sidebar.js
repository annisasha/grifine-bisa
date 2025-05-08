// import React from "react";
// import { Link, useLocation } from "react-router-dom"; // Import useLocation
// import "./styles.css";
// import { FaChartPie, FaComments, FaCog } from "react-icons/fa";

// const Sidebar = () => {
//   const location = useLocation(); // Dapatkan path saat ini

//   return (
//     <div className="sidebar">
//       {/* Logo */}
//       <div className="logo">
//       <img src="/logoo.png" alt="Grifine" />
//       </div>

//       {/* Menu */}
//       <ul className="menu">
//         <li>
//           <Link
//             to="/Dashboard"
//             className={`menu-item ${
//               location.pathname === "/Dashboard" ? "active" : ""
//             }`}
//           >
//             <FaChartPie className="icon" /> Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/Chatbot"
//             className={`menu-item ${
//               location.pathname === "/Chatbot" ? "active" : ""
//             }`}
//           >
//             <FaComments className="icon" /> Chatbot
//           </Link>
//         </li>
//       </ul>

//       {/* Pengaturan */}
//       {/* <div className="settings">
//         <Link
//           to="/Settings"
//           className={`menu-item ${location.pathname === "/Settings" ? "active" : ""}`}
//         >
//           <FaCog className="icon" /> Pengaturan
//         </Link>
//       </div> */}
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";
import { FaChartPie, FaComments, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // Default terbuka

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Tombol Toggle */}
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="logo">
          <img src="/logoo.png" alt="Grifine" />
        </div>

        <ul className="menu">
          <li>
            <Link
              to="/Dashboard"
              className={`menu-item ${
                location.pathname === "/Dashboard" ? "active" : ""
              }`}
            >
              <FaChartPie className="icon" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/Chatbot"
              className={`menu-item ${
                location.pathname === "/Chatbot" ? "active" : ""
              }`}
            >
              <FaComments className="icon" /> Chatbot
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
