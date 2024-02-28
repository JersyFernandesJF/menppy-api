import { LoadOrderUseCase } from "~/modules/orders/domain/use-cases";
import { orderPrismaRepository } from "~/modules/orders/infra/order-prisma-repository";
import { Controller } from "~/modules/shared/classes/controller";
import { badRequest, ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";

export const makeLoadOrderController = (useCase?: LoadOrderUseCase) => {
  class LoadOrderController extends Controller {
    constructor(private readonly service: LoadOrderUseCase) {
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

      return ok(operation.result);
    }
  }

  return new LoadOrderController(new LoadOrderUseCase(orderPrismaRepository));
};
