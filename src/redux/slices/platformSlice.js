import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    currentPlatform: "Instagram",

    limits: {

        Instagram: 2200,

        X: 280,

        LinkedIn: 3000,

        Facebook: 63206,

    },

};

const platformSlice = createSlice({

    name: "platform",

    initialState,

    reducers: {

        setPlatform(state, action) {

            state.currentPlatform = action.payload;

        },

    },

});

export const {

    setPlatform,

} = platformSlice.actions;

export default platformSlice.reducer;