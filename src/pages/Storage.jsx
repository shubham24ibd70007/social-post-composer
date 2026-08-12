import { motion } from "framer-motion";
import { FiArrowLeft, FiImage, FiFileText, FiPaperclip, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

import "../styles/storage.css";

const storageGroups = [
  { label: "Media assets", size: "1.48 GB", percent: 14.8, color: "#8d8eff", icon: FiImage },
  { label: "Post content", size: "624 MB", percent: 6.24, color: "#55d6be", icon: FiFileText },
  { label: "Attachments", size: "221 MB", percent: 2.21, color: "#ffad66", icon: FiPaperclip },
  { label: "Workspace data", size: "133 MB", percent: 1.33, color: "#ee82ca", icon: FiSettings },
];

function Storage() {
  const usedPercent = storageGroups.reduce((total, group) => total + group.percent, 0);

  return (
    <motion.main
      className="storagePage glass"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Link to="/" className="storageBack"><FiArrowLeft /> Back to dashboard</Link>
      <h1>Workspace Storage</h1>
      <p className="subtitle">See how your workspace storage is being used.</p>

      <section className="storageSummary">
        <motion.div
          className="storageRing"
          style={{ "--used": `${usedPercent * 3.6}deg` }}
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 130, damping: 16 }}
        >
          <div className="storageRingCenter">
            <strong>2.4 GB</strong>
            <span>of 10 GB used</span>
          </div>
        </motion.div>

        <div className="storageSummaryText">
          <span className="storageAvailable">7.6 GB available</span>
          <h2>Plenty of room left</h2>
          <p>Your largest category is media assets. Storage totals update as content is added to your workspace.</p>
        </div>
      </section>

      <section className="storageBreakdown" aria-label="Storage breakdown">
        <h2>Storage breakdown</h2>
        {storageGroups.map(({ label, size, percent, color, icon: Icon }, index) => (
          <motion.article
            className="storageItem"
            key={label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 + index * 0.09 }}
          >
            <span className="storageItemIcon" style={{ color, backgroundColor: `${color}1f` }}><Icon /></span>
            <div className="storageItemDetails">
              <div><strong>{label}</strong><span>{size}</span></div>
              <div className="storageItemTrack"><motion.div style={{ backgroundColor: color }} initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ delay: 0.35 + index * 0.09, duration: 0.7 }} /></div>
            </div>
          </motion.article>
        ))}
      </section>
    </motion.main>
  );
}

export default Storage;
