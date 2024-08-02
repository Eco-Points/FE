import axios from "axios";
import axiosWithConfig from "./axios-with-config";

export const fetchDepositReport = async (params: { trash_id: number; location_id: number; start_date: string; end_date: string }) => {
  const { trash_id, location_id, start_date, end_date } = params;
  try {
    const response = await axiosWithConfig.get(`/dashboard/depositstat`, {
      params: { trash_id, location_id, start_date, end_date },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching deposit report:", error);
    if (axios.isAxiosError(error)) {
      console.error("Error details:", error.response?.data);
    }
    throw error;
  }
};

export const fetchRewardReport = async (params: { start_date: string; end_date: string }) => {
  const { start_date, end_date } = params;
  const response = await axiosWithConfig.get(`/dashboard/rewardstat`, {
    params: { start_date, end_date },
  });
  return response.data;
};
