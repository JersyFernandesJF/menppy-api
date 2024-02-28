import { z } from "zod";

export const createOrderValidation = z.object({
  orderStoreId: z.string(),
  orderUserId: z.string(),
  items: z.array(
    z.object({
      orderItemsMenuItemId: z.string(),
      notes: z.string().optional(),
    })
  ),
});
