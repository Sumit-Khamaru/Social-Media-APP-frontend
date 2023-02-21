// export const host = 'http://localhost:4001';
export const host = 'https://socialpedia-backend-bsr4.onrender.com';

export const Login = `${host}/api/v1/login`;
export const Register = `${host}/api/v1/register`;
export const MyProfile = `${host}/api/v1/me`;
export const getAllFollowingPost = `${host}/api/v1/posts`;
export const getAllUser = `${host}/api/v1/users`;
export const getLike =(postId) => `${host}/api/v1/post/${postId}`;
export const putComment =(postId) => `${host}/api/v1/post/comment/${postId}`;
export const getMyPosts = `${host}/api/v1/my/posts`;
export const Logout = `${host}/api/v1/logout`;
export const newPost = `${host}/api/v1/post/upload`;
export const updateProfile = `${host}/api/v1/update/profile`;
export const updatePassword = `${host}/api/v1/update/password`;
export const getAllPosts = `${host}/api/v1/post/allposts`;
export const getUserProfile = `${host}/api/v1/user/:userId`;
export const followUser = `${host}/api/v1/user/:userId`;
export const deleteUserAccount = `${host}/api/v1/delete/me`;