import { useDispatch, useSelector } from "react-redux";
import { FiMoon, FiSun } from "react-icons/fi";

import { toggleDarkMode } from "../redux/slices/uiSlice";
import "../styles/settings.css";

function Settings() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <div className="settingsPage glass">
      <h1>Settings</h1>
      <p className="subtitle">Customize how Social Composer looks on this device.</p>

      <section className="themeSetting">
        <div>
          <h2>Appearance</h2>
          <p>Choose between a dark or light workspace theme.</p>
        </div>
        <button type="button" className="themeToggle" onClick={() => dispatch(toggleDarkMode())} aria-pressed={darkMode}>
          <span className={darkMode ? "active" : ""}><FiMoon /> Dark</span>
          <span className={!darkMode ? "active" : ""}><FiSun /> Light</span>
        </button>
      </section>
    </div>
  );
}

export default Settings;
