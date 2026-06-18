import { z } from "zod";

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(120, { message: "El nombre no puede superar 120 caracteres" }),
  description: z
    .string()
    .max(255, { message: "La descripción no puede superar 255 caracteres" })
    .optional(),
});

export type UpdateCategoryFormInput = z.infer<typeof updateCategorySchema>;
