import { createSelector } from "@reduxjs/toolkit";

import {
  selectDrafts,
  selectPublishedPosts,
  selectCurrentPost,
  selectCurrentPlatform,
} from "./postSelectors";

export const selectDashboardStats = createSelector(
  [
    selectDrafts,
    selectPublishedPosts,
    selectCurrentPost,
    selectCurrentPlatform,
  ],

  (
    drafts,
    publishedPosts,
    currentPost,
    currentPlatform
  ) => ({
    draftCount: drafts.length,

    publishedCount: publishedPosts.length,

    scheduledCount: drafts.filter(
      (draft) => draft.schedule && draft.schedule !== ""
    ).length,

    currentPlatform,

    currentPost,

    recentDrafts: drafts.slice(0, 5),
  })
);