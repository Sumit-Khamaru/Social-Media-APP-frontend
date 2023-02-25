import React, { useEffect } from "react";
import { getPostOfFollowing } from "../store/PostOfFollowingSlice";
import { getAllUsersData } from "../store/GetAllUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearLikesMessage, clearErrorMessage } from "../store/UserLike";
import { clearCommentMessage, clearCommentsError } from "../store/UserCommentSlice";
import { Box } from "@mui/system";
import Navbar from "../Components/Navbar";
import { useMediaQuery } from "@mui/material";
import UserWidget from "../Widgets/UserWidget";
import MyPostWidget from "../Widgets/MyPostWidget";
import PostsWidget from "../Widgets/PostsWidget";
import AdvertWidget from "../Widgets/AdvertWidget";
import FriendListWidget from "../Widgets/FriendListWidget";
import { getAllMyPosts } from "../store/MyPostSlice";
import LoadingPage from "./LoadingPage";

export default function MainPage() {
  const dispatch = useDispatch();
  // SUBSCRIBE TO GET THE POSTS OF THE USERS THAT CURRENT USER FOLLOWING
  const { status, posts, error } = useSelector((state) => state.postsoffollowing);
  const { usercomment, error: commentError } = useSelector((state) => state.putcomment);
  const { isAuth, user, status: userStatus } = useSelector((state) => state.user);
  // TO DISPATCH THE STATES
  useEffect(() => {
    dispatch(getPostOfFollowing());
    dispatch(getAllMyPosts());
    dispatch(getAllUsersData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersData());
  }, []);

  const { likesmessage, error: likeError } = useSelector((state) => state.getlikes);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return status === "loading" ? (
    <LoadingPage/>
  ) : (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId= {user._id}
            userName={user.name}
            followers={user.followers}
            following={user.following}
            userImage={user.avatar.url}
          />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* Create My Posts */}
          <MyPostWidget />
          <PostsWidget  />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget  />
          </Box>
        )}
      </Box>
    </Box>
  );
}
