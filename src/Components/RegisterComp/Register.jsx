import React from 'react'
import './Register.css';
import { Box, Typography, useTheme } from "@mui/material";
import RegisterRight from './RegisterRight';
export default function Register() {
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
      <RegisterRight />
    </Box>
  )
}
