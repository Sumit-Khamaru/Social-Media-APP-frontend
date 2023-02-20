import React, { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { postLoginData } from "../../store/userSlice";
import { ToastContainer ,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
export default function LoginRight() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {isAuth, message } = useSelector((state) => state.user);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postLoginData(loginData));
  };
  useEffect(() =>{
    if(isAuth) {
      navigate("/posts");
    }
  },[isAuth, message, navigate])

  return (
    <div className="login">
      <h1>Welcome</h1>
      <form className="login-form" onSubmit={handleOnSubmit}>
        <div className="material-textfield">
          <input
            required
            id="email"
            placeholder=" "
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="material-textfield">
          <input
            required
            id="password"
            placeholder=" "
            type={showPassword ? "text" : "password"}
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <label htmlFor="password">Password</label>
        </div>
        <IconButton
          sx={{
            float: "right",
            bottom: "4.4rem",
            right: "1.2rem",
          }}
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          edge="end"
        >
          {showPassword ? (
            <VisibilityOff sx={{ color: "#615dfa" }} />
          ) : (
            <Visibility sx={{ color: "#615dfa" }} />
          )}
        </IconButton>
        <p className="forgot-not">
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember Me</label>
        </p>
        <button className="login-btn">LogIn</button>
      </form>
      <p className="lost-password">
        <a href="" style={{ marginRight: "7rem" }}>
          Lost your Password?
        </a>
        <Link to="/register">New user?</Link>
      </p>
      <div className="social-media-btns">
        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-brand-meta fab"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 10.174c1.766 -2.784 3.315 -4.174 4.648 -4.174c2 0 3.263 2.213 4 5.217c.704 2.869 .5 6.783 -2 6.783c-1.114 0 -2.648 -1.565 -4.148 -3.652a27.627 27.627 0 0 1 -2.5 -4.174z"></path>
            <path d="M12 10.174c-1.766 -2.784 -3.315 -4.174 -4.648 -4.174c-2 0 -3.263 2.213 -4 5.217c-.704 2.869 -.5 6.783 2 6.783c1.114 0 2.648 -1.565 4.148 -3.652c1 -1.391 1.833 -2.783 2.5 -4.174z"></path>
          </svg>
        </a>

        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-brand-google"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
          </svg>
        </a>

        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-brand-instagram"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path d="M16.5 7.5l0 0"></path>
          </svg>
        </a>
      </div>
      <ToastContainer/>
    </div>
  );
}
