import { DepositSchema, IGetDeposit } from "../types/admin-waste-deposit";
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

export const getDepositAdmin = async () => {
  try {
    const response = await axiosWithConfig.get("/deposit?limit=20&offset=0&is_admin=true");
    return response.data as IResponse<IGetDeposit[]>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getDepositById = async (deposit_id: number) => {
  try {
    const response = await axiosWithConfig.get(`/deposit/${deposit_id}`);
    return response.data as IResponse<IGetDeposit>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export async function updateDepositStatus(waste_id: number, status: string) {
  try {
    const response = await axiosWithConfig.put(`/deposit`, { waste_id, status });
    return response.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
}

export async function createDeposit(data: DepositSchema) {
  try {
    const response = await axiosWithConfig.post("/deposit", data);
    return response.data
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
}