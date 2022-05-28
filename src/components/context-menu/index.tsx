import React from 'react';
import _merge from 'lodash/merge';
import { Box } from '@mui/system';
import { Menu } from '@mui/material';

export type TContextMenu = {
  xPos: number;
  yPos: number;
};

type TContextMenuProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
} & TContextMenu;

export default function ContextMenu(props: TContextMenuProps): JSX.Element {
  const { xPos, yPos, children, open, onClose } = props;

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={open ? { top: yPos, left: xPos } : undefined}
    >
      {children}
    </Menu>
  );
}
