import React from 'react';
import './App.css';
import Hello from '@/pages/Hello';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@/layouts/Header';
import PageRouter from '@/layouts/PageRouter';
import { Box, Container, GlobalStyles, Grid, makeStyles, ThemeProvider } from '@mui/material';
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
      <Container fixed style={{ padding: '0px' }}>
        <BrowserRouter>
          <div>
            <GlobalStyles
              styles={{
                // body: { backgroundColor: 'darkslategray' },
                body: { margin: '0px' },
              }}
            />

            {/*<Header styles={{ backgroundColor: 'red' }} />*/}
            <div style={{ backgroundColor: '#474444', height: 55 }}>11</div>
            <Grid container>
              <Grid item xs={2}>
                <div>nav</div>
              </Grid>
              <Grid item xs={10}>
                <div
                  style={{
                    backgroundColor: '#339999',
                    color: 'white',
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Hello />} />
                    <Route path="/*" element={<PageRouter />} />
                  </Routes>
                </div>
              </Grid>
            </Grid>
          </div>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
