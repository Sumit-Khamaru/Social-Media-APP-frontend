import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Typography } from "@mui/material";
import Users from "../MainComp/AllUsers/Users";
export default function UserSiteContent({ user, name, userFollowers = [], userFollowing = [], posts = [], logout, userImage }) {

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="user-site-content">
      <div className="">
        <div className="row" >
          <div className="col-lg-12 col-main">
            <main className="user-profile-main">
              <article>
                <div className="entry-content clearfix">
                  <div className="buddypress-wrap">
                    <div
                      style={{ marginTop: "-30px", paddingTop: "0" }}
                      className="single-headers"
                    >
                      <div className="cover-image-container">
                        <div className="header-cover-image">
                          <div className="item-header-cover-image">
                            <div className="row">
                              <div className="col-lg-3">
                                <div className="item-header-avatar">
                                  <div className="item-avatar position-relative">
                                    <a href="">
                                      <img
                                        loading="lazy"
                                        src={userImage}
                                        className="avatar"
                                        width="200"
                                        height="200"
                                        alt="Profile"
                                      />
                                    </a>
                                  </div>
                                  <h3 className="item-profile-name">
                                    {name}
                                  </h3>
                                </div>
                              </div>
                              <div className="item-user-connections" style={{ position: 'relative' }}> </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </main>
            <div className=" user-profile-control-button">
              <div className="userprofile-updates ">
                <Link to="/update/profile">
                  <Button>
                    Update Profile
                  </Button>
                </Link>
                <Link to="/update/password">
                  <Button>
                    Update Password
                  </Button>
                </Link>
                <ul className="user-connections">
                  <Button onClick={() => setFollowersToggle(!followersToggle)} style={{ cursor: 'pointer' }}>
                    <span className="friend-count">
                      {userFollowers.length}
                    </span>
                    <p>Followers</p>
                  </Button>
                  <Button onClick={() => setFollowingToggle(!followingToggle)} style={{ cursor: 'pointer' }}>
                    <span className="user-following">
                      {userFollowing.length}
                    </span>
                    <p>Following</p>
                  </Button>

                  <Button disabled>
                    <span className="user-following">
                      {posts.length}
                    </span>
                    <p>Posts</p>
                  </Button>
                </ul>
              </div>
            </div>
            {/* For Followers */}
            <Dialog open={followersToggle} onClose={() => setFollowersToggle(!followersToggle)}>
              <div className="DialogBox">
                <aside className="sidebar-widget-area">
                  <div className="widget widget_core_memebers">
                    <h5 className="widget-title">Followers</h5>
                    <ul className="member-item-list">
                      {user && user.followers.length > 0 ? (
                        user.followers.map((follower) => (
                          <Users
                            key={follower._id}
                            // ownerImage={item.avatar.url}
                            ownerName={follower.name}
                            ownerId={follower._id}
                          />
                        ))
                      ) : (
                        <Typography variant="h6">You have not followers yet</Typography>
                      )}
                    </ul>
                  </div>
                </aside>
              </div>
            </Dialog>
            {/* for Following */}
            <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
              <div className="DialogBox">
                <aside className="sidebar-widget-area">
                  <div className="widget widget_core_memebers">
                    <h5 className="widget-title">Following</h5>
                    <ul className="member-item-list">
                      {user && user.following.length > 0 ? (
                        user.following.map((followings) => (
                          <Users
                            key={followings._id}
                            ownerImage={followings.avatar.url}
                            ownerName={followings.name}
                            ownerId={followings._id}
                          />
                        ))
                      ) : (
                        <Typography variant="h6">You have not following anyone yet</Typography>
                      )}
                    </ul>
                  </div>
                </aside>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
