import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { OrderRepository } from "../../repositories";
import { LoadOrderRepository } from "../../repositories/load-order-repository";
import { Order } from "@prisma/client";
import { EntityNotFoundError } from "~/modules/shared/errors/entity-not-found-error";

type Params = LoadOrderRepository.Params;
type Response = Order | EntityNotFoundError;

export class LoadOrderUseCase extends UseCase<Params, Response> {
  constructor(private readonly orderRepository: OrderRepository) {
    super();
  }

  protected async perform(params: Params): Promise<UseCaseResponse<Response>> {
    const order = await this.orderRepository.load(params);

    if (!order) {
      return this.caseFailed(new EntityNotFoundError("Order"));
    }

    return this.casePassed({ order });
  }
}
