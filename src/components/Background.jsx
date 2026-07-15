import { motion } from "framer-motion";
import "../styles/background.css";

function Background() {
  return (
    <div className="bg-wrapper">

      <motion.div
        className="blob blob1"
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="blob blob2"
        animate={{
          x: [0, -100, 0],
          y: [0, 120, 0],
          scale: [1, 1.25, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="blob blob3"
        animate={{
          x: [0, 80, 0],
          y: [0, 70, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

    </div>
  );
}

export default Background;