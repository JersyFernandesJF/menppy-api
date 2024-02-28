import { User } from "@prisma/client";

export namespace FindUserByKey {
  type Key = "email" | "id";
  export interface Params {
    key: Partial<Record<Key, string>>;
  }

  export type Response = Promise<User | null>;

  export interface Contract {
    loadByKey(params: FindUserByKey.Params): FindUserByKey.Response;
  }
}
