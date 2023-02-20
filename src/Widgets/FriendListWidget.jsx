import React from 'react'
import { Box, Divider, Typography, useTheme } from "@mui/material";
import WidgetWrapper from '../Components/WidgetWrapper';
import FridListFriend from "./FridListFriend";
import { useSelector } from "react-redux";
export default function FriendListWidget() {
  const { palette } = useTheme();
  const { posts, status } = useSelector((state) => state.postsoffollowing);
  const { user, status: allusersStatus } = useSelector((state) => state.getallusers);
  const { friend } = useSelector((state) => state.getlikes);
  return (status === "loading" ? (<h1>Loading ....</h1>) : (
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
        {posts && posts.map((friend) => (
          <FridListFriend
            key={friend.owner._id}
            friendId={friend.owner._id}
            name={friend.owner.name}
            subtitle={"Teacher"}
          userAvatar={friend.owner.avatar.url}
          />
        ))}
      </Box>

      <Divider sx={{ marginBottom: "1rem", marginTop: "1rem", background: "gray" }} />

      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Recomended User to Follow
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {user && user.map((friend) => (
          <FridListFriend
            key={friend._id}
            friendId={friend._id}
            name={friend.name}
            subtitle={"Teacher"}
          userAvatar={friend.avatar.url}
          />
        ))}
      </Box>
    </WidgetWrapper>)
  )
}
