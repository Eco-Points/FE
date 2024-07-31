import axiosWithConfig from "./axios-with-config";

export const addLocation = async (data: FormData) => {
  try {
    const response = await axiosWithConfig.post("/location", data);
    return response.data;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
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
