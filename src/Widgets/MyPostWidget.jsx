import React, { useState } from 'react'
import Dropzone from "react-dropzone";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import './MyPostWidget.css'
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from '../Components/FlexBetween';
import WidgetWrapper from '../Components/WidgetWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPostData } from '../store/UserLike';
import { getAllMyPosts } from '../store/MyPostSlice';
import { loadUserData } from '../store/userSlice';
import UserImage from '../Components/UserImage';

export default function MyPostWidget() {
  const {user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [uploadFileName, setUploadFileName] = useState("");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUploadFileName(file.name);
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = (e) => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    }
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    const postData = {caption, image};
    await dispatch(createNewPostData(postData));
    dispatch(getAllMyPosts());
    dispatch(loadUserData());
    setCaption("");
  };
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage userImg={user.avatar.url}  />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>


        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <input type="file" className='image_upload__file' accept="image/*" id="file" onChange={handleImageChange} />
          <label htmlFor="file" className='btn-1'>Upload File</label>
          <span>{uploadFileName}</span>
        </Box>


      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!caption}
          onClick={submitHandler}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}
