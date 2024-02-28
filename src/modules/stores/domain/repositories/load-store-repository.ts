import { Store } from "@prisma/client";

export namespace LoadStoreByIdRepository {
  export interface Params {
    storeId: string;
  }
  export type Response = Promise<{
    store: Store | null;
  }>;

  export interface Contract {
    load(
      params: LoadStoreByIdRepository.Params
    ): LoadStoreByIdRepository.Response;
  }
}
