import { Order } from "@prisma/client";

export namespace LoadOrderRepository {
  export interface Params {
    id: string;
  }

  export type Response = Promise<Order | null>;

  export interface Contract {
    load(params: LoadOrderRepository.Params): LoadOrderRepository.Response;
  }
}
