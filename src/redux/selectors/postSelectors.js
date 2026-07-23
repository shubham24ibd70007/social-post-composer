import { createSelector } from "@reduxjs/toolkit";
import { draftsSelectors } from "../slices/postSlice";

// Basic Selectors
export const selectDrafts = draftsSelectors.selectAll;

export const selectPublishedPosts = (state) =>
  state.posts.publishedPosts;

export const selectCurrentPost = (state) =>
  state.posts.currentPost;

export const selectCurrentPlatform = (state) =>
  state.platform.currentPlatform;

// Memoized Selectors
export const selectScheduledPosts = createSelector(
  [selectDrafts],
  (drafts) =>
    drafts.filter(
      (draft) => draft.schedule && draft.schedule !== ""
    )
);

export const selectDraftCount = createSelector(
  [selectDrafts],
  (drafts) => drafts.length
);

export const selectPublishedCount = createSelector(
  [selectPublishedPosts],
  (posts) => posts.length
);

export const selectTotalPosts = createSelector(
  [selectDraftCount, selectPublishedCount],
  (drafts, published) => drafts + published
);

export const selectRecentDrafts = createSelector(
  [selectDrafts],
  (drafts) => drafts.slice(0, 5)
);