import { api } from '../../infra/axios';
import { IHandleSubmit } from '../../interfaces/IHandleSubmit';


export const handleSubmit = async ({ data, url }: IHandleSubmit) => {
  const response = await api.post(url, data);
  return response;
}