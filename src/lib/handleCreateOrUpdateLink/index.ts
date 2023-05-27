import { api } from '../../infra/axios';
import { IHandleSubmit } from '../../interfaces/IHandleSubmit';

export const handleCreateOrUpdateLink = async ({ data, url, id }: IHandleSubmit) => {
  if (id) {
    const response = await api.patch(url, data);
    return response;
  }
  const response = await api.post(url, data);
  return response;
};