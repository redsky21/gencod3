import { TBaseResponse } from '@/services';
import { AxiosResponse } from 'axios';

type TRequest<S, E> = {
  pending?: () => void;
  success?: (data: S, response: AxiosResponse<S, any>) => void;
  failure?: (exception?: E) => void;
  finally?: () => void;
};

export default function request<S, E = undefined>(
  service: TBaseResponse<S> | undefined,
  resolve: TRequest<S, E>,
) {
  if (service) {
    resolve?.pending?.call({});
    service
      .then((response) => {
        if (response.status >= 200 || response.status <= 266) {
          resolve?.success?.call({}, response.data as S, response);
        } else {
          throw Error('Request fail');
        }
      })
      .catch((exception) => {
        resolve?.failure?.call({}, exception as E);
      })
      .finally(() => {
        resolve?.finally?.call({});
      });
  }
}
