import axiosWithConfig from "./axios-with-config";
import { EditProfileType, ProfileType } from "../types/users";
import { IResponse } from "../types/api";
import { EditProfileSchema } from "../types/users";
import { checkProperty, valueFormatData } from "@/utils/function";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get("/users");
    return response.data as IResponse<ProfileType>;
  } catch (error: any) {
    const { message } = error.response.data;
    throw Error(message);
  }
};

export const editProfile = async (body: EditProfileSchema): Promise<EditProfileType> => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }
    console.log("FormData: ", formData); // Add this line

    const response = await axiosWithConfig.put<EditProfileType>("/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const { message } = error.response.data;
      throw new Error(message);
    } else {
      throw new Error("Failed to update profile. Please try again later.");
    }
  }
};
