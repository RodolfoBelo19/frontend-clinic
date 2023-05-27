export interface IHandleSubmit {
  data: IData;
  url: string;
  id?: string;
}

interface IData {
  url: string;
  slug: string;
}