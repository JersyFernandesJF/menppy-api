import { z } from "zod";

export const updateOrderValidation = z.object({
  status: z.enum(["CREATED", "PREPARING", "PAID"]),
  id: z.string(),
});

export type UpdateOrderValidationProps = z.infer<typeof updateOrderValidation>