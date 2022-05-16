import { ITepGenMasterInfo } from '@/models/gerp/core/TepGenMasterInfo';
import Client from '@/common/axios-common';
import { TBaseResponse } from '@/services';

class GenerateService {
  public static endpoint = '/gerp/gen-masters';

  public static getAll = function (): TBaseResponse<Array<ITepGenMasterInfo>> {
    return Client.get<Array<ITepGenMasterInfo>>(GenerateService.endpoint);
  };

  public static createListOfTepGenMasterInfo = function (
    params: Array<ITepGenMasterInfo>,
  ): TBaseResponse<any> {
    return Client.post(GenerateService.endpoint, params);
  };
}

export default GenerateService;
