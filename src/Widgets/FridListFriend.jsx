import React, { useEffect, useState } from 'react'
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from '../Components/FlexBetween';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import UserImage from "../Components/UserImage";
import { getAllMyPosts } from '../store/MyPostSlice';
import { getUserPosts } from '../store/GetUserProfile';
import { followUnfollowUser, friendMessage } from '../store/UserLike';
import { getPostOfFollowing } from '../store/PostOfFollowingSlice';
import { loadUserData } from '../store/userSlice';
export default function Friend({ name, subtitle, userAvatar, friendId, isProfile }) {
  const { palette } = useTheme();
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  // const { friend } = useSelector((state) => state.getlikes);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const getMyPosts = () => {
      dispatch(getUserPosts({ friendId }));
      navigate(`/user/profile/${friendId}`);
  }
  const [isFriend, setIsFriend] = useState(false);
  const [Friend, setFriend] = useState(false);
  const patchFriend = async() => {
    await dispatch(followUnfollowUser({friendId}));
    if (user.following.some(friend => friend.id === friendId)) {
      // user is already a friend, do nothing
    } else {
      // user is not a friend, set friend state to true
      dispatch(friendMessage());
    }
   
    dispatch(getPostOfFollowing());
    dispatch(loadUserData());
  }
  useEffect(() => {
    if(user) {
      user.following.forEach(item => {
        if(item.id === friendId) {
          setIsFriend(true);
        }
      })
    }
  },[user, friendId]);  
 
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage size="55px" userImg={userAvatar} />
        <Box
        onClick={getMyPosts}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {isMyProfile ? (null) : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>

      )}

    </FlexBetween>
  )
}
