import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Theme(props: any) {
  const { children } = props;

  const Theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#81a1c1',
        dark: '#5e81ac',
      },
      secondary: {
        main: '#88c0d0',
        light: '#8fbcbb',
      },
      error: {
        main: '#bf616a',
      },
      warning: {
        main: '#d08770',
      },
      info: {
        main: '#ebcb8b',
      },
      success: {
        main: '#a3be8c',
      },
      text: {
        primary: '#4C566A',
        secondary: '#4c566a',
      },
    },
  });

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
