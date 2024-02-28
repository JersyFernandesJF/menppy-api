import { AppError } from "./app-error";
import { ErrorCodes } from "./error-codes";

export class EntityNotFoundError extends AppError {
  constructor(entity?: string) {
    super({
      code: ErrorCodes.EntityNotFound,
      message: `${entity} Entity not found`,
      name: "EntityNotFoundError",
    });
  }
}
