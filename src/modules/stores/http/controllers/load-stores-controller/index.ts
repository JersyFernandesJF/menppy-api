import { Controller } from "~/modules/shared/classes/controller";
import { ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";
import { LoadStoresUseCase } from "~/modules/stores/domain/use-cases/load-stores-use-case";
import { StoresPrismaRepository } from "~/modules/stores/infra/stores-mongoose-repository";

const buildLoadStoresController = (useCase: LoadStoresUseCase) => {
  class LoadStoresController extends Controller {
    constructor(private readonly service: LoadStoresUseCase) {
      super();
    }

    async perform(
      httpRequest: Http.Request<any, any, any, any>
    ): Promise<Http.Response<unknown>> {
      const result = await this.service.execute({});

      return ok(result);
    }
  }

  return new LoadStoresController(useCase);
};

export const makeLoadStoresController = () => {
  return buildLoadStoresController(
    new LoadStoresUseCase(new StoresPrismaRepository())
  );
};
