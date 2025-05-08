// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ChatbotPage from "./components/ChatbotPage";
// import Dashboard from "./components/Dashboard";
// import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";
// import ForgotPassword from "./pages/ForgotPassword";
// import SendCode from "./pages/SendCode";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/sendcode" element={<SendCode />} />
        
//         {/* Routes dengan Layout */}
//         <Route element={<Layout />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/chatbot" element={<ChatbotPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// // Komponen Layout dengan case-sensitive routing
// const Layout = () => {
//   return (
//     <div className="app-container">
//       <Sidebar /> {/* Sidebar tetap ada di Layout */}
//       <div className="main-content">
//         <Topbar /> {/* Topbar tetap ada di Layout */}
//         <div className="content-wrapper">
//           <Outlet /> {/* Ini tempat konten dinamis tampil */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SendCode from "./pages/SendCode";
import Dashboard from "./components/Dashboard";
import ChatbotPage from "./components/ChatbotPage";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/sendcode" element={<SendCode />} />

        {/* Routes dengan layout lengkap */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Layout utama langsung di sini
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="main-with-chat">
        <Topbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};


export default App;
