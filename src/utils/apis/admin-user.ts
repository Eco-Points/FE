import { dashboardType } from "../types/admin";
import { ProfileType, getUsersType } from "../types/users";
import axiosWithConfig from "./axios-with-config";

export const getUsers = async (): Promise<getUsersType[]> => {
  try {
    const response = await axiosWithConfig.get("/dashboard/users");
    console.log("API response data:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getDashboard = async (): Promise<dashboardType> => {
  try {
    const response = await axiosWithConfig.get("/dashboard");
    console.log("API response dashboard:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw new Error(message);
  }
};

export const editUserStatus = async (userId: number, status: string) => {
  try {
    const response = await axiosWithConfig.put(`/dashboard/users/${userId}`, {
      user_id: userId,
      status: status,
    });
    console.log("API response status update:", response.data);
    return response.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const getUserById = async (userId: number): Promise<ProfileType> => {
  try {
    const response = await axiosWithConfig.get(`/dashboard/users/${userId}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
