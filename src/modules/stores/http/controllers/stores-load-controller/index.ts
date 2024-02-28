import { Controller } from "~/modules/shared/classes/controller";
import { ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";
import { StoresLoadUseCase } from "~/modules/stores/domain/use-cases/stores-load-use-case";
import { StoresPrismaRepository } from "~/modules/stores/infra/stores-prisma-repository";

const buildStoresLoadController = (useCase: StoresLoadUseCase) => {
  class StoresLoadController extends Controller {
    constructor(private readonly service: StoresLoadUseCase) {
      super();
    }

    async perform(
      httpRequest: Http.Request<any, any, any, any>
    ): Promise<Http.Response<unknown>> {
      const operation = await this.service.execute({});

      return ok({ data: operation.result });
    }
  }

  return new StoresLoadController(useCase);
};

export const makeStoresLoadController = () => {
  return buildStoresLoadController(
    new StoresLoadUseCase(new StoresPrismaRepository())
  );
};
