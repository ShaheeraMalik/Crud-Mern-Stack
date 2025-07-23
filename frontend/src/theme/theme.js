import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },  // adjust to your brand
    secondary: { main: '#dc004e' },
  },
  typography: {
    h1: { fontSize: '2rem' },
    // ...etc.
  },
});

export default theme;
