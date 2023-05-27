import { api } from "../../infra/axios"

export const listLinks = async () => {
  const response = await api.get('/link');
  return response.data.data;
}
