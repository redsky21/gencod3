import 'ag-grid-enterprise';
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  GridOptions,
  HeaderCheckboxSelectionCallbackParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo, useRef } from 'react';
import _merge from 'lodash/merge';
import _isEqual from 'lodash/isEqual';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

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
        onSelectionChanged: onSelectionChanged,
        enableRangeSelection: true,
        suppressMultiRangeSelection: true,
        allowContextMenuWithControlKey: true,
      } as GridOptions,
      gridOptions,
    );
  }, []);

  return (
    <div
      id="grid_table"
      ref={gridRefContainer}
      className="ag-theme-alpine-dark"
      style={{ height: '100%', width: '100%' }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        gridOptions={finalGridOptions}
      ></AgGridReact>
    </div>
  );
}

export default BaseGrid;
