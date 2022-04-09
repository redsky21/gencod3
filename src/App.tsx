import React from 'react';
import './App.css';
import Hello from '@/pages/Hello';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import FirstPage from '@/pages/FirstPage';
import { Header } from '@/layouts/Header';

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">이곳은 헤더</header>*/}

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/page1" element={<FirstPage />} />
          <Route path="/page2" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <div>이곳은 body</div>
    </div>
  );
}

export default App;
