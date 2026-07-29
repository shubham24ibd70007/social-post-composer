import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Unauthorized() {
  return (
    <motion.div
      className="loginPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="loginCard glass">
        <h1>403</h1>

        <h2>Access Denied</h2>

        <p>
          You don't have permission to access this page.
        </p>

        <Link
          to="/"
          style={{
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Go Back to Dashboard
        </Link>
      </div>
    </motion.div>
  );
}

export default Unauthorized;