import React, { useEffect, useState } from 'react'
import './UpdatePassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrorMessage, clearLikesMessage, updateUserPasswordData } from '../../store/UserLike';
import FlexBetween from '../FlexBetween';
import {Box, Typography, useTheme } from '@mui/material';

export default function UpdatePassword() {

    const theme = useTheme();
    const primaryLight = theme.palette.primary.light;
    const dispatch = useDispatch();
    const [formData, setformData] = useState({
        oldPassword: '',
        newPassword: ''
    });
    const { error, status, likesmessage } = useSelector((state) => state.getlikes);
    const handleSubmitFormData = (e) => {
        e.preventDefault();
        const { oldPassword, newPassword } = formData;
        dispatch(updateUserPasswordData({ oldPassword, newPassword }));

    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2500, pauseOnHover: true, theme: "dark" });
            dispatch(clearErrorMessage());
        }

        if (likesmessage) {
            toast.success(likesmessage, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2500, pauseOnHover: true, theme: "dark" });
            dispatch(clearLikesMessage());
        }
    }, [dispatch, error, likesmessage]);
    return (
        <div className="mainDiv">
            <div className="cardStyle">
                <form name="signupForm" id="signupForm" onSubmit={handleSubmitFormData}>
                    <FlexBetween sx={{justifyContent: "center"}}>
                        <Typography
                            fontWeight="bold"
                            fontSize="clamp(.7rem, 1.5rem, 2rem)"
                            color="primary"
                            sx={{
                                "&:hover": {
                                    color: primaryLight,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            Sociopedia
                        </Typography>
                        <img src="https://s3-us-west-2.amazonaws.com/shipsy-public-assets/shipsy/SHIPSY_LOGO_BIRD_BLUE.png" alt='logo' id="signupLogo" height="20px" width="20px" />

                    </FlexBetween>

                    <h2 className="formTitle">
                        Update Your Password
                    </h2>

                    <div className="inputDiv">
                        <label className="inputLabel" htmlFor="password">Old Password</label>
                        <input type="text" id="password" name="password" value={formData.oldPassword} onChange={(e) => setformData({ ...formData, oldPassword: e.target.value })} required />
                    </div>

                    <div className="inputDiv">
                        <label className="inputLabel" htmlFor="confirmPassword">New Password</label>
                        <input type="text" id="confirmPassword" name="confirmPassword" value={formData.newPassword} onChange={(e) => setformData({ ...formData, newPassword: e.target.value })} />
                    </div>

                    <div className="buttonWrapper">
                        <button type="submit" id="submitButton" className="submitButton pure-button pure-button-primary" disabled={status === 'loading'}>
                            <span>Continue</span>
                            <span id="loader"></span>
                        </button>
                    </div>

                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

