import { IResponse } from "../types/api";
import axiosWithConfig from "./axios-with-config";
import { IReward, detailRewardsType } from "@/utils/types/rewards";

interface RewardsResponse {
  data: IReward[];
  code: number;
  status: string;
  message: string;
  meta: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
}

export const getAllRewards = async (page: number, itemsPerPage: number = 4): Promise<RewardsResponse> => {
  try {
    const response = await axiosWithConfig.get(`/reward?page=${page}&itemsPerPage=${itemsPerPage}`);
    console.log("Rewards response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rewards:", error);
    throw error;
  }
};

export const detailRewards = async (reward_id: number): Promise<detailRewardsType> => {
  try {
    const response = await axiosWithConfig.get(`/reward/${reward_id}`);
    console.log("Rewards response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rewards:", error);
    throw error;
  }
};

export const exchangeRewards = async (reward_id: number) => {
  try {
    const response = await axiosWithConfig.post(`/exchange/${reward_id}`);
    console.log("Rewards response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rewards:", error);
    throw error;
  }
};

export const getRewards = async () => {
  try {
    const response = await axiosWithConfig.get(`/reward`);
    return response.data as IResponse<IReward[]>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
