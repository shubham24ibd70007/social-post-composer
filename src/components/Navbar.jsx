import { motion } from "framer-motion";
import {
  FiBell,
  FiSearch,
  FiMoon,
  FiSun,
  FiLogOut,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { logout } from "../redux/slices/authSlice";
import { toggleDarkMode } from "../redux/slices/uiSlice";

import "../styles/navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.ui.darkMode);
  const [search, setSearch] = useState("");

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  function handleSearch(event) {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/drafts?q=${encodeURIComponent(query)}` : "/drafts");
  }

  function getRoleColor(role) {
    switch (role) {
      case "Admin":
        return "#ef4444";
      case "Editor":
        return "#3b82f6";
      case "Viewer":
        return "#10b981";
      default:
        return "#64748b";
    }
  }

  return (
    <motion.nav
      className="navbar glass"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      <div className="logo">
        <div className="logoCircle">S</div>

        <div>
          <h2>Social Composer</h2>
          <span>Create • Preview • Publish</span>
        </div>
      </div>

      <form className="searchBox" onSubmit={handleSearch} role="search">
        <FiSearch />

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search drafts..."
          aria-label="Search drafts by content or platform"
        />
      </form>

      <div className="navActions">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiBell />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`}
          onClick={() => dispatch(toggleDarkMode())}
        >
          {darkMode ? <FiMoon /> : <FiSun />}
        </motion.button>

        <motion.div
          className="profile"
          whileHover={{ scale: 1.08 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "white",
          }}
        >
          <FaUserCircle size={32} />

          <div>
            <div style={{ fontWeight: 600 }}>
              {user?.name}
            </div>

            <span
              style={{
                background: getRoleColor(user?.role),
                padding: "3px 10px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {user?.role}
            </span>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          <FiLogOut />
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default Navbar;
