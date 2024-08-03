import { iReportDeposit, iReportReward, iResponeReportDeposit, iResponeReportReward } from "../types/report";
import axiosWithConfig from "./axios-with-config";

export const fetchDeposit = async (params: iReportDeposit): Promise<iResponeReportDeposit> => {
  try {
    const response = await axiosWithConfig.get("/dashboard/depositstat", { params });
    console.log("Deposit response line chart:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching deposit:", error);
    throw error;
  }
};

export const fetchReward = async (params: iReportReward): Promise<iResponeReportReward> => {
  try {
    const response = await axiosWithConfig.get("/dashboard/rewardstat", { params });
    console.log("Reward response line chart:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching reward:", error);
    throw error;
  }
};
