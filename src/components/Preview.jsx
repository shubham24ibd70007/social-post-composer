import React, { memo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
} from "react-icons/fi";

import { selectCurrentPost } from "../redux/selectors/postSelectors";

import "../styles/preview.css";

function Preview() {
  const currentPost = useSelector(selectCurrentPost);

  return (
    <motion.div
      className="preview glass"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Live Preview</h2>

      <div className="phone">
        <div className="phoneHeader">
          <div className="avatar"></div>

          <div>
            <h4>Username</h4>
            <span>{currentPost.platform}</span>
          </div>
        </div>

        <div className="phoneBody">
          {currentPost.text ? (
            <p>{currentPost.text}</p>
          ) : (
            <p className="placeholder">
              Start typing to preview your post...
            </p>
          )}

          {currentPost.image && (
            <img
              src={currentPost.image}
              alt="Preview"
            />
          )}
        </div>

        <div className="phoneFooter">
          <FiHeart />
          <FiMessageCircle />
          <FiSend />
        </div>
      </div>
    </motion.div>
  );
}

export default memo(Preview);