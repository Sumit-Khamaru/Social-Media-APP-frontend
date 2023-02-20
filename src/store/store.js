import { configureStore } from "@reduxjs/toolkit";
import postOfFollowingReducer from "./PostOfFollowingSlice";
import getAllUserReducer from './GetAllUsersSlice';
import getLikesReducer from './UserLike';
import putCommentReducer from './UserCommentSlice';
import userReducer from "./userSlice";
import myPostreducer from './MyPostSlice';
import allPostsData from "./GetAllPosts";
import userProfile from "./GetUserProfile";
import searchUser from "./SearchUser";
const store = configureStore({
  reducer: {
    user: userReducer,
    postsoffollowing: postOfFollowingReducer,
    getallusers : getAllUserReducer,
    getlikes: getLikesReducer,
    putcomment: putCommentReducer,
    mypost: myPostreducer,
    allPosts: allPostsData,
    userposts:userProfile,
    searchResult: searchUser,
  },
});

export default store;
