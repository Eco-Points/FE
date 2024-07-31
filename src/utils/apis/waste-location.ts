import { LocationFormData } from "../types/waste-location";
import axiosWithConfig from "./axios-with-config";

export const addLocation = async (data: LocationFormData) => {
  try {
    const response = await axiosWithConfig.post("/location", data, {
      headers: {
        "Content-Type": "application/json", // Set header Content-Type ke application/json
      },
    });
    return response.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw new Error(message);
  }
};

export const getlocation = async () => {
  try {
    const response = await axiosWithConfig.get("/location?limit=30");
    return response.data.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};
