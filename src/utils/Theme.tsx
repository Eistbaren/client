import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/**
 * Sets a MaterialUi theme for its children
 * @param  {any} props accepts JSX elements to wrap theme in
 * @return {JSX.Element}
 */
export default function Theme(props: { children: JSX.Element }) {
  const { children } = props;

  const Theme = createTheme({
    components: {
      MuiToggleButton: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#81a1c1',
        dark: '#5e81ac',
        contrastText: '#fff',
      },
      secondary: {
        main: '#88c0d0',
        light: '#8fbcbb',
        contrastText: '#3b4252',
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
        primary: '#2e3440',
        secondary: '#4c566a',
      },
    },
    shadows: [
      'none',
      'rgba(50, 50, 93, 0.125) 0px 3px 8px -1px,rgba(0, 0, 0, 0.13) 0px 2px 4px -2px;',
      'rgba(50, 50, 93, 0.125) 0px 2px 5px -1px,rgba(0, 0, 0, 0.13) 0px 1px 3px -1px;',
      'rgba(50, 50, 93, 0.125) 0px 4px 11px -2px,rgba(0, 0, 0, 0.13) 0px 3px 6px -3px;',
      'rgba(50, 50, 93, 0.125) 0px 5px 14px -2px,rgba(0, 0, 0, 0.13) 0px 4px 7px -4px;',
      'rgba(50, 50, 93, 0.125) 0px 6px 17px -3px,rgba(0, 0, 0, 0.13) 0px 5px 9px -5px;',
      'rgba(50, 50, 93, 0.125) 0px 7px 20px -3px,rgba(0, 0, 0, 0.13) 0px 6px 10px -6px;',
      'rgba(50, 50, 93, 0.125) 0px 8px 22px -4px,rgba(0, 0, 0, 0.13) 0px 7px 12px -7px;',
      'rgba(50, 50, 93, 0.125) 0px 8px 24px -5px,rgba(0, 0, 0, 0.13) 0px 8px 13px -7px;',
      'rgba(50, 50, 93, 0.125) 0px 8px 27px -5px,rgba(0, 0, 0, 0.13) 0px 8px 15px -8px;',
      'rgba(50, 50, 93, 0.125) 0px 13px 27px -5px,rgba(0, 0, 0, 0.13) 0px 8px 16px -8px;',
      'rgba(50, 50, 93, 0.125) 0px 25px 35px -5px,rgba(0, 0, 0, 0.13) 0px 15px 20px -12px;',
      'rgba(50, 50, 93, 0.125) 0px 30px 45px -7px,rgba(0, 0, 0, 0.13) 0px 20px 25px -15px;',
      'rgba(50, 50, 93, 0.125) 0px 35px 55px -10px,rgba(0, 0, 0, 0.13) 0px 25px 30px -18px;',
      'rgba(50, 50, 93, 0.125) 0px 40px 65px -12px,rgba(0, 0, 0, 0.13) 0px 30px 35px -21px;',
      'rgba(50, 50, 93, 0.125) 0px 45px 75px -15px,rgba(0, 0, 0, 0.13) 0px 35px 40px -24px;',
      'rgba(50, 50, 93, 0.125) 0px 50px 85px -17px,rgba(0, 0, 0, 0.13) 0px 40px 45px -27px;',
      'rgba(50, 50, 93, 0.125) 0px 55px 95px -20px,rgba(0, 0, 0, 0.13) 0px 45px 50px -30px;',
      'rgba(50, 50, 93, 0.125) 0px 60px 105px -22px,rgba(0, 0, 0, 0.13) 0px 50px 55px -33px;',
      'rgba(50, 50, 93, 0.125) 0px 65px 110px -25px,rgba(0, 0, 0, 0.13) 0px 55px 60px -36px;',
      'rgba(50, 50, 93, 0.125) 0px 70px 115px -27px,rgba(0, 0, 0, 0.13) 0px 60px 65px -39px;',
      'none',
      'none',
      'none',
      'none',
    ],
  });
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
