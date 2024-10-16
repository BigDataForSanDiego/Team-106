// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // You can switch to 'dark' if preferred
    primary: {
      main: '#000000', // Black text
    },
    background: {
      default: '#ffffff', // White background
      paper: '#f5f5f5', // Slightly grey background for cards
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#4f4f4f', // Dark grey text
    },
  },
  typography: {
    fontFamily: '"Arial", sans-serif',
    fontSize: 14,
  },
});

export default theme;
