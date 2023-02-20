import React from 'react'
import PostWidget from './PostWidget'
import { useDispatch, useSelector } from "react-redux";

import { Typography } from '@mui/material';
export default function MyPostsWidget({}) {
    const {posts, status} = useSelector((state) => state.mypost);
  return (status === "loading" ? (<h1>Loading ......</h1>) : (
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
                        owner={post.owner}
                        ownerId={post.owner._id}
                        createdAt={post.createdAt}
                    />
                ))
                : (<Typography variant='h5'>NO POSTS YET</Typography>)}
        </>        
  )
  )
}
