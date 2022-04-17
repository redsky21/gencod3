import Hello from '@/pages/Hello';
import { GlobalStyles, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './Header';
import { layoutStore } from './LayoutStore';
import { LeftMenu } from './LeftMenu';
import PageRouter from './PageRouter';

export const MainPageLayout = observer(() => {
  const pageLayoutStore = layoutStore;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* <div> */}
      <GlobalStyles
        styles={{
          // body: { backgroundColor: 'darkslategray' },
          body: { margin: '0px' },
        }}
      />
      <div>
        11
        {pageLayoutStore.menuOpen}
      </div>
      <Header />
      <Grid container style={{ height: '100%', flexWrap: 'nowrap' }}>
        <Grid item xs={2} style={{ minWidth: '240px', flexShrink: 0 }}>
          <LeftMenu />
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
  );
});
