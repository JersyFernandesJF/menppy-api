import { Order } from "@prisma/client";

export namespace CreateOrderRepository {
  export interface Params {
    orderUserId: string;
    orderStoreId: string;
    code: string;
  }

  export type Response = Promise<Order>;

  export interface Contract {
    create(
      params: CreateOrderRepository.Params
    ): CreateOrderRepository.Response;
  }
}
