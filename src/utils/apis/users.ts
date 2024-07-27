import axiosWithConfig from "./axios-with-config";
import { ProfileType } from "../types/users";
import { IResponse } from "../types/api";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get("/user");
    return response.data as IResponse<ProfileType>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};