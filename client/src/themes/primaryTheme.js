import {createTheme} from '@mui/material/styles'

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#c89ece',
    },
    secondary: {
      main: '#9066a3',
    },
    background: {
      default: '#081a36',
      paper: '#6371a8',
    },
    error: {
      main: '#bf3939',
    },
    info: {
      main: '#081a36',
    },
    success: {
      main: '#279a7b',
    },
    divider: '#000000',
    warning: {
      main: '#6371a8',
    },
  },
  typography: {
    h4: {
      fontFamily: 'Lora',
    },
    h1: {
      fontFamily: 'Lora',
    },
    fontFamily: 'Lora',
  },
};

  const theme = createTheme(themeOptions)
  export default theme;