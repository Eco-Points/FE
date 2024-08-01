import { AddRewardSchema, EditRewardSchema, IReward, detailRewardsType } from "@/utils/types/rewards";
import { checkProperty, valueFormatData } from "../function";
import axiosWithConfig from "./axios-with-config";
import { IResponse } from "../types/api";

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
    console.log("Rewards response manggil all rewards:", response.data);
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
    return response.data.data;
  } catch (error) {
    console.error("Error fetching rewards:", error);
    throw error;
  }
};

export const exchangeRewards = async (reward_id: number) => {
  try {
    const response = await axiosWithConfig.post(`/exchange/`, { reward_id });
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

export const addReward = async (body: AddRewardSchema) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }
    const response = await axiosWithConfig.post(`/reward`, formData);
    return response.data as IResponse<IReward>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const updateReward = async (reward_id: number, body: EditRewardSchema) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }
    const response = await axiosWithConfig.put(`/reward/${reward_id}`, formData);
    return response.data as IResponse<IReward>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const deleteReward = async (reward_id: number) => {
  try {
    const response = await axiosWithConfig.delete(`/reward/${reward_id}`);
    return response.data as IResponse<IReward>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
