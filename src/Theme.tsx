import { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useCookies } from "react-cookie";
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

import App from './App.tsx';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

export default function Theme() {
  const [cookies, setCookie, removeCookie] = useCookies(['dark-mode']);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
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
      },
      typography: {
        fontFamily: ["B Nazanin"].join(","),
        // button: {
        //   fontFamily: 'B Nazanin',
        //   fontSize: 16,
        //   fontWeight: 600,
        // },
        // textxs: {
        //   fontFamily: 'B Nazanin',
        //   fontSize: 12,
        // },
        // textsm: {
        //   fontFamily: 'B Nazanin',
        //   fontSize: 14,
        // },
        // textbase: {
        //   fontSize: 16,
        //   fontWeight: 600,
        // },
        // textlg: {
        //   fontFamily: 'B Nazanin',
        //   fontSize: 18,
        //   fontWeight: 600,
        // },
        // textxl: {
        //   fontFamily: 'B Nazanin',
        //   fontSize: 20,
        // },
        // text2xl: {
        //   fontFamily: 'B Nazanin',
        //   fontSize: 24,
        // },
        // text3xl: {
        //   fontFamily: 'B Nazanin',
        //   fontSize: 30,
        // },
        // text4xl: {
        //   fontFamily: 'B Nazanin',
        //   fontSize: 36,
        // },
      },
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
