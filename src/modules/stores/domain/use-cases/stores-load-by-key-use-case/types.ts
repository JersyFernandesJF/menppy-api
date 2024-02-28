import { EntityNotFoundError } from "~/modules/shared/errors/entity-not-found-error";
import { LoadStoreByKey } from "../../repositories/load-store-by-key";
import { Store } from "@prisma/client";

export namespace IStoresLoadByKeyUseCase {
  export type Params = LoadStoreByKey.Params;
  export type Response = EntityNotFoundError | Store;
}
