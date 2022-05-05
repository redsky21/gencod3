import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { TextField } from '@mui/material';

const GenPage = () => {
  const [rowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ]);

  const [columnDefs] = useState([{ field: 'make' }, { field: 'model' }, { field: 'price' }]);

  return (
    <div>
      <TextField label="test1123">test</TextField>
      <div className="ag-theme-alpine-dark" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
    </div>
  );
};
export default GenPage;
