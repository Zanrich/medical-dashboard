import { createTheme, PaletteOptions } from '@mui/material/styles';
import { COLORS, BREAKPOINTS } from './constants';
import '../assets/fonts/Montserrat.css';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    notifications?: {
      header: string;
      subheader: string;
      time: string;
    };
  }

  interface TypeText {
    subtext: string;
  }
}

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
      subtext: COLORS.text.subtext,
    },
    background: {
      default: COLORS.background.default,
      paper: COLORS.background.paper,
    },
    notifications: {
      header: COLORS.notifications.header,
      subheader: COLORS.notifications.subheader,
      time: COLORS.notifications.time,
    },
    grey: {
      100: COLORS.grey[100],
      200:  COLORS.grey[200],
      300:  COLORS.grey[300],
    },
  },
  breakpoints: {
    values: BREAKPOINTS,
  },
  typography: {
    fontFamily: 'Montserrat, regular',
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