import axiosWithConfig from "./axios-with-config";
import { IReward } from "@/utils/types/rewards";

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
