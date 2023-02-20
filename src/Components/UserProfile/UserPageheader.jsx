import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
export default function UserPageheader({ userImage, userName, logout }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="user-profile-header">
      <nav className="user-profile-header-nav" style={{ width: '100%' }}>
        <Link to="/posts" style={{marginRight: '1rem'}}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l14 0"></path>
            <path d="M5 12l6 6"></path>
            <path d="M5 12l6 -6"></path>
          </svg>
        </Link>
        <div className="container">
          <div className="ajax-search">
            <form>
              <svg
                style={{ marginRight: '.5rem' }}
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-search"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                <path d="M21 21l-6 -6"></path>
              </svg>
              search
            </form>
          </div>
          <ul className="user-profile0navbar">
            <li className="user-myaccount" >
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <span class="account-name">@ {userName}</span>
                <Avatar src={userImage} alt="user-img" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={async () => { await handleClose(); logout() }}>Logout</MenuItem>
              </Menu>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
