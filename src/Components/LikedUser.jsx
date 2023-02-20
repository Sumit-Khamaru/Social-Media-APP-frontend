import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Avatar, IconButton, Typography } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useSelector, useDispatch } from 'react-redux';
import { getPostOfFollowing } from '../store/PostOfFollowingSlice';
import { deletePostComment } from '../store/UserLike';
export default function LikedUser({
  commentId,
  ownerImage,
  commentCaption,
  createdAt,
  ownerName,
  userId,
  ownerId,
  pId
}) {
  const {user} = useSelector((state) => state.user);
  console.log(ownerName);
  const isMyComment = user && user._id === ownerId;
  const dispatch = useDispatch();
  const handleDeleteComment = () => {
    dispatch(deletePostComment({pId, commentId}));
    dispatch(getPostOfFollowing());
  }
  return (
    <Card sx={{ maxWidth: 345, marginBottom: "1rem" }}>
      <CardHeader
        avatar={
          <Avatar sx={{}} aria-label="recipe" src={ownerImage} />
        }
        action={
          isMyComment ? (
          <IconButton aria-label="settings" onClick={handleDeleteComment}>
            <DeleteOutlineRoundedIcon  />
          </IconButton>) : null
        }
        ownerName={ownerName}
        title={
            <Typography variant="h6">
              {ownerName}
            </Typography>
          }
        titleTypographyProps={{ sx: { fontSize: '18px' } }}
        subheader={createdAt}
      />
    </Card>
  )
}
