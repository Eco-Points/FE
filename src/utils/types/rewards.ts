import { z } from "zod";
import { MAX_MB, MAX_UPLOAD_SIZE, ACCEPTED_IMAGE_TYPES } from "@/utils/const";

export interface IReward {
  reward_id: number;
  name: string;
  description: string;
  image: string;
  point_required: number;
  stock: number;
}

export interface detailRewardsType {
  reward_id: string;
  name: string;
  description: string;
  image: string;
  point_required: number;
  stock: number;
}

export interface exchangeRewards {
  reward_id: number;
}

export const addRewardSchema = z.object({
  name: z.string().min(1, { message: "Nama hadiah wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi hadiah wajib diisi" }),
  image: z
    .instanceof(File)
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, `Max Image size is ${MAX_MB} MB`)
    .refine((file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type), "File type not supported"),
  point_required: z.coerce.number().min(1, { message: "Poin hadiah wajib diisi" }),
  stock: z.coerce.number().min(1, { message: "Stok hadiah wajib diisi" }),
});

export type AddRewardSchema = z.infer<typeof addRewardSchema>;

export const editRewardSchema = z.object({
  name: z.string().min(1, { message: "Nama hadiah wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi hadiah wajib diisi" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, `Max Image size is ${MAX_MB} MB`)
    .refine((file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type), "File type not supported"),
  point_required: z.coerce.number().min(1, { message: "Poin hadiah wajib diisi" }),
  stock: z.coerce.number().min(1, { message: "Stok hadiah wajib diisi" }),
});

export type EditRewardSchema = z.infer<typeof editRewardSchema>;