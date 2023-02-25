import React, { useEffect, useState } from 'react'
import PostWidget from './PostWidget'
import { useDispatch, useSelector } from "react-redux";
import { getAllMyPosts } from '../store/MyPostSlice';
import { getPostOfFollowing } from '../store/PostOfFollowingSlice';
import { CloudDone } from '@mui/icons-material';
import { Typography } from '@mui/material';
export default function PostsWidget() {
    const dispatch = useDispatch();
    const {user } = useSelector((state) => state.user);
    const { status, posts, error } = useSelector((state) => state.postsoffollowing);
    const { posts: myposts, status: postStatus } = useSelector((state) => state.mypost);


   
    return (postStatus === 'loading' || status === 'loading' ? (<h1>Loading ......</h1>) : (
        <>
          {posts && posts.length > 0
            ? posts.map((post) => (
              <PostWidget
                key={post._id}
                postId={post._id}
                postCaption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                createdAt={post.createdAt}
                isProfile={false}
              />
            ))
            : null}
  
          {myposts && myposts.length > 0
            ? myposts.map((post) => (
              <PostWidget
                key={post._id}
                postId={post._id}
                postCaption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                createdAt={post.createdAt}
                isProfile={true}
              />
            ))
            : <Typography variant='h4' marginTop="2rem" color="#d7d7d7">You haven't posted anything yet, start sharing your moments with your followers!</Typography>}
        </>)
    )
}
