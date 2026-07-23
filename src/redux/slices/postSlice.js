import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const draftsAdapter = createEntityAdapter({
  selectId: (draft) => draft.id,
  sortComparer: (a, b) => b.id - a.id,
});

export const saveDraftAsync = createAsyncThunk(
  "posts/saveDraftAsync",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const post = state.posts.currentPost;

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    return {
      id: Date.now(),
      platform: post.platform,
      text: post.text,
      image: post.image,
      schedule: post.schedule,
      createdAt: new Date().toLocaleString(),
    };
  }
);

const initialState = draftsAdapter.getInitialState({
  currentPost: {
    id: null,
    platform: "Instagram",
    text: "",
    image: "",
    schedule: "",
  },

  publishedPosts: [],

  loading: false,

  error: null,
});

const postSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    updatePost(state, action) {
      state.currentPost = {
        ...state.currentPost,
        ...action.payload,
      };
    },

    clearPost(state) {
      state.currentPost = {
        id: null,
        platform: "Instagram",
        text: "",
        image: "",
        schedule: "",
      };
    },

    deleteDraft: draftsAdapter.removeOne,

    updateDraft: draftsAdapter.updateOne,

    publishPost(state) {
      state.publishedPosts.push({
        id: Date.now(),
        platform: state.currentPost.platform,
        text: state.currentPost.text,
        image: state.currentPost.image,
        schedule: state.currentPost.schedule,
        createdAt: new Date().toLocaleString(),
      });

      state.currentPost = {
        id: null,
        platform: "Instagram",
        text: "",
        image: "",
        schedule: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveDraftAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(saveDraftAsync.fulfilled, (state, action) => {
        state.loading = false;

        draftsAdapter.addOne(state, action.payload);

        state.currentPost = {
          id: null,
          platform: "Instagram",
          text: "",
          image: "",
          schedule: "",
        };
      })

      .addCase(saveDraftAsync.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to save draft.";
      });
  },
});

export const draftsSelectors =
  draftsAdapter.getSelectors(
    (state) => state.posts
  );

export const {
  updatePost,
  clearPost,
  deleteDraft,
  updateDraft,
  publishPost,
} = postSlice.actions;

export default postSlice.reducer;