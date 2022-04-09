import React from 'react';
import './App.css';
import Hello from '@/pages/Hello';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@/layouts/Header';
import PageRouter from '@/layouts/PageRouter';
import { Box } from '@mui/material';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Hello />} />

          <Route path="/*" element={<PageRouter />} />
        </Routes>
      </BrowserRouter>
      <div>이곳은 body</div>
    </Box>
  );
}

export default App;
