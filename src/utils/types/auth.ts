import * as z from "zod";

export interface ILogin {
  token: string;
}

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email wajib diisi" }).email("Email tidak valid"),
  password: z.string().min(6, { message: "Kata sandi minimal 6 karakter" }),
});

export const registerSchema = z
  .object({
    fullname: z.string().min(1, { message: "Nama lengkap wajib diisi" }),
    repassword: z.string().min(6, { message: "Konfirmasi kata sandi minimal 6 karakter" }),
  })
  .merge(loginSchema)
  .refine((data) => data.password === data.repassword, {
    message: "Kata sandi tidak cocok",
    path: ["repassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
