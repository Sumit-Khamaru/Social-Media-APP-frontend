import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUES } from "./userSlice";
import {getMyPosts} from '../utils/path';
const myPostSlice = createSlice({
    name: 'mypost',
    initialState:{},
    extraReducers: (builder) => {
        builder
        .addCase(getAllMyPosts.pending, (state, action) => {
            state.status = STATUES.LOADING;
        })
        .addCase(getAllMyPosts.fulfilled, (state, action) => {
            state.status = STATUES.IDEL;
            state.posts = action.payload;
        })
        .addCase(getAllMyPosts.rejected, (state, action) => {
            state.status = STATUES.ERROR;
            state.error = action.payload;
        })
    }
})

export default myPostSlice.reducer;



export const getAllMyPosts = createAsyncThunk("myposts/get", async() => {
    try {
        const response = await fetch(getMyPosts, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.log(error);
    }
});