import { Store } from "@prisma/client";

export namespace LoadStoreByKey {
  export type Key = "email" | "id" | "userId";
  export interface Params {
    key: Partial<Record<Key, string>>;
  }

  export type Response = Promise<Store | null>;

  export interface Contract {
    loadByKey(params: LoadStoreByKey.Params): LoadStoreByKey.Response;
  }
}
