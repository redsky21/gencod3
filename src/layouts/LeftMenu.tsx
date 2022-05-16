import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { Link } from 'react-router-dom';

export const LeftMenu = () => {
  const menuLink = () => {
    return (
      <Link to="/Home" style={{ textDecoration: 'none', display: 'block' }}>
        gggg
      </Link>
    );
  };
  return (
    <Paper sx={{ borderRadius: '0', height: '100%', minWidth: '100%' }}>
      <MenuList>
        <Link to="/GenPage" style={{ textDecoration: 'none', display: 'block', color: 'wheat' }}>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Generate</ListItemText>
          </MenuItem>
        </Link>
        <Link
          to="/gerp/TepGenMasterInfo"
          style={{ textDecoration: 'none', display: 'block', color: 'rgb(144 255 168)' }}
        >
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>TepGenMasterInfo</ListItemText>
          </MenuItem>
        </Link>
        <Link
          to="/gerp/TepGenMasterInfoList"
          style={{ textDecoration: 'none', display: 'block', color: 'rgb(144 255 168)' }}
        >
          <MenuItem>
            <ListItemText>TepGenMasterInfoList</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>History</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Template</ListItemText>
        </MenuItem>

        {/* <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem> */}
      </MenuList>
    </Paper>
  );
};
