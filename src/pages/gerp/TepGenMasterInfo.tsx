import { useCallback, useEffect, useMemo, useState } from 'react';

import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Button, Box, Modal, CircularProgress } from '@mui/material';

import TepGenMasterInfoModel, { ITepGenMasterInfo } from '@/models/gerp/core/TepGenMasterInfo';
import GenerateService from '@/services/gerp/generate.service';
import BaseGrid from '@/components/base-grid';
import request from '@/common/request';
import _isNil from 'lodash/isNil';
import fileSaver from 'file-saver';

const TepGenMasterInfo = () => {
  const [selectedRows, setSelectedRows] = useState<Array<ITepGenMasterInfo>>([]);
  const [rowsAdd, setRowsAdd] = useState<Array<ITepGenMasterInfo>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>();
  const [isEOAsZipLoading, setIsEOAsZipLoading] = useState(false);

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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#ffffff',
    border: '1px solid #000',
    borderRadius: '4px',
    boxShadow: 24,
    p: 2,
  };

  useEffect(() => {
    if (!openModal) {
      setModalMessage(undefined);
    }
  }, [openModal]);

  const handleOpenModal = (message: string) => {
    setOpenModal(true);
    setModalMessage(message);
  };

  const handleAddRow = () => {
    const nextRow = [...rowsAdd];
    nextRow.push({ id: rowsAdd.length.toString(), ...TepGenMasterInfoModel.defaultValues });
    setRowsAdd(nextRow);

    // clear sorting
    // clear filter
    gridOptions.columnApi?.applyColumnState({
      defaultState: { sort: null },
    });
  };

  const handleSubmitForm = () => {
    request<string>(GenerateService.createListOfTepGenMasterInfo(rowsAdd), {
      success() {
        handleOpenModal('Save SuccessFully');
      },
      failure(error: any) {
        console.log('TepGenMasterInfo::createListOfTepGenMasterInfo', error);
        handleOpenModal(error?.message);
      },
      finally() {
        // reload grid
        handleGetAll();
      },
    });
  };

  const handleDeleteRows = () => {
    if (selectedRows.length <= 0) return;

    request<string>(
      GenerateService.deleteListOfTepGenMasterInfo<string>(
        selectedRows.map((item) => item.masterSeq).filter((item) => !_isNil(item)),
      ),
      {
        success() {
          handleOpenModal('Deleted Successfully');
        },
        failure(error: any) {
          console.log('TepGenMasterInfo::deleteListOfTepGenMasterInfo', error);
          handleOpenModal(error?.message);
        },
        finally() {
          // reload grid
          handleGetAll();
          setSelectedRows([]);
        },
      },
    );
  };

  const handleGetAll = () => {
    request<Array<ITepGenMasterInfo>>(GenerateService.getAll(), {
      pending() {
        setRowsAdd([]);
      },
      success(data) {
        setRowsAdd(data.map((item) => TepGenMasterInfoModel.fromJson(item)));
      },
      failure(error: any) {
        console.log('TepGenMasterInfo::getAll', error);
        handleOpenModal(error?.message);
      },
    });
  };

  const handleGenerate = () => {
    if (selectedRows.length <= 0) return;
    if (selectedRows.length > 1) {
      handleOpenModal('Please select only one record');
      return;
    }

    request(GenerateService.getEOStringAsZip(selectedRows[0]), {
      pending() {
        setIsEOAsZipLoading(true);
      },
      success(data, response) {
        const blob = new Blob([data], { type: 'application/zip' });
        fileSaver.saveAs(blob, 'generate.zip');
      },
      failure(error: any) {
        console.log('TepGenMasterInfo::getEOStringAsZip', error);
        handleOpenModal(error?.message);
      },
      finally() {
        setIsEOAsZipLoading(false);
      },
    });
  };

  const onSelectChange = (data: ITepGenMasterInfo[]) => {
    setSelectedRows(data);
  };

  const onGridReady = useCallback((params: GridReadyEvent) => {
    handleGetAll();
  }, []);

  return (
    <>
      <Box>
        <Box display="flex" justifyContent="flex-end" style={{ padding: '8px', columnGap: '8px' }}>
          <Button color="success" variant="contained" onClick={handleGetAll}>
            Get all
          </Button>
          <Button color="success" variant="contained" onClick={handleAddRow}>
            Add Row
          </Button>
          <Button color="success" variant="contained" onClick={handleSubmitForm}>
            Save
          </Button>
          <Button color="success" variant="contained" onClick={handleDeleteRows}>
            Delete
          </Button>
          <Button variant="contained" color="success" onClick={handleGenerate}>
            {isEOAsZipLoading ? <CircularProgress color="inherit" size={24} /> : 'Generate'}
          </Button>
        </Box>
        <div style={{ height: 450, width: '100%' }}>
          <BaseGrid<ITepGenMasterInfo>
            rowData={rowsAdd}
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            onSelectChange={onSelectChange}
            onSetRowData={setRowsAdd}
            fromJson={TepGenMasterInfoModel.fromJson}
            fromJsonOmit={['masterSeq']}
            onGridReady={onGridReady}
          />
        </div>
      </Box>
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box>{modalMessage}</Box>
            <Box display="flex" justifyContent="flex-end">
              <Button color="info" onClick={() => setOpenModal(false)}>
                OK
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
export default TepGenMasterInfo;
