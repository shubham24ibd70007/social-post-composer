import { motion } from "framer-motion";
import {
  FiBell,
  FiSearch,
  FiMoon,
  FiUser,
} from "react-icons/fi";

import "../styles/navbar.css";

function Navbar() {
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

      <div className="searchBox">
        <FiSearch />

        <input
          type="text"
          placeholder="Search..."
        />
      </div>

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
        >
          <FiMoon />
        </motion.button>

        <motion.div
          className="profile"
          whileHover={{ scale: 1.08 }}
        >
          <FiUser />
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;