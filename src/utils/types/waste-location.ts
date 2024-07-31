import * as z from "zod";

export const addLocationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  long: z.string().min(1, "Longitude is required"),
  lat: z.string().min(1, "Latitude is required"),
  status: z.string().min(1, "Status is required"),
  start: z.string().min(1, "Start time is required"),
  end: z.string().min(1, "End time is required"),
  phone: z.string().min(1, "Phone number is required"),
});

export interface LocationFormData {
  address: string;
  long: string;
  lat: string;
  status: string;
  start: string;
  end: string;
  phone: string;
}
export interface IGetLocation {
  address: string;
  long: string;
  lat: string;
  status: string;
  start: string;
  end: string;
  contact_info: string;
  name: string;
  id: number;
}
