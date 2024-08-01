import axiosWithConfig from "./axios-with-config";
import { IGetExcel } from "../types/excel";
import { IResponse } from "../types/api";

export const getExcelAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/excel?limit=100&table=deposit&is_admin=true");
    return response.data as IResponse<IGetExcel>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getExcelUser = async () => {
  try {
    const response = await axiosWithConfig.get("/excel?limit=100&table=deposit&is_admin=false");
    return response.data as IResponse<IGetExcel>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};