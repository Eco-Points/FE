import * as z from "zod";

export interface ILogin {
  token: string;
}

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email wajib diisi" }).email("Email tidak valid"),
  password: z.string().min(6, { message: "Kata sandi minimal 6 karakter" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
