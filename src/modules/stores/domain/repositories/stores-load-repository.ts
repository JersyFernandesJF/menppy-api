import { Store } from "@prisma/client";

export namespace StoresLoadRepository {
  export interface Params {}
  export type Response = Promise<{
    stores: Store[];
    totalElements: number;
  }>;

  export interface Contract {
    load(params: StoresLoadRepository.Params): StoresLoadRepository.Response;
  }
}
