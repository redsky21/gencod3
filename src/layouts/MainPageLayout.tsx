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
    displayBlock: {
      display: 'block',
      width: '100% !important',
    },
  }),
);

export const MainPageLayout = observer(() => {
  const pageLayoutStore = layoutStore;
  const classes = useStyles() as any;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
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
            sx={{ width: '100%', height: '100%' }}
            timeout="auto"
            unmountOnExit
            // className={clsx({
            //   'MuiCollapse-wrapper': 'display:"block"',
            // })}
            // classes={{ 'MuiCollapse-wrapperInner': 'display:block' }}
            classes={{ wrapperInner: classes.displayBlock }}
            orientation="horizontal"
          >
            <LeftMenu />
          </Collapse>
        </Grid>
        <Grid item xs={pageLayoutStore.menuOpen ? 12 : 14}>
          <div
            style={{
              backgroundColor: '#3b3939',
              color: 'white',
              height: '100%',
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
