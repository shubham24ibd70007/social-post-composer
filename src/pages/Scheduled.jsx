import React, { memo } from "react";
import { useSelector } from "react-redux";

import { selectScheduledPosts } from "../redux/selectors/postSelectors";

function Scheduled() {

  const scheduledPosts = useSelector(selectScheduledPosts);

  return (
    <div className="glass page">

      <h1>Scheduled Posts</h1>

      {scheduledPosts.length === 0 ? (
        <p>No Scheduled Posts.</p>
      ) : (
        scheduledPosts.map((post) => (
          <div key={post.id} className="draft-card">

            <h3>{post.platform}</h3>

            <p>{post.text}</p>

            <small>{post.schedule}</small>

          </div>
        ))
      )}

    </div>
  );
}

export default memo(Scheduled);