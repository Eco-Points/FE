import { ProfileType, getUsersType } from "../types/users";
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

export const editUserStatus = async (userId: number, status: string) => {
  try {
    const response = await axiosWithConfig.put("/information_users", {
      user_id: userId,
      status: status,
    });
    return response.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getDashboard = async () => {
  try {
    const response = await axiosWithConfig.get("/dashboard");
    console.log("API response:", response.data);
    return response.data.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getUserById = async (userId: number): Promise<ProfileType> => {
  try {
    const response = await axiosWithConfig.get(`/information_users/${userId}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
