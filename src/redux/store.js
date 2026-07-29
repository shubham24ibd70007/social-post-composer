import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./slices/postSlice";
import platformReducer from "./slices/platformSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    platform: platformReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});

export default store;