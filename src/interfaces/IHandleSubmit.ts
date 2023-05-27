export interface IHandleSubmit {
  data: IData;
  url: string;
}

interface IData {
  url: string;
  slug: string;
}