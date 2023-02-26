import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRegisterData } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { clearErrorMessage } from "../../store/UserLike";
import { IconButton, Typography } from "@mui/material";
import UploadImage from "../UploadImage";
export default function RegisterRight() {
  const [regFormData, setRegFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

  });
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, status, error } = useSelector((state) => state.user);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = (e) => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    }
  };
  const handleSubmitRegisterForm = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = regFormData;
    if (password !== confirmPassword) {
      alert("password and confirmPassword doesn't match");
    } else {
      dispatch(postRegisterData({ name, email, password, avatar }));
    }
  };


  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2500, pauseOnHover: true, theme: "dark", });
      dispatch(clearErrorMessage());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isAuth) {
      navigate("/posts");
    }
  }, [isAuth, navigate])
  return (
    <div className="register">
      <Typography variant="h3">Welcome</Typography>
      <form className="register-form" onSubmit={handleSubmitRegisterForm}>

        <UploadImage src={avatar} onChange={handleImageChange}  />


        <div className="material-textfield ">

          <input
            required
            id="name"
            placeholder=" "
            value={regFormData.name}
            onChange={(e) =>
              setRegFormData({ ...regFormData, name: e.target.value })
            }
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="material-textfield">
          <input
            required
            id="email"
            placeholder=" "
            value={regFormData.email}
            onChange={(e) =>
              setRegFormData({ ...regFormData, email: e.target.value })
            }
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="material-textfield">
          <input
            required
            id="password"
            placeholder=" "
            value={regFormData.password}
            onChange={(e) =>
              setRegFormData({ ...regFormData, password: e.target.value })
            }
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="material-textfield">
          <input
            required
            id="c-password"
            placeholder=" "
            value={regFormData.confirmPassword}
            onChange={(e) =>
              setRegFormData({
                ...regFormData,
                confirmPassword: e.target.value,
              })
            }
          />
          <label htmlFor="c-password">Confirm Password</label>
        </div>
        <p className="forgot-not" style={{ marginBottom: "1.5rem" }}>
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember Me</label>
        </p>
        <button disabled={status === 'loading'} className="reg-btn">register</button>
      </form>
      <p className="already-user">
        <Link to="/login">Already a user?</Link>
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
      <ToastContainer />
    </div>
  );
}
