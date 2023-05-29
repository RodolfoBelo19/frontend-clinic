import { api } from "../../infra/axios";
import { IAccessLogTrackers } from "../../interfaces/IAccessLogTrackers";

export const handleAccessLogTrackers = async ({ data, url }: IAccessLogTrackers) => {
  const response = await api.post(url, data);
  return response;
};