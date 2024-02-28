import { z } from "zod";
import { Controller } from "~/modules/shared/classes/controller";
import { badRequest, ok } from "~/modules/shared/helpers/http-helpers";
import { cryptographyAdapter } from "~/modules/shared/infra/cryptography";
import { Http } from "~/modules/shared/protocols/http";
import { Validator } from "~/modules/shared/protocols/validator";
import { ZodObjectValidation } from "~/modules/shared/validations/zod-object-validation";
import { LoginUserCase } from "~/modules/users/domain/use-cases/login-user-use-case";
import { userPrismaRepository } from "~/modules/users/infra/user-prisma-repository";

const validation = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const makeLoginController = (service?: LoginUserCase) => {
  class LoginController extends Controller {
    constructor(private readonly loginService: LoginUserCase) {
      super();
    }

    async perform(
      httpRequest: Http.Request<any, any, any, any>
    ): Promise<Http.Response<unknown>> {
      const operation = await this.loginService.execute({
        email: httpRequest.body.email,
        password: httpRequest.body.password,
      });

      if (operation?.failed) {
        return badRequest(operation.failed);
      }

      return ok(operation.result);
    }

    buildValidators(httpRequest: any): Validator[] {
      return [
        new ZodObjectValidation(validation, {
          email: httpRequest.body?.email,
          password: httpRequest.body?.password,
        }),
      ];
    }
  }

  const useCase = new LoginUserCase(userPrismaRepository, cryptographyAdapter);

  return new LoginController(service || useCase);
};
