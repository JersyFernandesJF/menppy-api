import { Controller } from "~/modules/shared/classes/controller";
import { badRequest, ok } from "~/modules/shared/helpers/http-helpers";
import { cryptographyAdapter } from "~/modules/shared/infra/cryptography";
import { Http } from "~/modules/shared/protocols/http";
import { UserRegistrationUseCase } from "~/modules/users/domain/use-cases/user-registration-use-case";
import { userPrismaRepository } from "~/modules/users/infra/user-prisma-repository";

const buildRegisterUserController = (useCase: UserRegistrationUseCase) => {
  class RegisterUserController extends Controller {
    constructor(private readonly service: UserRegistrationUseCase) {
      super();
    }

    async perform(
      httpRequest: Http.Request<any, any, any, any>
    ): Promise<Http.Response<unknown>> {
      const body = httpRequest.body;
      const operation = await this.service.execute(body);

      if (operation?.failed) {
        return badRequest(operation.failed);
      }

      return ok({ user: operation.result });
    }
  }

  return new RegisterUserController(useCase);
};

export const makeRegisterUserController = () => {
  return buildRegisterUserController(
    new UserRegistrationUseCase(userPrismaRepository, cryptographyAdapter)
  );
};
