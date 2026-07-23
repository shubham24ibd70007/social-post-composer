import { createSelector } from "@reduxjs/toolkit";
import {
  selectDrafts,
  selectPublishedPosts,
} from "./postSelectors";

export const selectAllPosts = createSelector(
  [selectDrafts, selectPublishedPosts],
  (drafts, published) => [...drafts, ...published]
);

export const selectInstagramPosts = createSelector(
  [selectAllPosts],
  (posts) =>
    posts.filter(
      (post) => post.platform === "Instagram"
    ).length
);

export const selectFacebookPosts = createSelector(
  [selectAllPosts],
  (posts) =>
    posts.filter(
      (post) => post.platform === "Facebook"
    ).length
);

export const selectLinkedInPosts = createSelector(
  [selectAllPosts],
  (posts) =>
    posts.filter(
      (post) => post.platform === "LinkedIn"
    ).length
);

export const selectXPosts = createSelector(
  [selectAllPosts],
  (posts) =>
    posts.filter(
      (post) => post.platform === "X"
    ).length
);

export const selectPublishRate = createSelector(
  [selectDrafts, selectPublishedPosts],
  (drafts, published) => {
    const total = drafts.length + published.length;

    if (total === 0) return 0;

    return ((published.length / total) * 100).toFixed(1);
  }
);