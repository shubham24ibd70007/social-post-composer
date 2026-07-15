import { motion } from "framer-motion";
import { useRef } from "react";
import {
  FiImage,
  FiCalendar,
  FiSmile,
  FiPaperclip,
  FiSend,
  FiSave,
} from "react-icons/fi";

import toast from "react-hot-toast";

import "../styles/composer.css";

function Composer({
  platform,
  setPlatform,
  text,
  setText,
  image,
  setImage,
}) {
  const fileRef = useRef();

  const limits = {
    Instagram: 2200,
    X: 280,
    LinkedIn: 3000,
    Facebook: 63206,
  };

  const remaining = limits[platform] - text.length;

  const platforms = [
    "Instagram",
    "X",
    "LinkedIn",
    "Facebook",
  ];

  function uploadImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));

    toast.success("Image Uploaded");
  }

  function publish() {
    toast.success("Post Published 🚀");
  }

  function draft() {
    toast("Draft Saved");
  }

  return (
    <motion.div
      className="composer glass"
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Create Post</h1>

      <p className="subtitle">
        Create once • Publish everywhere
      </p>

      <div className="platformContainer">
        {platforms.map((item) => (
          <motion.div
            key={item}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setPlatform(item)}
            className={
              platform === item
                ? "platform activePlatform"
                : "platform"
            }
          >
            {item}
          </motion.div>
        ))}
      </div>

      <textarea
        value={text}
        placeholder="Share something amazing today..."
        onChange={(e) => setText(e.target.value)}
      />

      <div className="toolbar">

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: .95 }}
          onClick={() => fileRef.current.click()}
        >
          <FiImage />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: .95 }}
        >
          <FiSmile />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: .95 }}
        >
          <FiPaperclip />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: .95 }}
        >
          <FiCalendar />
        </motion.button>

        <div className="counter">
          {remaining}
        </div>

      </div>

      <input
        ref={fileRef}
        hidden
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />

      {image && (
        <div className="previewImage">
          <img src={image} alt="" />
        </div>
      )}

      <input
        className="schedule"
        type="datetime-local"
      />

      <div className="buttonRow">

        <motion.button
          className="draftBtn"
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: .95,
          }}
          onClick={draft}
        >
          <FiSave />

          Save Draft

        </motion.button>

        <motion.button
          className="publishBtn"
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: .95,
          }}
          onClick={publish}
        >
          <FiSend />

          Publish

        </motion.button>

      </div>

    </motion.div>
  );
}

export default Composer;