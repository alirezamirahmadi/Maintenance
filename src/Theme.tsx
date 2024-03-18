import { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useCookies } from "react-cookie";
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

import App from './App.tsx';
import sahel from './fonts/Sahel-FD.woff2';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const cacheDataTable = createCache({
  key: "mui-datatables",
  prepend: true
});

export default function Theme() {
  const [cookies, setCookie, removeCookie] = useCookies(['dark-mode']);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       // console.log(mode);
  //       setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

  //       // setMode('dark');
  //     },
  //   }),
  //   [],
  // );

  // const setTheme = () => {

  // }

  // useEffect(() => {
  //   console.log(mode);

  // }, [mode])

  let theme = createTheme({});
  theme = useMemo(() =>

    createTheme({
      direction: 'rtl',

      palette: {
        mode,

        primary: {
          main: '#0067A5',
          contrastText: '#fff',
        },

        secondary: {
          main: '#00A693',
          contrastText: '#fff',
        },
      },
      typography: {
        fontFamily: ["sahel, arial"].join(","),
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'sahel';
              src: url(${sahel}) format('woff2');
            }
          `,
        },
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              textAlign:'right'
            }
          }
        },
        MUIDataTable:{
         styleOverrides:{
          tableRoot:{
            overflow:'unset',
          }
         } 
        }
      }
    }),
    [mode]
  )

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  )
}

export { cacheDataTable };
