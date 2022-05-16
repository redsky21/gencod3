import { useCallback, useMemo, useState } from 'react';

import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Button, Box } from '@mui/material';

import TepGenMasterInfoModel, { ITepGenMasterInfo } from '@/models/gerp/core/TepGenMasterInfo';
import GenerateService from '@/services/gerp/generate.service';
import BaseGrid from '@/components/base-grid';

const TepGenMasterInfoList = () => {
  const [rowData, setRowData] = useState<Array<ITepGenMasterInfo>>([]);

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
        editable: false,
      },
    }),
    [],
  );

  const onGridReady = useCallback((params: GridReadyEvent) => {
    handleShowList();
  }, []);

  const handleShowList = () => {
    console.log('handleShowList');
    setRowData([]);
    GenerateService.getAll()
      .then((res) => {
        const listOfTepGenMasterInfo = res.data;
        if (listOfTepGenMasterInfo !== null && listOfTepGenMasterInfo.length > 0) {
          // setRowData(listOfTepGenMasterInfo);
          setRowData(listOfTepGenMasterInfo.map((item) => TepGenMasterInfoModel.fromJson(item)));
        } else {
          setRowData([]);
        }
      })
      .catch((error) => {
        console.log('TepGenMasterInfo::GetAll', error);
      });
  };

  const onSelectChange = (data: ITepGenMasterInfo[]) => {
    console.log('data', data);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" style={{ padding: '8px' }}>
        <Button onClick={handleShowList} color="warning">
          Show list
        </Button>
      </Box>
      <div className="ag-theme-alpine-dark" style={{ height: 450, width: '100%' }}>
        <BaseGrid<ITepGenMasterInfo>
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={onGridReady}
          gridOptions={gridOptions}
          onSelectChange={onSelectChange}
        />
      </div>
    </Box>
  );
};
export default TepGenMasterInfoList;
