import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FiImage,
  FiCalendar,
  FiSmile,
  FiPaperclip,
  FiSend,
  FiSave,
} from "react-icons/fi";
import toast from "react-hot-toast";

import {
  updatePost,
  saveDraftAsync,
  publishPost,
  updateDraft,
  clearPost,
} from "../redux/slices/postSlice";

import { setPlatform } from "../redux/slices/platformSlice";

import "../styles/composer.css";

function Composer() {
  const dispatch = useDispatch();

  const currentPost = useSelector(
    (state) => state.posts.currentPost
  );

  const loading = useSelector(
    (state) => state.posts.loading
  );

  const limits = useSelector(
    (state) => state.platform.limits
  );

  const platform = useSelector(
    (state) => state.platform.currentPlatform
  );

  const fileRef = useRef();

  // Memoized Values
  const remaining = useMemo(() => {
    return limits[platform] - currentPost.text.length;
  }, [limits, platform, currentPost.text]);

  const progress = useMemo(() => {
    return (
      (currentPost.text.length / limits[platform]) * 100
    );
  }, [limits, platform, currentPost.text]);

  const platforms = useMemo(
    () => [
      "Instagram",
      "X",
      "LinkedIn",
      "Facebook",
    ],
    []
  );

  function uploadImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    dispatch(
      updatePost({
        image: URL.createObjectURL(file),
      })
    );

    toast.success("Image Uploaded");
  }

  function handleText(e) {
    dispatch(
      updatePost({
        text: e.target.value,
      })
    );
  }

  function changePlatform(item) {
    dispatch(setPlatform(item));

    dispatch(
      updatePost({
        platform: item,
      })
    );
  }

  async function draft() {
    if (
      !currentPost.text.trim() &&
      !currentPost.image
    ) {
      toast.error("Nothing to save!");
      return;
    }

    try {
      if (currentPost.id) {
        dispatch(
          updateDraft({
            id: currentPost.id,
            changes: {
              platform,
              text: currentPost.text,
              image: currentPost.image,
              schedule: currentPost.schedule,
              createdAt: new Date().toLocaleString(),
            },
          })
        );

        dispatch(clearPost());

        toast.success("Draft Updated Successfully!");
      } else {
        await dispatch(saveDraftAsync()).unwrap();

        dispatch(clearPost());

        toast.success("Draft Saved Successfully!");
      }
    } catch {
      toast.error("Failed to Save Draft");
    }
  }

  function publish() {
    if (
      !currentPost.text.trim() &&
      !currentPost.image
    ) {
      toast.error("Write something first!");
      return;
    }

    dispatch(publishPost());

    toast.success("Post Published 🚀");
  }

  return (
    <motion.div
      className="composer glass"
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>
        {currentPost.id
          ? "Edit Draft"
          : "Create Post"}
      </h1>

      <p className="subtitle">
        Create once • Publish everywhere
      </p>

      <div className="platformContainer">
        {platforms.map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changePlatform(item)}
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
        value={currentPost.text}
        placeholder="Share something amazing today..."
        onChange={handleText}
      />

      <div className="toolbar">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileRef.current.click()}
        >
          <FiImage />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiSmile />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPaperclip />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiCalendar />
        </motion.button>

        <div className="counter">
          {remaining}
        </div>
      </div>

      {/* Optional Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "6px",
          background: "#2b2b2b",
          borderRadius: "10px",
          marginTop: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(progress, 100)}%`,
            height: "100%",
            background: "#22c55e",
            transition: "0.3s",
          }}
        />
      </div>

      <input
        ref={fileRef}
        hidden
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />

      {currentPost.image && (
        <div className="previewImage">
          <img
            src={currentPost.image}
            alt="Preview"
          />
        </div>
      )}

      <input
        className="schedule"
        type="datetime-local"
        value={currentPost.schedule}
        onChange={(e) =>
          dispatch(
            updatePost({
              schedule: e.target.value,
            })
          )
        }
      />

      <div className="buttonRow">
        <motion.button
          className="draftBtn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={draft}
          disabled={loading}
        >
          <FiSave />
          {loading
            ? "Saving..."
            : currentPost.id
            ? "Update Draft"
            : "Save Draft"}
        </motion.button>

        <motion.button
          className="publishBtn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
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