import { ILogin, LoginSchema } from "../types/auth";
import axiosWithConfig from "./axios-with-config";
import { IResponse } from "@/utils/types/api";

export const userLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post("/login", body);
    return response.data as IResponse<ILogin>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};