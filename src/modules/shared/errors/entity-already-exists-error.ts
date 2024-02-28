import { AppError } from "./app-error";
import { ErrorCodes } from "./error-codes";

export class EntityAlreadyExistsError extends AppError {
  constructor(entity: string) {
    super({
      code: ErrorCodes.EntityAlreadyExists,
      message: `${entity || "Entity"} already exists`,
      name: "EntityAlreadyExistsError",
    });
  }
}
