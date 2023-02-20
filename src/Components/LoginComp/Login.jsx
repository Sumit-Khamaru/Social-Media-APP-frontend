import React from "react";
import "./Login.css";
import { Box, Typography, useTheme } from "@mui/material";
import LoginRight from "./LoginRight";
import { useDispatch, useSelector } from "react-redux";
export default function Login() {
  const { isAuth } = useSelector((state) => state.user);
  // console.log(isAuth);
  const theme = useTheme();
  return (
    <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <Box>
        <Typography 
        fontWeight="bold"
        fontSize="32px"
        color="#615dfa"
        >
          Socialpedia
        </Typography>
      </Box>
      <LoginRight />
    </Box>
  );
}
