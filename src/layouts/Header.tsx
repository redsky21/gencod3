import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { layoutStore } from './LayoutStore';

export const Header = () => {
  const pageLayoutStore = layoutStore;
  const handleClickAppbarIcon = () => {
    pageLayoutStore.menuOpen = !pageLayoutStore.menuOpen;
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClickAppbarIcon}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Code Gen
          </Typography>
          <Button color="inherit">v1.0</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
