import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Background from "./components/Background";
import MouseGlow from "./components/MouseGlow";
import Preview from "./components/Preview";
import Validation from "./components/Validation";

import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Drafts from "./pages/Drafts";
import Scheduled from "./pages/Scheduled";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import "./styles/dashboard.css";

function App() {
  return (
    <>
      <Background />
      <MouseGlow />

      <Navbar />

      <div className="dashboard">

        <Sidebar />

        <div className="mainContent">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route
              path="/create-post"
              element={<CreatePost />}
            />

            <Route
              path="/drafts"
              element={<Drafts />}
            />

            <Route
              path="/scheduled"
              element={<Scheduled />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Routes>

        </div>

        <div className="rightPanel">

          <Preview />

          <Validation />

        </div>

      </div>
    </>
  );
}

export default App;