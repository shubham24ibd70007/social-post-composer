import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Background from "./components/Background";
import MouseGlow from "./components/MouseGlow";
import Preview from "./components/Preview";
import Validation from "./components/Validation";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Drafts from "./pages/Drafts";
import Scheduled from "./pages/Scheduled";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

import "./styles/dashboard.css";

function App() {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return (
      <>
        <Background />
        <MouseGlow />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Background />
      <MouseGlow />

      <Navbar />

      <div className="dashboard">
        <Sidebar />

        <div className="mainContent">
          <Routes>

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-post"
              element={
                <RoleProtectedRoute permission="create">
                  <CreatePost />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/drafts"
              element={
                <RoleProtectedRoute permission="drafts">
                  <Drafts />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/scheduled"
              element={
                <RoleProtectedRoute permission="scheduled">
                  <Scheduled />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <RoleProtectedRoute permission="analytics">
                  <Analytics />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <RoleProtectedRoute permission="settings">
                  <Settings />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/unauthorized"
              element={<Unauthorized />}
            />

            <Route
              path="/login"
              element={<Navigate to="/" replace />}
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