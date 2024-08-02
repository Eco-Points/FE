import axiosWithConfig from "./axios-with-config";
import { IExchange } from "../types/exchange";
import { IResponse } from "../types/api";

export const getExchangeAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/exchange?limit=100&is_admin=true");
    return response.data as IResponse<IExchange[]>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getExchangeUser = async () => {
  try {
    const response = await axiosWithConfig.get("/exchange?limit=100&is_admin=false");
    return response.data as IResponse<IExchange[]>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};