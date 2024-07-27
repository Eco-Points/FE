import { getUsersType } from "../types/users";
import axiosWithConfig from "./axios-with-config";

export const getUsers = async (): Promise<getUsersType[]> => {
  try {
    const response = await axiosWithConfig.get("/information_users");
    return response.data.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
