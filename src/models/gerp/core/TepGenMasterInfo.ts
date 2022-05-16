import _merge from 'lodash/merge';

export interface ITepGenMasterInfo {
  id?: string | null;
  rowKey?: string | null;
  masterSeq?: number | null;
  packageNo: number | null;
  packageName: string | null;
  methodType: string | null;
  tableName: string | null;
  methodName: string | null;
  sqlStmt: string | null;
  voName: string | null;
  controllerYn: 'Y' | 'N' | null;
  serviceYn: 'Y' | 'N' | null;
  initYn: 'Y' | 'N' | null;
  initOrderSeq: number | null;
  lookupType: string | null;
  controllerMethodName: string | null;
  controllerDatasetMethodSeq: number | null;
  controllerSaveMethodName: string | null;
  controllerSaveMethodSeq: number | null;
}

export default class TepGenMasterInfoModel {
  public static defaultValues = {
    packageNo: null,
    packageName: null,
    methodType: null,
    tableName: null,
    methodName: null,
    sqlStmt: null,
    voName: null,
    controllerYn: null,
    serviceYn: null,
    initYn: null,
    initOrderSeq: null,
    lookupType: null,
    controllerMethodName: null,
    controllerDatasetMethodSeq: null,
    controllerSaveMethodName: null,
    controllerSaveMethodSeq: null,
  };

  public static fromJson(model: ITepGenMasterInfo): ITepGenMasterInfo {
    return _merge({ ...TepGenMasterInfoModel.defaultValues }, { id: model.rowKey }, { ...model });
  }
}
