import { useCallback, useMemo, useState } from 'react';

import { ColDef, GridOptions } from 'ag-grid-community';
import { Button, Box } from '@mui/material';

import TepGenMasterInfoModel, { ITepGenMasterInfo } from '@/models/gerp/core/TepGenMasterInfo';
import GenerateService from '@/services/gerp/generate.service';
import BaseGrid from '@/components/base-grid';

const TepGenMasterInfo = () => {
  const [rowData, setRowData] = useState<Array<ITepGenMasterInfo>>([]);
  const [selectedRows, setSelectedRows] = useState<Array<ITepGenMasterInfo>>([]);

  const [columnDefs] = useState<ColDef[]>([
    { field: 'packageNo' },
    { field: 'packageName' },
    { field: 'methodType' },
    { field: 'tableName' },
    { field: 'methodName' },
    { field: 'sqlStmt' },
    { field: 'voName' },
    { field: 'controllerYn' },
    { field: 'serviceYn' },
    { field: 'initYn' },
    { field: 'initOrderSeq' },
    { field: 'lookupType' },
    { field: 'controllerMethodName' },
    { field: 'controllerDatasetMethodSeq' },
    { field: 'controllerSaveMethodName' },
    { field: 'controllerSaveMethodSeq' },
  ]);

  const gridOptions = useMemo<GridOptions>(
    () => ({
      defaultColDef: {
        editable: true,
      },
    }),
    [],
  );

  const handleAddRow = () => {
    console.log('handleAddNew');
    const nextRow = [...rowData];
    nextRow.push({ id: rowData.length.toString(), ...TepGenMasterInfoModel.defaultValues });
    setRowData(nextRow);
  };

  const handleSubmitForm = () => {
    console.log('submit', rowData);
    GenerateService.createListOfTepGenMasterInfo(rowData)
      .then((res) => {
        if (res.status === 200) {
          alert('Done');
        }

        // clear input
        setRowData([]);
      })
      .catch((error) => {
        console.log('TepGenMasterInfo::createListOfTepGenMasterInfo', error);
        alert(error.message);
      });
  };

  const handleDeleteRows = () => {
    console.log('selectedRows', selectedRows);
    if (selectedRows.length <= 0) return;
    const nextRowData = [...rowData];
    selectedRows.forEach((row) => {
      const index = nextRowData.findIndex((i) => i.id === row.id);
      nextRowData.splice(index, 1);
    });

    setRowData(nextRowData);
    setSelectedRows([]);
  };

  const onSelectChange = (data: ITepGenMasterInfo[]) => {
    setSelectedRows(data);
    console.log('onSelectChange', data);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" style={{ padding: '8px' }}>
        <Button onClick={handleAddRow}>Add Row</Button>
        <Button onClick={handleSubmitForm}>Save</Button>
        <Button onClick={handleDeleteRows}>Delete</Button>
        <Button>Generate</Button>
      </Box>
      <div className="ag-theme-alpine-dark" style={{ height: 450, width: '100%' }}>
        <BaseGrid<ITepGenMasterInfo>
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          onSelectChange={onSelectChange}
        />
      </div>
    </Box>
  );
};
export default TepGenMasterInfo;
