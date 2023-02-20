import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { STATUES } from "./userSlice";
import {host } from '../utils/path';
const getUserProfile = createSlice({
    name: "userprofile",
    initialState: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserPosts.pending, (state, action) => {
                state.status = STATUES.LOADING;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.status = STATUES.IDEL;
                state.posts = action.payload;
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.status = STATUES.ERROR;
                state.error = action.payload;
            })
      },
});




export default getUserProfile.reducer;


export const getUserPosts = createAsyncThunk("userposts/get", async ({friendId}) => {
    try {
        const response = await fetch(`${host}/api/v1/user/${friendId}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error);
    }
}); 