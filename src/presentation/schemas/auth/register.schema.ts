import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(150, { message: "El nombre no puede superar 150 caracteres" }),
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "El email no es válido" })
    .max(180, { message: "El email no puede superar 180 caracteres" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(100, { message: "La contraseña no puede superar 100 caracteres" }),
});

export type RegisterFormInput = z.infer<typeof registerSchema>;
