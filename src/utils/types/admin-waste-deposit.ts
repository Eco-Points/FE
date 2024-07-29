import { z } from "zod";

export interface IGetDeposit {
  id: number;
  fullname: string;
  type: string;
  point: number;
  depotime: string;
  quantity: number;
  status: string;
}

export const depositSchema = z.object({
  trash_id: z.coerce.number().gte(1, { message: "ID sampah harus minimal 1" }),
  location_id: z.coerce.number().gte(1, { message: "ID lokasi harus minimal 1" }),
  quantity: z.coerce.number().gte(1, { message: "Jumlah harus minimal 1" }),
  date_time: z.date().optional(),
});

export type DepositSchema = z.infer<typeof depositSchema>;
