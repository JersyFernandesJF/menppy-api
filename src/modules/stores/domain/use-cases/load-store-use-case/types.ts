import { Store } from "@prisma/client";
import { LoadStoreByIdRepository } from "../../repositories/load-store-repository";

export namespace ILoadStoreByIdUseCase {
  export type Params = LoadStoreByIdRepository.Params;
  export type Response = {
    store: Store;
  };
}
