import { createMuiTheme, createTheme } from '@mui/material/styles';

export const CodeGenTheme = createTheme({
  palette: {
    background: {
      default: 'black',
    },
    primary: {
      main: '#202020',
    },
  },
});
export const ThemeDark = createMuiTheme({
  palette: {
    background: {
      default: '#222222',
    },
    text: {
      primary: '#ffffff',
    },
  },
});
