import type { ApiConfigType } from '../../types/apiConfigType';

export const myProfileApiConfig: ApiConfigType = {
  path: '/users/me',
  method: 'GET',
  protected: true,
};
