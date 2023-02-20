import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { STATUES } from "./userSlice";
import { host, newPost, updateProfile, updatePassword } from "../utils/path";
const getUserLikesSlice = createSlice({
  name: "likesmessage",
  initialState: {
    friend: false
  },
  reducers: {
    clearMessages: (state) => {
      state.likesmessage = null;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    isFriend: (state) => {
      state.friend = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostLikeData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(getPostLikeData.fulfilled, (state, action) => {
        state.likesmessage = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(getPostLikeData.rejected, (state, action) => {
        state.status = STATUES.ERROR;
        state.error = action.payload;
      })

      .addCase(deletePostComment.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        state.likesmessage = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(deletePostComment.rejected, (state, action) => {
        state.status = STATUES.ERROR;
        state.error = action.payload;
      })



      .addCase(createNewPostData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(createNewPostData.fulfilled, (state, action) => {
        state.likesmessage = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(createNewPostData.rejected, (state, action) => {
        state.status = STATUES.ERROR;
        state.error = action.payload;
      })

      .addCase(updatePostCaption.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(updatePostCaption.fulfilled, (state, action) => {
        state.likesmessage = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(updatePostCaption.rejected, (state, action) => {
        state.status = STATUES.ERROR;
        state.error = action.payload;
      })

      .addCase(deletePostData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(deletePostData.fulfilled, (state, action) => {
        state.likesmessage = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(deletePostData.rejected, (state, action) => {
        state.status = STATUES.ERROR;
        state.error = action.payload;
      })

      .addCase(updateUserProfileData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(updateUserProfileData.fulfilled, (state, action) => {
        state.likesmessage = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(updateUserProfileData.rejected, (state, action) => {
        state.status = STATUES.ERROR;
        state.error = action.payload;
      })


      .addCase(updateUserPasswordData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(updateUserPasswordData.fulfilled, (state, action) => {
        state.likesmessage = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(updateUserPasswordData.rejected, (state, action) => {
        state.status = STATUES.ERROR;
        state.error = action.payload;
      })

      .addCase(followUnfollowUser.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(followUnfollowUser.fulfilled, (state, action) => {
        state.likesmessage = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(followUnfollowUser.rejected, (state, action) => {
        state.status = STATUES.ERROR;
        state.error = action.payload;
      })
  },
});

export default getUserLikesSlice.reducer;

export const clearLikesMessage = createAction("likesmessage/clearMessages");
export const clearErrorMessage = createAction("likesmessage/clearErrors");
export const friendMessage = createAction("likesmessage/isFriend");

export const getPostLikeData = createAsyncThunk("post/like", async (postId) => {
  try {
    const response = await fetch(`${host}/api/v1/post/${postId}`, {
      method: "PATCH",
      credentials: "include",
    });

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.log(error);
  }
});

export const deletePostComment = createAsyncThunk(
  "post/comment/delete",
  async ({pId, commentId}) => {
    try {
      const response = await fetch(`${host}/api/v1/post/comment/${pId}`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({commentId}),
        headers: {
          withCredentials: true,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }
);


export const createNewPostData = createAsyncThunk("post/create/create-post", async(postData) => {
    try {
      const {image, caption} = postData;
      console.log(postData);
      const response = await fetch(newPost, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({image, caption}),
        headers: {
          withCredentials: true,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.log(error);
    }
});

export const updatePostCaption = createAsyncThunk("put/post-caption/update", async(postData) => {
    try {
      const {updatePostCaptions: caption, id: postId} = postData;
      // const caption = {captionValue};
      console.log(caption);
      const response = await fetch(`${host}/api/v1/post/${postId}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({caption}),
        headers: {
          withCredentials: true,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      return data.message;
    } catch (error) {
      console.log(error);
    }
});


export const deletePostData = createAsyncThunk("delete/post", async(id) => {
    try {

      const response = await fetch(`${host}/api/v1/post/${id}`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({id}),
      });
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.log(error);
    }
});



export const updateUserProfileData = createAsyncThunk("put/update/profile", async({name, email, avatar}) => {
    try {
      const response = await fetch(updateProfile, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({name, email, avatar}),
        headers: {
          withCredentials: true,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.log(error.message);
    }
});



export const updateUserPasswordData = createAsyncThunk("post/update/password", async({oldPassword, newPassword}) => {
    try {
      
      const response = await fetch(updatePassword, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({oldPassword, newPassword}),
        headers: {
          withCredentials: true,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.message;
        
    } catch (error) {
      console.log(error)
    }
});



export const followUnfollowUser = createAsyncThunk("get/followUnfollow", async({friendId}) => {
  try {
    
    const response = await fetch(`${host}/api/v1/follow/${friendId}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data.message;
      
  } catch (error) {
    console.log(error)
  }
});