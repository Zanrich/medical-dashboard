import { createTheme } from '@mui/material/styles';
import { COLORS, BREAKPOINTS } from './constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
      light: COLORS.secondary,
    },
    secondary: {
      main: COLORS.secondary,
    },
    error: {
      main: COLORS.error,
    },
    warning: {
      main: COLORS.warning,
    },
    success: {
      main: COLORS.success,
    },
    text: {
      primary: COLORS.text.primary,
      secondary: COLORS.text.secondary,
    },
    background: {
      default: COLORS.background.default,
      paper: COLORS.background.paper,
    },
  },
  breakpoints: {
    values: BREAKPOINTS,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: COLORS.text.primary,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: COLORS.text.primary,
    },
    body1: {
      color: COLORS.text.secondary,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});