export interface IResponse<T> {
  code: number;
  message: string;
  status: string;
  data: T;
}
