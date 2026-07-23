import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import { selectCurrentPost } from "../redux/selectors/postSelectors";

import "../styles/validation.css";

function Validation() {
  const currentPost = useSelector(selectCurrentPost);

  const limits = useSelector(
    (state) => state.platform.limits
  );

  const platform = useSelector(
    (state) => state.platform.currentPlatform
  );

  const limit = useMemo(() => {
    return limits[platform];
  }, [limits, platform]);

  const used = useMemo(() => {
    return currentPost.text.length;
  }, [currentPost.text]);

  const remaining = useMemo(() => {
    return limit - used;
  }, [limit, used]);

  const percentage = useMemo(() => {
    return Math.min((used / limit) * 100, 100);
  }, [used, limit]);

  const valid = useMemo(() => {
    return remaining >= 0;
  }, [remaining]);

  return (
    <motion.div
      className="validation glass"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Validation</h2>

      <div className="progressBar">
        <div
          className="progressFill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="stats">
        <div>
          <h4>Platform</h4>
          <p>{platform}</p>
        </div>

        <div>
          <h4>Characters</h4>
          <p>{used}</p>
        </div>

        <div>
          <h4>Remaining</h4>
          <p>{remaining}</p>
        </div>
      </div>

      <div
        className={
          valid
            ? "status success"
            : "status error"
        }
      >
        {valid ? (
          <>
            <FiCheckCircle />
            Ready to Publish
          </>
        ) : (
          <>
            <FiAlertCircle />
            Character limit exceeded
          </>
        )}
      </div>
    </motion.div>
  );
}

export default memo(Validation);