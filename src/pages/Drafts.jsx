import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  deleteDraft,
  updatePost,
} from "../redux/slices/postSlice";

import { setPlatform } from "../redux/slices/platformSlice";
import { selectDrafts } from "../redux/selectors/postSelectors";

function Drafts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const drafts = useSelector(selectDrafts);

  const handleDelete = (id) => {
    dispatch(deleteDraft(id));
    toast.success("Draft Deleted");
  };

  const handleEdit = (draft) => {
    dispatch(
      updatePost({
        id: draft.id,
        platform: draft.platform,
        text: draft.text,
        image: draft.image,
        schedule: draft.schedule,
      })
    );

    dispatch(setPlatform(draft.platform));

    navigate("/create-post");
    toast.success("Draft Loaded");
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1>Drafts</h1>

      <p className="subtitle">
        Manage all saved drafts
      </p>

      {drafts.length === 0 ? (
        <div
          className="glass"
          style={{
            marginTop: "30px",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <h2>No Drafts Found</h2>

          <p style={{ color: "#94a3b8" }}>
            Save a draft from Composer to see it here.
          </p>
        </div>
      ) : (
        drafts.map((draft) => (
          <motion.div
            key={draft.id}
            className="glass"
            whileHover={{ scale: 1.01 }}
            style={{
              padding: "25px",
              marginTop: "20px",
            }}
          >
            <h2>{draft.platform}</h2>

            <p
              style={{
                marginTop: "12px",
                color: "#94a3b8",
              }}
            >
              {draft.text}
            </p>

            {draft.image && (
              <img
                src={draft.image}
                alt="Draft"
                style={{
                  width: "100%",
                  borderRadius: "18px",
                  marginTop: "20px",
                  maxHeight: "280px",
                  objectFit: "cover",
                }}
              />
            )}

            <p
              style={{
                marginTop: "15px",
                color: "#94a3b8",
              }}
            >
              Created: {draft.createdAt}
            </p>

            {draft.schedule && (
              <p
                style={{
                  color: "#22c55e",
                  marginTop: "8px",
                }}
              >
                Scheduled: {new Date(draft.schedule).toLocaleString()}
              </p>
            )}

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              <button
                className="publishBtn"
                onClick={() => handleEdit(draft)}
              >
                <FiEdit2 />
                Edit
              </button>

              <button
                className="publishBtn"
                onClick={() => handleDelete(draft.id)}
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}

export default Drafts;