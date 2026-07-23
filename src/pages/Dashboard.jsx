import React, { memo } from "react";
import { useSelector } from "react-redux";
import { selectDashboardStats } from "../redux/selectors/dashboardSelectors";

function Dashboard() {
  const {
    draftCount,
    publishedCount,
    scheduledCount,
    currentPlatform,
    recentDrafts,
  } = useSelector(selectDashboardStats);

  return (
    <div className="glass page">
      <h1>Dashboard</h1>

      <div className="stats">
        <div className="card">
          <h3>Total Drafts</h3>
          <p>{draftCount}</p>
        </div>

        <div className="card">
          <h3>Published Posts</h3>
          <p>{publishedCount}</p>
        </div>

        <div className="card">
          <h3>Scheduled Posts</h3>
          <p>{scheduledCount}</p>
        </div>

        <div className="card">
          <h3>Current Platform</h3>
          <p>{currentPlatform}</p>
        </div>
      </div>

      <h2>Recent Drafts</h2>

      {recentDrafts.length === 0 ? (
        <p>No Drafts Found.</p>
      ) : (
        recentDrafts.map((draft) => (
          <div key={draft.id} className="draft-card">
            <strong>{draft.platform}</strong>

            <p>{draft.text}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default memo(Dashboard);