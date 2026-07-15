import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiImage,
  FiSend,
} from "react-icons/fi";

import "../styles/validation.css";

function Validation({ platform, text, image }) {
  const limits = {
    Instagram: 2200,
    X: 280,
    LinkedIn: 3000,
    Facebook: 63206,
  };

  const max = limits[platform];
  const used = text.length;
  const percent = Math.min((used / max) * 100, 100);

  const valid = used <= max;

  return (
    <motion.div
      className="validation glass"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .4 }}
    >
      <h2>Status</h2>

      <div className="statusCard">

        <div className="statusHead">
          <FiCheckCircle />
          Character Count
        </div>

        <h1>{used}/{max}</h1>

        <div className="progressBar">
          <div
            className="progressFill"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

      </div>

      <div className="statusCard">

        <div className="statusHead">

          {valid ? (
            <FiCheckCircle />
          ) : (
            <FiAlertCircle />
          )}

          Validation

        </div>

        <p>

          {valid
            ? "Ready for publishing"
            : "Character limit exceeded"}

        </p>

      </div>

      <div className="statusCard">

        <div className="statusHead">

          <FiImage />

          Upload

        </div>

        <p>

          {image
            ? "Image attached"
            : "No image selected"}

        </p>

      </div>

      <motion.button

        whileHover={{ scale: 1.03 }}

        whileTap={{ scale: .95 }}

        className="publishNow"

      >

        <FiSend />

        Publish Now

      </motion.button>

    </motion.div>
  );
}

export default Validation;