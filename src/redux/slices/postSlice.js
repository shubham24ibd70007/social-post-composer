import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { postsApi } from "../../services/postsApi";

const draftsAdapter = createEntityAdapter({
  selectId: (draft) => draft.id,
  sortComparer: (a, b) => b.id - a.id,
});

const toDraft = (post) => ({
  id: post.id,
  platform: post.platform,
  text: post.content || "",
  image: "",
  schedule: post.scheduledTime || "",
  createdAt: post.createdAt || "",
});

const toApiPost = (post) => ({
  platform: post.platform,
  content: post.text,
  scheduledTime: post.schedule || null,
});

export const fetchDraftsAsync = createAsyncThunk(
  "posts/fetchDraftsAsync",
  async (_, { rejectWithValue }) => {
    try {
      return (await postsApi.getAll()).map(toDraft);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveDraftAsync = createAsyncThunk(
  "posts/saveDraftAsync",
  async (_, { getState, rejectWithValue }) => {
    try {
      const post = getState().posts.currentPost;
      return toDraft(await postsApi.create(toApiPost(post)));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDraftAsync = createAsyncThunk(
  "posts/updateDraftAsync",
  async ({ id, post }, { rejectWithValue }) => {
    try {
      return toDraft(await postsApi.update(id, toApiPost(post)));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDraftAsync = createAsyncThunk(
  "posts/deleteDraftAsync",
  async (id, { rejectWithValue }) => {
    try {
      await postsApi.remove(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const emptyPost = {
  id: null,
  platform: "Instagram",
  text: "",
  image: "",
  schedule: "",
};

const initialState = draftsAdapter.getInitialState({
  currentPost: emptyPost,
  publishedPosts: [],
  loading: false,
  error: null,
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePost(state, action) {
      state.currentPost = { ...state.currentPost, ...action.payload };
    },
    clearPost(state) {
      state.currentPost = { ...emptyPost };
    },
    publishPost(state) {
      state.publishedPosts.push({
        ...state.currentPost,
        id: Date.now(),
        createdAt: new Date().toLocaleString(),
      });
      state.currentPost = { ...emptyPost };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDraftsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDraftsAsync.fulfilled, (state, action) => {
        state.loading = false;
        draftsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchDraftsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load posts.";
      })
      .addCase(saveDraftAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDraftAsync.fulfilled, (state, action) => {
        state.loading = false;
        draftsAdapter.addOne(state, action.payload);
        state.currentPost = { ...emptyPost };
      })
      .addCase(updateDraftAsync.fulfilled, (state, action) => {
        state.loading = false;
        draftsAdapter.upsertOne(state, action.payload);
        state.currentPost = { ...emptyPost };
      })
      .addCase(deleteDraftAsync.fulfilled, (state, action) => {
        state.loading = false;
        draftsAdapter.removeOne(state, action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected") && action.type.startsWith("posts/"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Unable to save changes.";
        }
      );
  },
});

export const draftsSelectors = draftsAdapter.getSelectors((state) => state.posts);
export const { updatePost, clearPost, publishPost } = postSlice.actions;
export default postSlice.reducer;
