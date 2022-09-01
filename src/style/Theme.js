import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003BE5',
    },
    secondary: {
      main: '#2FC18C',
    },
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl'],
      values: {
        xs: 0,
        sm: 550,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  },
});

export default theme;
