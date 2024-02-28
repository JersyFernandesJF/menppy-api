import { Store } from "@prisma/client";

export namespace LoadStoresRepository {
  export interface Params {}
  export type Response = Promise<{
    stores: Store[];
    totalElements: number;
  }>;

  export interface Contract {
    load(params: LoadStoresRepository.Params): LoadStoresRepository.Response;
  }
}
