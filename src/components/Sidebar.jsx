import { motion } from "framer-motion";
import {
  FiHome,
  FiEdit3,
  FiCalendar,
  FiClock,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { hasPermission } from "../utils/permissions";

import "../styles/sidebar.css";

function Sidebar() {
  const role = useSelector(
    (state) => state.auth.user?.role
  );

  const menu = [
    {
      title: "Dashboard",
      icon: <FiHome />,
      path: "/",
      permission: "dashboard",
    },
    {
      title: "Create Post",
      icon: <FiEdit3 />,
      path: "/create-post",
      permission: "create",
    },
    {
      title: "Scheduled",
      icon: <FiCalendar />,
      path: "/scheduled",
      permission: "scheduled",
    },
    {
      title: "Drafts",
      icon: <FiClock />,
      path: "/drafts",
      permission: "drafts",
    },
    {
      title: "Analytics",
      icon: <FiBarChart2 />,
      path: "/analytics",
      permission: "analytics",
    },
    {
      title: "Settings",
      icon: <FiSettings />,
      path: "/settings",
      permission: "settings",
    },
  ];

  return (
    <motion.div
      className="sidebar glass"
      initial={{ x: -80 }}
      animate={{ x: 0 }}
    >
      <h1 className="sidebarTitle">
        Workspace
      </h1>

      <div className="menu">
        {menu
          .filter((item) =>
            hasPermission(role, item.permission)
          )
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "menuItem activeItem"
                  : "menuItem"
              }
            >
              <span>{item.icon}</span>

              <p>{item.title}</p>
            </NavLink>
          ))}
      </div>

      <NavLink to="/storage" className="storage glass" aria-label="View storage details">
        <h4>Storage</h4>

        <div className="progress">
          <div className="progressFill" />
        </div>

        <small>
          2.4 GB of 10 GB Used
        </small>
      </NavLink>
    </motion.div>
  );
}

export default Sidebar;
