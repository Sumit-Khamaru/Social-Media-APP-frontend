import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { clearErrorMessage, clearLikesMessage, updateUserProfileData } from '../../store/UserLike';
import { ToastContainer, toast } from "react-toastify";
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { loadUserData } from '../../store/userSlice';
import UploadImage from '../UploadImage';
export default function EditProfile() {
  const navigate = useNavigate();
  const { status, error, user} = useSelector((state) => state.user);
  const {loading: updateLoading, error: updateError, likesmessage} = useSelector((state) => state.getlikes);
  const [regFormData, setRegFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const [avatarPrev, setAvatarPrev] = useState();
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
     Reader.onload = (e) => {
       if(Reader.readyState === 2) {
        setAvatarPrev(Reader.result);
        setAvatar(Reader.result);
       }
     }
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      const {name, email} = regFormData;
      await dispatch(updateUserProfileData({name, email, avatar}));
      dispatch(loadUserData());
      navigate(`/profile/${user._id}`);
   }

  //  useEffect(() => {
  //   if (error) {
  //     toast.error(error, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2500, pauseOnHover: true, theme: "dark",});
  //     dispatch(clearErrorMessage());
  //   }

  //   if (updateError) {
  //     toast.error(updateError, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2500, pauseOnHover: true, theme: "dark",});
  //     dispatch(clearErrorMessage());
  //   }

  //   if (likesmessage) {
  //     toast.success(likesmessage, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2500, pauseOnHover: true, theme: "dark",});
  //     dispatch(clearLikesMessage());
  //   }
  // }, [dispatch, error, updateError, likesmessage]);


    return status === 'loading' ? (<h1>Loading.....</h1>) : (
        <Div className='edit-profile'>
          <>
            <main className="has-dflex-center">
                <section>
                    <div className="container">
                        <div className="lx-row">
                            <h1 className="title text-center">Edit your profile</h1>
                        </div>
                        <div className="lx-row align-stretch">
                            <div className="lx-column column-user-pic">
                                <div className="profile-pic bs-md">
                                    <h1 className="pic-label">Profile picture</h1>
                                    <UploadImage src={avatarPrev} onChange={handleImageChange} />
                                    <div className="pic-info">
                                        <p>
                                            <i className="fas fa-exclamation-triangle"></i>&nbsp;&nbsp;This photo will appear on the platform.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="lx-column">
                                <form onSubmit={submitHandler}>
                                    <div className="fieldset">
                                        <label htmlFor="user-name">Name</label>
                                        <div className="input-wrapper">
                                            <span className="icon"><i className="fas fa-user"></i></span>
                                            <input type="text"  value={regFormData.name} onChange={(e) => setRegFormData({...regFormData, name: e.target.value})} placeholder='name here'  required />
                                        </div>
                                        <div id="user-name-helper" className="helper">
                                            <p>Your name can appear on the platform.</p>
                                        </div>
                                    </div>
                                    <div className="fieldset">
                                        <label htmlFor="email">E-mail</label>
                                        <div className="input-wrapper">
                                            <span className="icon"><i className="fas fa-envelope"></i></span>
                                            <input type="email" id="email" value={regFormData.email} placeholder='email here' onChange={(e) => setRegFormData({...regFormData, email: e.ta
                                            .value})}  required />
                                        </div>
                                        <div id="email-helper" className="helper"></div>
                                    </div>
                                    {/* <div className="fieldset">
                                        <label for="pass">Password</label>
                                        <div className="input-wrapper">
                                            <span className="icon"><i className="fas fa-key"></i></span>
                                            <input type="password" id="pass" value="pass123*" autocomplete="current-password" />
                                        </div>
                                        <div id="pass-helper" className="helper"></div>
                                    </div> */}
                                    <div className="actions">
                                        <a id="cancel" className="lx-btn" type='sumbit'><i className="fas fa-ban"></i>&nbsp;&nbsp;Cancel</a>
                                        {/* <a id="clear" className="lx-btn"><i className="fas fa-broom"></i>&nbsp;&nbsp;Clean</a> */}
                                        <Button id="save" className="lx-btn" type="submit" disabled={updateLoading}><i className="fas fa-save"></i>&nbsp;&nbsp;Save</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            <ToastContainer/>
            </main>
            </>
        </Div>
    )
}


const Div = styled.div`
html,
body {
  font-family: "Roboto", sans-serif;
  font-size: 88%;
}

body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-image: url("https://i.postimg.cc/fbSXnBct/video.png");
  background-attachment: fixed;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

main {
    min-height: 100vh;
    padding: 2rem 0;
  
    section {
      width: 100%;
  
      .lx-column {
        &.column-user-pic {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        }
      }
  
      .profile-pic {
        width: auto;
        max-width: 20rem;
        margin: 3rem 2rem;
        padding: 2rem;
        display: flex;
        flex-flow: wrap column;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem;
        background-color: white;
  
        .pic-label {
          width: 100%;
          margin: 0 0 1rem 0;
          text-align: center;
          font-size: 1.4rem;
          font-weight: 700;
        }
  
        .pic {
          width: 16rem;
          height: 16rem;
          position: relative;
          overflow: hidden;
          border-radius: 50%;
  
          .lx-btn {
            opacity: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            text-transform: none;
            font-size: 1rem;
            color: white;
            background-color: rgba(0, 0, 0, 0.8);
          }
  
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
  
          &:focus,
          &:focus-within,
          &:hover {
            .lx-btn {
              opacity: 1;
              display: flex;
            }
          }
        }
  
        .pic-info {
          width: 100%;
          margin: 2rem 0 0 0;
          font-size: 0.9rem;
          text-align: center;
        }
      }
  
      form {
        width: auto;
        min-width: 15rem;
        max-width: 25rem;
        margin: 3rem 0 0 0;
  
        .fieldset {
          width: 100%;
          margin: 2rem 0;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
  
          label {
            width: 100%;
            margin: 0 0 1rem 0;
            font-size: 1.2rem;
            font-weight: 700;
          }
  
          .input-wrapper {
            width: 100%;
            display: flex;
            flex-flow: nowrap;
            align-items: stretch;
            justify-content: center;
  
            .icon {
              width: fit-content;
              margin: 0;
              padding: 0.375rem 0.75rem;
              display: flex;
              align-items: center;
              border-top-left-radius: 0.25em;
              border-bottom-left-radius: 0.25em;
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
              border: 0.0625rem solid #ced4da;
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.5;
              color: #495057;
              text-align: center;
              background-color: #e9ecef;
            }
  
            input,
            select {
              flex-grow: 1;
              min-height: 3rem;
              padding: 0.375rem 0.75rem;
              display: block;
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              border-top-right-radius: 0.25em;
              border-bottom-right-radius: 0.25em;
              border: 0.0625rem solid #ced4da;
              border-left: 0;
              font-size: 1rem;
              font-weight: 400;
              line-height: 1.5;
              color: #495057;
            }
  
            &:focus,
            &:focus-within,
            &:hover {
              .icon {
                color: #538e46;
              }
            }
          }
  
          &:first-child {
            margin-top: 0;
          }
  
          &:last-child {
            margin-bottom: 0;
          }
        }
  
        .actions {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
           
          .lx-btn {
            height: 30px;
            min-height: initial;
            padding-top: 0;
            padding-bottom: 0;
            background-color: #8224e3;
            background-image: linear-gradient( 90deg, #8224e3 0, #a968ec 50%, #8224e3  100% );
            box-shadow: 0 1px 2px 0 rgb(130 36 227 / 50%);
            color: #fff;
            padding: 0.375rem 2rem;
            border: none;
            border-radius: 30px;
            text-align: center;
            font-weight: normal;
            text-decoration: none;
            cursor: pointer;
            line-height: 1;
            font: 200 1.1rem "Roboto", sans-serif
          }
        }
      }
    }
  }
  
  @media screen and (max-width: 64rem) {
    main {
      section {
        .profile-pic {
          max-width: 100%;
          margin: 0;
        }
      }
    }
  }
  
  @media screen and (max-width: 56.25rem) {
    main {
      section {
        form {
          max-width: 100%;
          margin: 0;
        }
      }
    }
  }
   
  .align-stretch{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 42.125rem) {
    .align-stretch{
        flex-direction: column;z
    }
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
  .action button {
    
  }
`;