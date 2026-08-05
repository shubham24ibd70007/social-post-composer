import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { supabase } from "../../utils/supabase";


// ========================================
// ENTITY ADAPTER
// ========================================

const draftsAdapter = createEntityAdapter({
  selectId: (draft) => draft.id,
  sortComparer: (a, b) => b.id - a.id,
});


// ========================================
// FETCH POSTS FROM SUPABASE
// ========================================

export const fetchDraftsAsync = createAsyncThunk(
  "posts/fetchDraftsAsync",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "draft")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return rejectWithValue(error.message);
    }

    return data.map((post) => ({
      id: post.id,
      platform: post.platform,
      text: post.content || "",
      image: post.image_url || "",
      schedule: post.schedule || "",
      createdAt: post.created_at,
    }));
  }
);


// ========================================
// SAVE DRAFT TO SUPABASE
// ========================================

export const saveDraftAsync = createAsyncThunk(
  "posts/saveDraftAsync",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();

    const post = state.posts.currentPost;

    const { data, error } = await supabase
      .from("posts")
      .insert({
        platform: post.platform,
        content: post.text,
        image_url: post.image || null,
        schedule: post.schedule || null,
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      return rejectWithValue(error.message);
    }

    return {
      id: data.id,
      platform: data.platform,
      text: data.content || "",
      image: data.image_url || "",
      schedule: data.schedule || "",
      createdAt: data.created_at,
    };
  }
);


// ========================================
// INITIAL STATE
// ========================================

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


// ========================================
// SLICE
// ========================================

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


  // ========================================
  // ASYNC REDUCERS
  // ========================================

  extraReducers: (builder) => {
    builder

      // FETCH DRAFTS

      .addCase(fetchDraftsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchDraftsAsync.fulfilled,
        (state, action) => {
          state.loading = false;

          draftsAdapter.setAll(
            state,
            action.payload
          );
        }
      )

      .addCase(
        fetchDraftsAsync.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch drafts.";
        }
      )


      // SAVE DRAFT

      .addCase(saveDraftAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        saveDraftAsync.fulfilled,
        (state, action) => {
          state.loading = false;

          draftsAdapter.addOne(
            state,
            action.payload
          );

          state.currentPost = {
            id: null,
            platform: "Instagram",
            text: "",
            image: "",
            schedule: "",
          };
        }
      )

      .addCase(
        saveDraftAsync.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Failed to save draft.";
        }
      );
  },
});


// ========================================
// SELECTORS
// ========================================

export const draftsSelectors =
  draftsAdapter.getSelectors(
    (state) => state.posts
  );


// ========================================
// ACTIONS
// ========================================

export const {
  updatePost,
  clearPost,
  deleteDraft,
  updateDraft,
  publishPost,
} = postSlice.actions;


export default postSlice.reducer;