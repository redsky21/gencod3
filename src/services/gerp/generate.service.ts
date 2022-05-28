import { ITepGenMasterInfo } from '@/models/gerp/core/TepGenMasterInfo';
import Client from '@/common/axios-common';
import { TBaseResponse } from '@/services';

class GenerateService {
  public static endpoint = '/gerp/gen-masters';

  public static getAll = function (): TBaseResponse<Array<ITepGenMasterInfo>> {
    return Client.get<Array<ITepGenMasterInfo>>(GenerateService.endpoint);
  };

  public static createListOfTepGenMasterInfo = function <T = any>(
    params: Array<ITepGenMasterInfo>,
  ): TBaseResponse<T> {
    return Client.post(GenerateService.endpoint, params);
  };

  public static deleteListOfTepGenMasterInfo = function <T = any>(
    params: Array<number | null | undefined>,
  ): TBaseResponse<T> {
    return Client.delete(GenerateService.endpoint, {
      headers: {},
      data: params,
    });
  };

  public static getEOStringAsZip = function <T = any>(param: ITepGenMasterInfo): TBaseResponse<T> {
    return Client.post('/gerp/gen/getEoStringAsZip', param, {
      responseType: 'blob',
    });
  };
}

export default GenerateService;
