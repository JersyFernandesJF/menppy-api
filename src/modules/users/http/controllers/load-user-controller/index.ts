import { Controller } from "~/modules/shared/classes/controller";
import { badRequest, ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";
import { LoadUserUseCase } from "~/modules/users/domain/use-cases";
import { userPrismaRepository } from "~/modules/users/infra/user-prisma-repository";

const buildLoadUserController = (usecase: LoadUserUseCase) => {
  class LoadUserController extends Controller {
    constructor(private readonly service: LoadUserUseCase) {
      super();
    }

    async perform(
      httpRequest: Http.Request<any, any, any, any>
    ): Promise<Http.Response<unknown>> {
      const operation = await this.service.execute({
        id: httpRequest.params.id,
      });

      if (operation?.failed) {
        return badRequest(operation.failed);
      }

      return ok({ data: { item: operation.result } });
    }
  }

  return new LoadUserController(usecase);
};

export const makeLoadUserController = () => {
  return buildLoadUserController(new LoadUserUseCase(userPrismaRepository));
};
