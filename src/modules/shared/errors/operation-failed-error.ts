import { AppError } from "./app-error";
import { ErrorCodes } from "./error-codes";

export class OperationFailedError extends AppError {
  constructor(message: string) {
    super({
      code: ErrorCodes.OperationFailedError,
      message,
      name: "OperationFailedError",
    });
  }
}
