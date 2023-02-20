import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { STATUES } from "./userSlice";
import { host } from '../utils/path';
const getCommentSlice = createSlice({
    name: "usercomment",
    initialState:{},
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
        .addCase(putAllUsersComment.pending, (state, action) => {
            state.status = STATUES.LOADING;
          })
          .addCase(putAllUsersComment.fulfilled, (state, action) => {
            state.usercomment = action.payload;
            state.status = STATUES.IDEL;
          })
          .addCase(putAllUsersComment.rejected, (state, action) => {
            state.status = STATUES.ERROR;
            state.error = action.payload;
          })
      },
});




export default getCommentSlice.reducer;
export const  clearCommentMessage = createAction('usercomment/clearMessages');
export const  clearCommentsError = createAction('usercomment/clearErrors');



export const putAllUsersComment = createAsyncThunk("comment/put", async(comments) => {
    try {
        const {postId, postComment: comment} = comments;
        const response = await fetch(`${host}/api/v1/post/comment/${postId}`, {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({comment}),
          headers: {
            withCredentials: true,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
});