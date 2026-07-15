import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(255,255,255,0.12)",
            color: "white",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,.15)"
          }
        }}
      />
      <App />
    </>
  </React.StrictMode>
);