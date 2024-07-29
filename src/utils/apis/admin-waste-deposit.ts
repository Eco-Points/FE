import { IGetDeposit } from "../types/admin-waste-deposit";
import axiosWithConfig from "./axios-with-config";
import { IResponse } from "../types/api";

export const getDeposit = async () => {
  try {
    const response = await axiosWithConfig.get("/deposit");
    return response.data as IResponse<IGetDeposit[]>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
