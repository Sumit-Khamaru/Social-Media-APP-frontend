import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { STATUES } from "./userSlice";
import { getAllPosts } from '../utils/path';
import {host } from '../utils/path';
const getAllThePosts = createSlice({
    name: "allposts",
    initialState: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPostsData.pending, (state, action) => {
                state.status = STATUES.LOADING;
            })
            .addCase(getAllPostsData.fulfilled, (state, action) => {
                state.status = STATUES.IDEL;
                state.posts = action.payload;
            })
            .addCase(getAllPostsData.rejected, (state, action) => {
                state.status = STATUES.ERROR;
                state.error = action.payload;
            })

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




export default getAllThePosts.reducer;



export const getAllPostsData = createAsyncThunk("allPosts/get", async () => {
    try {
        const response = await fetch(getAllPosts, {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.log(error);
    }
});


export const getUserPosts = createAsyncThunk("userposts/get", async ({ownerId}) => {
    try {
        console.log(ownerId);
        const response = await fetch(`${host}/api/v1/user/${ownerId}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        return data.posts;
        
    } catch (error) {
        console.log(error);
    }
}); 