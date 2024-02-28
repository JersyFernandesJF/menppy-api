import { CreateOrderUseCase } from "~/modules/orders/domain/use-cases";
import { orderPrismaRepository } from "~/modules/orders/infra/order-prisma-repository";
import { Controller } from "~/modules/shared/classes/controller";
import { badRequest, ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";
import { Validator } from "~/modules/shared/protocols/validator";
import { ZodObjectValidation } from "~/modules/shared/validations/zod-object-validation";
import { createOrderValidation } from "./helpers";

type Body = {
  items: {
    orderItemsMenuItemId: string;
    notes?: string;
  }[];
  orderStoreId: string;
  orderUserId: string;
};
type Req = Http.Request<Body, any, any, any>;

const buildCreateOrderController = (useCase: CreateOrderUseCase) => {
  class CreateOrderController extends Controller {
    constructor(private readonly service: CreateOrderUseCase) {
      super();
    }

    async perform(httpRequest: Req): Promise<Http.Response<unknown>> {
      const operation = await this.service.execute({
        orderStoreId: httpRequest.body!.orderStoreId,
        orderUserId: httpRequest.body!.orderUserId,
        items: httpRequest.body!.items,
      });

      if (operation?.failed) {
        return badRequest(operation.failed);
      }

      return ok(operation.result);
    }

    buildValidators(httpRequest: Req): Validator[] {
      return [
        new ZodObjectValidation(createOrderValidation, {
          orderStoreId: httpRequest.body?.orderStoreId,
          orderUserId: httpRequest.body?.orderUserId,
          items: httpRequest.body?.items,
        } as Body),
      ];
    }
  }

  return new CreateOrderController(useCase);
};

export const makeCreateOrderController = () => {
  return buildCreateOrderController(
    new CreateOrderUseCase(orderPrismaRepository)
  );
};
