import { OrderStatus } from "@prisma/client";
import { UpdateOrderUseCase } from "~/modules/orders/domain/use-cases";
import { orderPrismaRepository } from "~/modules/orders/infra/order-prisma-repository";
import { Controller } from "~/modules/shared/classes/controller";
import { ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";
import { Validator } from "~/modules/shared/protocols/validator";
import { ZodObjectValidation } from "~/modules/shared/validations/zod-object-validation";
import { UpdateOrderValidationProps, updateOrderValidation } from "./helpers";

type Body = { status: OrderStatus };
type Params = { id: string };

type Req = Http.Request<Body, Params, any, any>;

export const makeUpdateOrderController = (useCase?: UpdateOrderUseCase) => {
  class UpdateOrderController extends Controller {
    constructor(private readonly service: UpdateOrderUseCase) {
      super();
    }

    async perform(httpRequest: Req): Promise<Http.Response<unknown>> {
      const operation = await this.service.execute({
        id: httpRequest.params!.id,
        status: httpRequest.body!.status,
      });

      return ok({ order: operation.result });
    }

    buildValidators(httpRequest: Req): Validator[] {
      return [
        new ZodObjectValidation(updateOrderValidation, {
          id: httpRequest.params?.id,
          status: httpRequest.body?.status,
        } as UpdateOrderValidationProps),
      ];
    }
  }

  return new UpdateOrderController(
    useCase || new UpdateOrderUseCase(orderPrismaRepository)
  );
};
