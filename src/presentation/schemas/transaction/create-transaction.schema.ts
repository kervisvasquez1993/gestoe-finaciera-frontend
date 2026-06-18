import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z
    .string()
    .min(1, { message: "La descripción es requerida" })
    .max(255, { message: "La descripción no puede superar 255 caracteres" }),
  amount: z
    .number({ message: "El monto es requerido" })
    .positive({ message: "El monto debe ser positivo" }),
  type: z.enum(["entrada", "saida"], {
    message: "Seleccioná un tipo",
  }),
  date: z.string().min(1, { message: "La fecha es requerida" }),
  categoryId: z.string().min(1, { message: "Seleccioná una categoría" }),
});

export type CreateTransactionFormInput = z.infer<
  typeof createTransactionSchema
>;
