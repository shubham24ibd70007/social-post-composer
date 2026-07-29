import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { login } from "../redux/slices/authSlice";
import { generateToken, decodeToken } from "../utils/jwt";

import "../styles/login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer");

  function handleLogin(e) {
    e.preventDefault();

    if (email && password) {
      const token = generateToken({
        name: email.split("@")[0],
        email,
        role,
      });

      const user = decodeToken(token);

      dispatch(
        login({
          token,
          user,
        })
      );

      toast.success(`Logged in as ${role}`);
      navigate("/");
    } else {
      toast.error("Please enter email and password.");
    }
  }

  return (
    <motion.div
      className="loginPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        className="loginCard glass"
        onSubmit={handleLogin}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h1>Welcome Back</h1>

        <p>Role Based Access Control Demo</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>

        <button
    type="submit"
    className="loginBtn"
>
    Login
</button>
      </motion.form>
    </motion.div>
  );
}

export default Login;