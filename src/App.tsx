import React from 'react';
import './App.css';
import Hello from '@/pages/Hello';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@/layouts/Header';
import PageRouter from '@/layouts/PageRouter';
import { Box, GlobalStyles, makeStyles, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ff0000',
        contrastText: '#fff',
      },
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <GlobalStyles
            styles={{
              // body: { backgroundColor: 'darkslategray' },
              body: { margin: '0px' },
            }}
          />

          {/*<Header styles={{ backgroundColor: 'red' }} />*/}
          <div style={{ backgroundColor: '#121212', height: 55 }}>11</div>
          <div style={{ backgroundColor: 'darkslategray', height: 40 }}>submenu</div>
          <div
            style={{
              backgroundColor: '#339999',
              color: 'white',
              height: 'calc(100% - 95px)',
            }}
          >
            <Routes>
              <Route path="/" element={<Hello />} />
              <Route path="/*" element={<PageRouter />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
