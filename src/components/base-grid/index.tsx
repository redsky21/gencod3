import { ColDef, GridOptions } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react';
import _merge from 'lodash/merge';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

type TBaseGridProps<T> = {
  columnDefs: ColDef[];
  rowData: Array<T>;
  onGridReady?: any;
  gridOptions?: GridOptions;
  selectMultiple?: boolean;
  onSelectChange?: (selectedRows: T[]) => void;
};

function BaseGrid<T = any>(props: TBaseGridProps<T>): JSX.Element {
  const { rowData, columnDefs, onGridReady, gridOptions, selectMultiple = false, onSelectChange } = props;

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
    };
  }, [true]);

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
      } as GridOptions,
      gridOptions,
    );
  }, []);

  return (
    <>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        gridOptions={finalGridOptions}
      ></AgGridReact>
    </>
  );
}

export default BaseGrid;
