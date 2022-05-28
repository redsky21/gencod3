import {
  CellContextMenuEvent,
  CellDoubleClickedEvent,
  CellFocusedEvent,
  CellKeyDownEvent,
  CellKeyPressEvent,
  CellPosition,
  CheckboxSelectionCallbackParams,
  ColDef,
  FullWidthCellKeyDownEvent,
  FullWidthCellKeyPressEvent,
  GridOptions,
  HeaderCheckboxSelectionCallbackParams,
  RowClickedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import _merge from 'lodash/merge';
import _isEqual from 'lodash/isEqual';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import ContextMenu, { TContextMenu } from '@/components/context-menu';
import { ContentCopy, ContentPaste } from '@mui/icons-material';
import { MenuList, MenuItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import copy from 'copy-to-clipboard';
import useHandleOutside from '@/hooks/useHandleOutside';

type TBaseGridProps<T> = {
  columnDefs: ColDef[];
  rowData: Array<T>;
  onGridReady?: any;
  gridOptions?: GridOptions;
  selectMultiple?: boolean;
  onSelectChange?: (selectedRows: T[]) => void;
  onSetRowData?: React.Dispatch<React.SetStateAction<T[]>>;
  fromJson?: (model: T, omit?: string[]) => T;
  fromJsonOmit?: string[];
};

function isFirstColumn(params: CheckboxSelectionCallbackParams | HeaderCheckboxSelectionCallbackParams) {
  const displayedColumns = params.columnApi.getAllDisplayedColumns();
  const thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

function BaseGrid<T = any>(props: TBaseGridProps<T>): JSX.Element {
  const {
    rowData,
    columnDefs,
    onGridReady,
    gridOptions,
    selectMultiple = false,
    onSelectChange,
    onSetRowData,
    fromJson,
    fromJsonOmit = [],
  } = props;
  const [contextMenu, setContextMenu] = useState<TContextMenu | null>(null);
  const [ctxRowIndex, setCtxRowIndex] = useState<number | null>(null);
  const [rowClickIndex, setRowClickIndex] = useState<number | null>(null);
  const [cellDbClick, setCelDbClick] = useState<boolean>(false);
  const [cellFocus, setCellFocus] = useState<CellPosition | null>(null);
  const gridRefContainer = useRef(null);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      headerCheckboxSelection: isFirstColumn,
      checkboxSelection: isFirstColumn,
    };
  }, []);

  const onSelectionChanged = () => {
    const selectRows = finalGridOptions.api?.getSelectedRows();
    onSelectChange && onSelectChange(selectRows as T[]);
  };

  const finalGridOptions = useMemo<GridOptions>(() => {
    return _merge(
      {
        animateRows: true,
        defaultColDef,
        rowSelection: selectMultiple ? 'single' : 'multiple',
        onSelectionChanged: onSelectionChanged,
        enableRangeSelection: true,
        suppressMultiRangeSelection: true,
        allowContextMenuWithControlKey: true,
      } as GridOptions,
      gridOptions,
    );
  }, []);

  useEffect(() => {
    document.addEventListener('paste', handlePressPaste);
    document.addEventListener('copy', handlePressCopy);

    return () => {
      document.removeEventListener('paste', handlePressPaste);
      document.removeEventListener('copy', handlePressCopy);
    };
  }, [rowClickIndex]);

  useHandleOutside<any>(gridRefContainer, () => {
    setRowClickIndex(null);
  });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('handleContextMenu');
    if (contextMenu !== null) {
      handleCloseContextMenu();
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
    setCtxRowIndex(null);
  };

  const onRowClicked = (event: RowClickedEvent) => {
    setRowClickIndex(event.rowIndex);
  };

  const onCellContextMenu = (event: CellContextMenuEvent) => {
    console.log('onCellContextMenu', event);
    event.node.setSelected(true, true);
    setCtxRowIndex(event.rowIndex);

    setContextMenu(
      contextMenu === null
        ? {
            xPos: (event.event as PointerEvent)?.clientX + 2,
            yPos: (event.event as PointerEvent)?.clientY - 6,
          }
        : null,
    );
  };

  const handleClickCopy = () => {
    if (ctxRowIndex === null) {
      return;
    }
    const selectedRows = rowData[ctxRowIndex] as any;

    copy(JSON.stringify(selectedRows) || '', {
      debug: false,
    });
    handleCloseContextMenu();
  };

  const handleClickPaste = async () => {
    //code
    if (ctxRowIndex === null) {
      return;
    }

    const text = await navigator.clipboard.readText();

    onPasteData(text, ctxRowIndex);

    handleCloseContextMenu();
  };

  const handlePressPaste = async (event: ClipboardEvent) => {
    if (rowClickIndex === null || rowClickIndex < 0 || cellFocus !== null) {
      return;
    }

    event.preventDefault();

    let text;
    if (navigator.clipboard) {
      text = await navigator.clipboard.readText();
    } else {
      text = event.clipboardData && event.clipboardData.getData('text/plain');
    }

    if (text === null) {
      return;
    }

    onPasteData(text, rowClickIndex);
  };

  const handlePressCopy = (event: ClipboardEvent) => {
    // console.log('handlePressCopy', event);

    if (rowClickIndex === null || rowClickIndex < 0 || rowData.length <= 0) {
      return;
    }

    if (window.getSelection()?.type === 'Range') {
      return;
    }

    event.preventDefault();

    const data = JSON.stringify(rowData[rowClickIndex]);
    copy(data || '', {
      debug: false,
    });
  };

  const onPasteData = (text: string, index: number) => {
    let model: T | null = null;
    try {
      model = (fromJson && fromJson(JSON.parse(text), fromJsonOmit)) || null;
    } catch (error) {
      console.error('Error Paste Function:', error);
    }

    if (model === null) {
      return;
    }
    const nextRowData = [...rowData];
    nextRowData[index] = _merge(model, { id: ctxRowIndex });
    onSetRowData && onSetRowData(nextRowData);
  };

  const onCellFocused = (event: CellFocusedEvent) => {
    // console.log('onCellFocused', cellFocus);
    const focusCellPos = event.api.getFocusedCell();

    if (cellDbClick) {
      setCellFocus(focusCellPos);
      setCelDbClick(false);
      return;
    }

    setCellFocus(null);
  };

  const onCellDoubleClicked = (event: CellDoubleClickedEvent) => {
    // console.log('onCellDoubleClicked', event);
    setCelDbClick(true);
  };

  return (
    <div
      id="grid_table"
      ref={gridRefContainer}
      onContextMenu={handleContextMenu}
      className="ag-theme-alpine-dark"
      style={{ height: '100%', width: '100%' }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        gridOptions={finalGridOptions}
        onCellContextMenu={onCellContextMenu}
        onRowClicked={onRowClicked}
        onCellFocused={onCellFocused}
        onCellDoubleClicked={onCellDoubleClicked}
      ></AgGridReact>
      <ContextMenu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        xPos={contextMenu?.xPos || 0}
        yPos={contextMenu?.yPos || 0}
      >
        <MenuList>
          <MenuItem onClick={handleClickCopy}>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘C
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClickPaste}>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>
        </MenuList>
      </ContextMenu>
    </div>
  );
}

export default BaseGrid;
