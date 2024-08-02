import axiosWithConfig from "./axios-with-config";
import { IGetExcel } from "../types/excel";
import { IResponse } from "../types/api";

export const getExcelDepositAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/excel?limit=100&table=deposit&is_verif=true&is_admin=true");
    return response.data as IResponse<IGetExcel>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getExcelDepositUser = async () => {
  try {
    const response = await axiosWithConfig.get("/excel?limit=100&table=deposit&is_verif=true&is_admin=false");
    return response.data as IResponse<IGetExcel>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getExcelRewardAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/excel?limit=100&table=reward&is_verif=true&is_admin=true");
    return response.data as IResponse<IGetExcel>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getExcelRewardtUser = async () => {
  try {
    const response = await axiosWithConfig.get("/excel?limit=100&table=reward&is_verif=true&is_admin=false");
    return response.data as IResponse<IGetExcel>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};