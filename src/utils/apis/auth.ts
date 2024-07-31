import { ILogin, LoginSchema, RegisterSchema } from "../types/auth";
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

export const userRegister = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post("/register", body);
    return response.data as IResponse<undefined>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
