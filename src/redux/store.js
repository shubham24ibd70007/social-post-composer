import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./slices/postSlice";
import platformReducer from "./slices/platformSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
    reducer: {
        posts: postReducer,
        platform: platformReducer,
        ui: uiReducer,
    },
});

export default store;