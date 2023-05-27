import { api } from '../../infra/axios';

export const handleDeleteLink = async (id: string) => {
  const { data } = await api.delete(`/link/${id}`);
  return data;
}