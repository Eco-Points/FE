import { z } from "zod";
import { MAX_MB, MAX_UPLOAD_SIZE, ACCEPTED_IMAGE_TYPES } from "@/const";

export const editProfileSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z.string().min(1, { message: "Email is Required" }).email({ message: "Invalid Email" }),
  phone: z.string().min(1, { message: "Phone number is Required" }),
  address: z.string().min(1, { message: "Addres is Invalid" }),
  password: z.string().min(6, "Password harus memiliki minimal 6 karakter"),
  profile_picture: z
    .instanceof(File)
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, `Max Image size is ${MAX_MB} MB`)
    .refine((file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, and .png format are supported"),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;

export interface EditProfileType {
  fullname: string;
  email: string;
  password?: string;
  phone_number: number;
  address: string;
  message?: string;
  profile_picture: FileList;
}

export interface ProfileType {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  image_url: string;
  is_admin: boolean;
  point: number;
}
