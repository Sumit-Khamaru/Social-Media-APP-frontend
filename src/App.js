import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "./store/userSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import MainPage from "./Pages/MainPage.jsx";
import RegisterPage from "./Pages/RegisterPage";
import UserPage from "./Pages/UserPage";
import EditProfile from "./Components/EditProfile/EditProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from './Components/theme';
import ProfilePage from "./Pages/ProfilePage";
import { getAllUsersData } from "./store/GetAllUsersSlice";
import ErrorPage from "./Pages/ErrorPage";
import LoadingPage from "./Pages/LoadingPage";

function App() {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useMemo(() => createTheme(themeSettings()));

  useEffect(() => {
    dispatch(loadUserData());
    dispatch(getAllUsersData());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
        <Route path="/" element={isAuth? <Navigate to='/posts' /> : <LoginPage />}/>
          <Route path="/posts" element={isAuth? <MainPage /> : <Navigate to='/'/>}/>
          <Route path="/profile/:id" element={isAuth? <ProfilePage /> : <Navigate to='/' />}/>
          <Route path="/register" element={isAuth? <Navigate to='/posts' /> : <RegisterPage />}/>
          <Route path="/update/profile" element={isAuth? <EditProfile /> : <Navigate to='/'/>}/>
          <Route path="/update/password" element={isAuth? <UpdatePassword /> : <Navigate to='/'/>}/>
          <Route path="/user/profile/:id" element={isAuth? <UserPage /> : <Navigate to='/'/>}/>
          <Route path="*" element={<ErrorPage />}/>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;


