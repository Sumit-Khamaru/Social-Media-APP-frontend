import React from 'react'
import { Typography, useTheme } from "@mui/material";
import FlexBetween from '../Components/FlexBetween';
import WidgetWrapper from '../Components/WidgetWrapper';
export default function AdvertWidget() {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
    <FlexBetween>
      <Typography color={dark} variant="h5" fontWeight="500">
        Sponsored
      </Typography>
      <Typography color={medium}>Create Ad</Typography>
    </FlexBetween>
    <img
      width="100%"
      height="auto"
      alt="advert"
      src="https://images.unsplash.com/photo-1583209814683-c023dd293cc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
    />
    <FlexBetween>
      <Typography color={main}>MikaCosmetics</Typography>
      <Typography color={medium}>mikacosmetics.com</Typography>
    </FlexBetween>
    <Typography color={medium} m="0.5rem 0">
      Your pathway to stunning and immaculate beauty and made sure your skin
      is exfoliating skin and shining like light.
    </Typography>
  </WidgetWrapper>
  )
}
