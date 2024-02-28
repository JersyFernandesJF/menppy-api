import { AppError } from "../errors/app-error";
import { Validator } from "../protocols/validator";

export class ValidationComposite implements Validator {
  constructor(private readonly validators: Validator[]) {}

  async validate(): Promise<AppError | undefined> {
    for (const validator of this.validators) {
      const error = await validator.validate();
      if (error !== undefined) return error;
    }
  }
}
