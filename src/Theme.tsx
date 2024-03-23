import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useCookies } from "react-cookie";
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from './Redux/Store.ts';
import App from './App.tsx';
import sahel from './fonts/Sahel-FD.woff2';
import { change } from './Redux/Reducer/ModeReducer.tsx';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

const cacheDataTable = createCache({
  key: "mui-datatables",
  prepend: true
})

export default function Theme() {

  const dispatch = useDispatch<AppDispatch>();
  const darkMode = useSelector((state: RootState) => state.mode);
  const [cookies, ,] = useCookies(['darkmode']);
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    dispatch(change(cookies.darkmode ?? 'light'));
    if (darkMode === 'light' || darkMode === 'dark') {
      setMode(darkMode);
    }
  }, [darkMode])

  let theme = createTheme({});
  theme = useMemo(() =>

    createTheme({
      direction: 'rtl',

      palette: {
        mode,

        primary: {
          main: mode === 'light' ? '#0067A5' : '#00A693',
          contrastText: '#fff',
        },

        secondary: {
          main: mode === 'light' ? '#00A693' : '#0067A5',
          contrastText: '#ccc',
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
              textAlign: 'right'
            }
          }
        },
        MUIDataTable: {
          styleOverrides: {
            tableRoot: {
              overflow: 'unset',
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
