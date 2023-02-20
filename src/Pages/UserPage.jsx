import React, { useEffect, useState } from 'react'
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import FriendListWidget from '../Widgets/FriendListWidget';
import MyPostWidget from "../Widgets/MyPostWidget";
import UserWidget from "../Widgets/UserWidget";
import AdvertWidget from '../Widgets/AdvertWidget';
import MyPostsWidget from '../Widgets/MyPostsWidget';
import PostWidget from '../Widgets/PostWidget';
import WidgetWrapper from '../Components/WidgetWrapper';
import FlexBetween from '../Components/FlexBetween';
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {  Divider, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import UserImage from '../Components/UserImage';
import Friend from '../Components/Friend';
export default function ProfilePage() {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const {status, posts} = useSelector((state) => state.userposts);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (status === "loading" ? (<h1>Loading......</h1>) : (
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
          
        <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      // onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage userImg={posts.user.avatar.url}/>
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {posts.user.name}
            </Typography>
            <Box> 
            <Typography color={medium} >{posts.user.followers.length} followers</Typography>
            <Typography color={medium}>{posts.user.following.length} following</Typography>
            </Box>
             
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Kolkata</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>Poet</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            5674
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            4567
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
              stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>
            </svg>
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-linkedin" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M8 11l0 5"></path>
              <path d="M8 8l0 .01"></path>
              <path d="M12 16l0 -5"></path>
              <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
            </svg>
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>





          <Box m="2rem 0" />

          <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friends List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {posts.user.followers.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={friend.name}
            subtitle={"Teacher"}
            userAvatar={friend.avatar.url}
          />
        ))}
      </Box>
      </WidgetWrapper>
         
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget /> */}
          <Box m="2rem 0" />
          
          <>
            {posts.user.post && posts.user.post.length > 0
                ? posts.user.post.map((post) => (
                    <PostWidget
                        key={post._id}
                        postId={post._id}
                        postCaption={post.caption}
                        postImage={post.image.url}
                        likes={post.likes}
                        comments={post.comments}
                        ownerImage={posts.user.avatar.url}
                        ownerName={posts.user.name}
                        owner={post.owner}
                        ownerId={posts.user._id}
                        createdAt={post.createdAt}
                    />
                ))
                : (<Typography variant='h5'>NO POSTS YET</Typography>)}
        </>        




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
    )
}
