import { Store } from "@prisma/client";
import { LoadStoresRepository } from "../../repositories/load-stores-repository";

export namespace ILoadStoresUseCase {
  export type Params = LoadStoresRepository.Params;
  export type Response = {
    stores: Store[];
    totalElements: number;
  };
}
