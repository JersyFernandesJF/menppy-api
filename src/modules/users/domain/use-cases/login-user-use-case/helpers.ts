import { User } from "@prisma/client";
import { EntityNotFoundError } from "~/modules/shared/errors/entity-not-found-error";
import { OperationFailedError } from "~/modules/shared/errors/operation-failed-error";

export namespace ILoginUserCase {
  export interface Params {
    email: string;
    password: string;
  }

  export type Response =
    | {
        accessToken: string;
        user: {
          id: string;
          name: string;
          email: string;
        };
      }
    | EntityNotFoundError
    | OperationFailedError;
}
