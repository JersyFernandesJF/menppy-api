import { Order, OrderStatus } from "@prisma/client";

export namespace UpdateOrderRepository {
  export interface Params {
    id: string;
    status: OrderStatus;
  }

  export type Response = Promise<Order>;

  export interface Contract {
    update(
      params: UpdateOrderRepository.Params
    ): UpdateOrderRepository.Response;
  }
}
