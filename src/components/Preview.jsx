import { motion } from "framer-motion";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiBookmark
} from "react-icons/fi";

import "../styles/preview.css";

function Preview({ platform, text, image }) {
  return (
    <motion.div
      className="preview glass"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2>Live Preview</h2>

      <div className="phone">

        <div className="phoneHeader">

          <div className="avatar"></div>

          <div>

            <h4>your_username</h4>

            <small>{platform}</small>

          </div>

        </div>

        <p className="previewText">
          {text || "Start typing to preview your post..."}
        </p>

        {image && (
          <img
            src={image}
            className="postImage"
            alt=""
          />
        )}

        <div className="postActions">

          <FiHeart />

          <FiMessageCircle />

          <FiSend />

          <FiBookmark
            style={{ marginLeft: "auto" }}
          />

        </div>

      </div>
    </motion.div>
  );
}

export default Preview;