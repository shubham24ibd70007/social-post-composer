import React, { memo } from "react";
import { useSelector } from "react-redux";

import {
  selectInstagramPosts,
  selectFacebookPosts,
  selectLinkedInPosts,
  selectXPosts,
  selectPublishRate,
} from "../redux/selectors/analyticsSelectors";

function Analytics() {
  const instagram = useSelector(selectInstagramPosts);
  const facebook = useSelector(selectFacebookPosts);
  const linkedin = useSelector(selectLinkedInPosts);
  const x = useSelector(selectXPosts);
  const publishRate = useSelector(selectPublishRate);

  return (
    <div className="glass page">
      <h1>Analytics</h1>

      <div className="stats">

        <div className="card">
          <h3>Instagram</h3>
          <p>{instagram}</p>
        </div>

        <div className="card">
          <h3>Facebook</h3>
          <p>{facebook}</p>
        </div>

        <div className="card">
          <h3>LinkedIn</h3>
          <p>{linkedin}</p>
        </div>

        <div className="card">
          <h3>X</h3>
          <p>{x}</p>
        </div>

        <div className="card">
          <h3>Publish Rate</h3>
          <p>{publishRate}%</p>
        </div>

      </div>
    </div>
  );
}

export default memo(Analytics);