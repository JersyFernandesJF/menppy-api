import { Controller } from "~/modules/shared/classes/controller";
import { ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";
import { LoadStoreByIdUseCase } from "~/modules/stores/domain/use-cases/load-store-use-case";
import { StoreByIdPrismaRepository } from "~/modules/stores/infra/stores-mongoose-repository";

const buildLoadStoreByIdController = (useCase: LoadStoreByIdUseCase) => {
  class LoadStoreByIdController extends Controller {
    constructor(private readonly service: LoadStoreByIdUseCase) {
      super();
    }

    async perform(
      httpRequest: Http.Request<{ params: { storeId: string } }>
    ): Promise<Http.Response<unknown>> {
      const { storeId } = httpRequest.params;
      const result = await this.service.execute({ storeId });

      return ok(result);
    }
  }

  return new LoadStoreByIdController(useCase);
};

export const makeLoadStoreByIdController = () => {
  return buildLoadStoreByIdController(
    new LoadStoreByIdUseCase(new StoreByIdPrismaRepository())
  );
};
