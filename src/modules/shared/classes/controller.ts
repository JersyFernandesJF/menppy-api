import { badRequest, serverError } from "../helpers/http-helpers";
import { Http } from "../protocols/http";
import { Validator } from "../protocols/validator";
import { ValidationComposite } from "../validations/composite";

export abstract class Controller<
  Body = any,
  Params = any,
  Query = any,
  Headers = any
> {
  abstract perform(
    httpRequest: Http.Request<Body, Params, Query, Headers>
  ): Promise<Http.Response>;

  async handle(
    httpRequest: Http.Request<Body, Params, Query>
  ): Promise<Http.Response> {
    try {
      const error = await this.validate(httpRequest);

      if (error !== undefined) return badRequest(error);

      return await this.perform(httpRequest);
    } catch (error) {
      console.log("==>==> SERVER ERROR", error);
      return serverError(error as Error);
    }
  }

  buildValidators(httpRequest: any): Validator[] {
    return [];
  }

  private async validate(httpRequest: any): Promise<Error | undefined> {
    const validators = this.buildValidators(httpRequest);
    return await new ValidationComposite(validators).validate();
  }
}
