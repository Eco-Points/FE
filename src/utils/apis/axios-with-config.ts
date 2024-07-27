import axios from "axios";

const axiosWithConfig = axios.create();
let bearerToken = "";

export const setAxiosConfig = (token: string) => {
  bearerToken = token;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "https://virtserver.swaggerhub.com/TNLKFANS/EchoPoint/1.0.0";

  if (bearerToken !== "") {
    axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;
  }

  return axiosConfig;
});

export default axiosWithConfig;
