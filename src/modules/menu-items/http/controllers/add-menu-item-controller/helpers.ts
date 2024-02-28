import { z } from "zod";

export const addMenuItemValidationSchema = z.object({
  name: z.string(),
  price: z.number(),
  menuCategoryId: z.string(),
  description: z.string().optional(),
  notes: z.string().optional(),
  imageUrl: z.string().optional(),
  hasPromo: z.boolean().optional().default(false),
  avaliable: z.boolean().optional().default(true),
});

export type AddMenuItemValidationProps = z.infer<
  typeof addMenuItemValidationSchema
>;
