import React, { useEffect, useState } from 'react'
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, TextField, Typography, useTheme } from "@mui/material";
import FlexBetween from '../Components/FlexBetween';
import WidgetWrapper from '../Components/WidgetWrapper';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import UserImage from '../Components/UserImage';
import UserCard from '../Components/UserCard';
import { getPostLikeData } from '../store/UserLike';
import { getAllMyPosts } from '../store/MyPostSlice';
import PostOfFollowingSlice, { getPostOfFollowing } from '../store/PostOfFollowingSlice';
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsData, getUserPosts } from '../store/GetAllPosts';
import Friend from '../Components/Friend';
import { putAllUsersComment } from '../store/UserCommentSlice';
import moment from "moment";
import LikedUser from '../Components/LikedUser';
export default function PostWidget({
    postId,
    postCaption,
    postImage,
    likes=[],
    comments=[],
    ownerImage,
    ownerId,
    ownerName,
    createdAt,
    isProfile
}) {
    // console.log(comments);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const handleLike = async () => {
        setLiked(!liked);

        await dispatch(getPostLikeData(postId));
        dispatch(getAllPostsData());
        dispatch(getAllMyPosts());
        dispatch(getPostOfFollowing());
    };

    const [openLike, setOpenLike] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [postComment, setPostComment] = useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpenLike(true);
    };

    const handleCommentOpen = () => {
        setOpenComment(true);
    }

    const handleCommentClose = () => {
        setOpenComment(false);
    }
    const handleClose = () => {
        setOpenLike(false);
    };

    const handleSubmitComments = async () => {
        const comments = { postId, postComment }
        await dispatch(putAllUsersComment(comments));
        dispatch(getPostOfFollowing());
    }


    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true);
            }
        });
    }, [likes, user._id]);

    // console.log(likes);
    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                isMyProfile={isProfile}
                userId={ownerId}
                name={ownerName}
                subtitle= {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                userAvatar={ownerImage}
                caption={postCaption}
                id={postId}

            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {postCaption}
            </Typography>
            {postImage && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={postImage}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={handleLike}>
                            {liked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <IconButton onClick={handleClickOpen} >
                            <Typography>{likes.length}</Typography>
                        </IconButton>

                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        {/* Open a dialog box */}
                        <IconButton >
                            <ChatBubbleOutlineOutlined onClick={handleCommentOpen} />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            <Dialog
                fullScreen={fullScreen}
                open={openLike}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Typography variant='h3' mb="1rem"> Liked By</Typography>
                    <Divider color="#d7d7d7" />
                </DialogTitle>
                <DialogContent>
                {likes && likes.length > 0
                        ? likes.map((item) => (
                            <LikedUser 
                                key={item._id}
                                ownerImage={item.avatar.url}
                                ownerId={item._id}
                                ownerName={item.name}
                            />
                        ))
                        : (<Typography>No Comment Found Yet</Typography>)}
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                fullScreen={fullScreen}
                open={openComment}
                onClose={handleCommentClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Typography variant='h3' mb="1rem"> Comments</Typography>
                    <Divider color="#d7d7d7" />
                </DialogTitle>
                <FlexBetween>
                    <TextField
                        value={postComment}
                        onChange={(e) => setPostComment(e.target.value)}
                        id="outlined-basic" label="Comment"
                        variant="outlined"
                        autoFocus
                        fullWidth
                        sx={{ marginLeft: "1rem" }} />
                    <Button sx={{ marginRight: '.5rem' }} onClick={handleSubmitComments} >Submit</Button>
                </FlexBetween>
                <DialogContent>
                {comments && comments.length > 0
                        ? comments.map((item) => (
                            <UserCard 
                                key={item._id}
                                commentId={item._id}
                                commentCaption={item.comment}
                                ownerImage={item.user.avatar.url}
                                ownerId={item.user._id}
                                ownerName={item.user.name}
                                createdAt={moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                userId={user._id}
                                pId={postId}
                            />
                        ))
                        : (<Typography>No Comment Found Yet</Typography>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCommentClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </WidgetWrapper>
    )
}
