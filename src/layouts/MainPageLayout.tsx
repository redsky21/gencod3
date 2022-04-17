import Hello from '@/pages/Hello';
import { Collapse, GlobalStyles, Grid, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './Header';
import { layoutStore } from './LayoutStore';
import { LeftMenu } from './LeftMenu';
import PageRouter from './PageRouter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      height: '100%',
    },
  }),
);

export const MainPageLayout = observer(() => {
  const pageLayoutStore = layoutStore;
  const classes = useStyles() as any;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* <div> */}
      <GlobalStyles
        styles={{
          // body: { backgroundColor: 'darkslategray' },
          body: { margin: '0px' },
        }}
      />

      <Header />
      <Grid container style={{ height: '100%', flexWrap: 'nowrap' }}>
        <Grid item xs={pageLayoutStore.menuOpen ? 2 : 0} style={{ minWidth: 'fit-content' }}>
          <Collapse
            in={pageLayoutStore.menuOpen}
            // style={{ width: '100%' }}
            sx={{ height: '100%' }}
            timeout="auto"
            unmountOnExit
            // className={clsx({
            //   'MuiCollapse-wrapper': 'height:"100%"',
            // })}
            orientation="horizontal"
          >
            <LeftMenu />
          </Collapse>
        </Grid>
        <Grid item xs={pageLayoutStore.menuOpen ? 12 : 14}>
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
