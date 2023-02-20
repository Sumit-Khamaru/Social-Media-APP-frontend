import React, { useEffect, useState } from 'react'
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import FriendListWidget from '../Widgets/FriendListWidget';
import MyPostWidget from "../Widgets/MyPostWidget";
import UserWidget from "../Widgets/UserWidget";
import AdvertWidget from '../Widgets/AdvertWidget';
import MyPostsWidget from '../Widgets/MyPostsWidget';
export default function ProfilePage() {
  const {user} = useSelector((state) => state.user);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-around"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
          userId={user._id}
          userName={user.name}
          followers={user.followers}
          following ={user.following}
          userImage={user.avatar.url}
          />
          <Box m="2rem 0" />
          <FriendListWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
          <Box m="2rem 0" />
          <MyPostsWidget  />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
          </Box>
        )}
      </Box>
    </Box>
    )
}
