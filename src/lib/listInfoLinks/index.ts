import { api } from "../../infra/axios";

export const listInfoLinks = async () => {
  const response = await api.get('/access-log-tracker');
  return response.data.data;
}