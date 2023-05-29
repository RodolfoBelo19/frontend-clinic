export interface IAccessLogTrackers {
  data: IData;
  url: string;
}

interface IData {
  link_id: string;
  ip_address: string;
  user_agent: string;
}

