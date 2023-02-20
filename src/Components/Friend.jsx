import React, { useEffect, useState } from 'react'
import { MoreVert, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from './FlexBetween';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import UserImage from './UserImage';
import { getAllMyPosts } from '../store/MyPostSlice';
import { getUserPosts } from '../store/GetUserProfile';
import { deletePostData, followUnfollowUser, updatePostCaption } from '../store/UserLike';
import { getPostOfFollowing } from '../store/PostOfFollowingSlice';
import { loadUserData } from '../store/userSlice';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function Friend({ name, subtitle, userAvatar, friendId, isMyProfile, caption, id }) {
  const { palette } = useTheme();
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  // const [isMyProfile, setIsMyProfile] = useState(false);
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
  const [updatePostCaptions, setUpdatePostCaptions] = useState(caption);
  const patchFriend = async () => {
    setIsFriend(!isFriend);
    await dispatch(followUnfollowUser({ friendId }));
    dispatch(getPostOfFollowing());
    dispatch(loadUserData());
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dialogopen, setDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClickClose = () => {
    setDialogOpen(false);
  };

  const  updateCaption =  async () =>  {
    const postData = {updatePostCaptions, id};
    handleClickClose();
    await dispatch(updatePostCaption(postData));
    dispatch(getAllMyPosts());
  }

  const deletePost = async() => {
    handleClose();
    await dispatch(deletePostData(id));
    dispatch(getAllMyPosts());
  }
  return (
    <>
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
      <Box>
        {isMyProfile ? (
          <>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <MoreVert />
          </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {handleClose(); handleClickOpen();}}>Update Caption</MenuItem>
        <MenuItem onClick={deletePost}>Delete Post</MenuItem>
      </Menu>
          </>

        ) : null}
      </Box>
    </FlexBetween>
    <div>
    <Dialog open={dialogopen} onClose={handleClickClose}>
      <DialogTitle>Update Caption</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To update the caption, please enter some caption  here. That
          will  updates caption.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Update Caption"
          type="text"
          fullWidth
          variant="standard"
          value={updatePostCaptions}
          onChange={(e)=> setUpdatePostCaptions(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose}>Cancel</Button>
        <Button onClick={updateCaption}>Update Caption</Button>
      </DialogActions>
    </Dialog>
  </div>
  </>
  )
}
