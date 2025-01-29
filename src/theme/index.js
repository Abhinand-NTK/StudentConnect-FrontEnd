import { extendTheme } from "@mui/material/styles";

export const demoTheme = extendTheme({
  palette: {
    mode: 'light', 
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});
