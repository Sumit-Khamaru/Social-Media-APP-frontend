import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { STATUES } from "./userSlice";
import {getAllFollowingPost} from '../utils/path';
const postOfFollowingSlice = createSlice({
  name: "postOfFollowing",
  initialState: {},
  reducers: {
    clearMessages: (state) => {
      state.usercomment = null;
    },
    clearErrors: (state)=> {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(getPostOfFollowing.pending, (state, action) => {
            state.status = STATUES.LOADING;
        })
        .addCase(getPostOfFollowing.fulfilled, (state, action) => {
            state.status = STATUES.IDEL;
            state.posts = action.payload;
        })
        .addCase(getPostOfFollowing.rejected, (state, action) => {
            state.status = STATUES.ERROR;
            state.error = action.payload;
        })
  },
});

export default postOfFollowingSlice.reducer;
export const clearPostErrors = createAction('mypost/clearErrors');

export const getPostOfFollowing = createAsyncThunk(
  "post/following/get",
  async () => {
    try {

        const response = await fetch(getAllFollowingPost, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        return data.posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
