import { motion } from "framer-motion";
import {
  FiHome,
  FiEdit3,
  FiCalendar,
  FiBarChart2,
  FiSettings,
  FiClock,
} from "react-icons/fi";

import "../styles/sidebar.css";

const menu = [
  {
    icon: <FiHome />,
    title: "Dashboard",
  },
  {
    icon: <FiEdit3 />,
    title: "Create Post",
  },
  {
    icon: <FiCalendar />,
    title: "Scheduled",
  },
  {
    icon: <FiClock />,
    title: "Drafts",
  },
  {
    icon: <FiBarChart2 />,
    title: "Analytics",
  },
  {
    icon: <FiSettings />,
    title: "Settings",
  },
];

function Sidebar() {
  return (
    <motion.aside
      className="sidebar glass"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="sidebarTitle">
        Workspace
      </div>

      <div className="menu">
        {menu.map((item, index) => (
          <motion.div
            key={index}
            className={`menuItem ${
              index === 1 ? "activeItem" : ""
            }`}
            whileHover={{
              x: 8,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <span>{item.icon}</span>

            <p>{item.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="storage glass">
        <h4>Storage</h4>

        <div className="progress">
          <div className="progressFill"></div>
        </div>

        <small>2.4 GB of 10 GB Used</small>
      </div>
    </motion.aside>
  );
}

export default Sidebar;