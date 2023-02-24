import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import "../Components/LoginComp/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Login from '../Components/LoginComp/Login'
import { useDispatch, useSelector } from 'react-redux';
import { postLoginData } from '../store/userSlice';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
export default function LoginPage() {
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

  const { isAuth, message } = useSelector((state) => state.user);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postLoginData(loginData));
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/posts");
    }
  }, []) // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div style={{ width: "100%", margin: "0 auto", fontFamily: "'Poppins', sans-serif" }}>
      <div className="container_login100" style={{ backgroundImage: "url('https://colorlib.com/etc/lf/Login_v4/images/bg-01.jpg')" }}>
        <div className="wrap_login100">
          <form className='login100_form validate_form' onSubmit={handleOnSubmit}>
            <span className="login-100_form_title">Login To <span style={{ color: '#615dfa' }}> Socialpedia</span></span>
            <div className="wrap_input100 validate_input" dataValidate="Email is required" style={{ marginBottom: '1.5rem' }}>
              <span className="label_input100">Username</span>
              <input type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="input100"  placeholder='Type your email' required />
              <span className='focus_input100'>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-at" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                  <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28"></path>
                </svg>
              </span>
            </div>

            <div className="wrap_input100 validate_input" dataValidate="Email is required">
              <span className="label_input100">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="input100"  placeholder='Type your password' required />
              <span className='focus_input100'>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 11m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
                  <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                  <path d="M8 11v-4a4 4 0 0 1 8 0v4"></path>
                </svg>
              </span>
              <IconButton
                sx={{
                  float: "right",
                  bottom: "2.8rem",
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
            </div>

            <div className="forgot_password">
              <a href="/">Forgot password?</a>
            </div>
            <div className="container_login100_form-btn">
              <div className="wrap_login100_formbtn">
                <div className="login100_formbgbtn"></div>
                <button className='login100_formbtn'>Login</button>
              </div>
            </div>
            <div className="sign___up">
              <span>Or Sign Up Using</span>
            </div>
            <div className="social___media">
              <a href="" className="login100_social_item" style={{ backgroundColor: "#3b5998" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-meta" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 10.174c1.766 -2.784 3.315 -4.174 4.648 -4.174c2 0 3.263 2.213 4 5.217c.704 2.869 .5 6.783 -2 6.783c-1.114 0 -2.648 -1.565 -4.148 -3.652a27.627 27.627 0 0 1 -2.5 -4.174z"></path>
                  <path d="M12 10.174c-1.766 -2.784 -3.315 -4.174 -4.648 -4.174c-2 0 -3.263 2.213 -4 5.217c-.704 2.869 -.5 6.783 2 6.783c1.114 0 2.648 -1.565 4.148 -3.652c1 -1.391 1.833 -2.783 2.5 -4.174z"></path>
                </svg>
              </a>

              <a href="" className="login100_social_item" style={{ backgroundColor: "#1da1f2" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>
                </svg>
              </a>
              <a href="" className="login100_social_item" style={{ backgroundColor: "#EA4335" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
                </svg>
              </a>
            </div>

            <div className="goto__sigup">
              <span>New User?</span>
              <Link to="/register">sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

