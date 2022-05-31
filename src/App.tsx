import React from 'react';
import './App.css';
import Hello from '@/pages/Hello';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@/layouts/Header';
import PageRouter from '@/layouts/PageRouter';
import { Box, Container, GlobalStyles, Grid, makeStyles, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { LeftMenu } from '@/layouts/LeftMenu';
import { MainPageLayout } from './layouts/MainPageLayout';

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
      <Container maxWidth={false} style={{ padding: '0px', height: '100%' }}>
        <BrowserRouter>
          <MainPageLayout></MainPageLayout>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
