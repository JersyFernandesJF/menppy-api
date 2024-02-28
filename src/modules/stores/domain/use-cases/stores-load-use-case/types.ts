import { Store } from "@prisma/client";
import { StoresLoadRepository } from "../../repositories/stores-load-repository";

export namespace IStoresLoadUseCase {
  export type Params = StoresLoadRepository.Params;
  export type Response = {
    stores: Store[];
    totalElements: number;
  };
}
