import * as React from 'react';
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Link, Route, Routes } from "react-router-dom";
import { Grid, Box, IconButton, CssBaseline, Switch } from '@mui/material'
import Blog from "./components/Blog";
import BlogDetail from "./components/BlogDetail";
import Home from "./components/Home";
import Layout from "./layout/Layout";
import Interests from './components/Interests';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { color } from 'framer-motion';
import MdDetail from './components/MdDetail'
import Markdown from './components/Markdown'




const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


function App() {
  const [wrappedScreen, setWrappedScreen] = React.useState(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });

  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );


  return (
    <>
      <React.Fragment>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout colorMode={colorMode} theme={theme} />
            <Routes>
              <Route path="/" element={<Home theme={theme} />} />
              <Route path="/interests" element={<Interests theme={theme} />} />
              {/* <Route path="/blog" element={<Blog theme={theme} />} />
              <Route path="/blog/:id" element={<BlogDetail />} /> */}
              <Route path="/blog" element={<Markdown theme={theme} />} />
              <Route path="/blog/:id" element={<MdDetail />} />
            </Routes>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </React.Fragment>
    </>
  );
}

export default App;
