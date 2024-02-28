import { OrderItems } from "@prisma/client";

export namespace AddItemsToOrderRepository {
  export interface Params {
    items: Array<{
      orderItemsMenuItemId: string;
      orderItemsOrderId: string;
      notes?: string;
    }>;
  }

  export type Response = Promise<OrderItems>;

  export interface Contract {
    addOrderItems(
      params: AddItemsToOrderRepository.Params
    ): AddItemsToOrderRepository.Response;
  }
}
