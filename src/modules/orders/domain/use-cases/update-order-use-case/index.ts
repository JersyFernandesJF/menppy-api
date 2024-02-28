import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { UpdateOrderRepository } from "../../repositories/update-order-repository";
import { Order } from "@prisma/client";
import { OrderRepository } from "../../repositories";

type Params = UpdateOrderRepository.Params;
type Response = Order;

export class UpdateOrderUseCase extends UseCase<Params, Response> {
  constructor(private readonly orderRepository: OrderRepository) {
    super();
  }

  protected async perform(params: Params): Promise<UseCaseResponse<Response>> {
    const order = await this.orderRepository.update(params);
    return this.casePassed({ order });
  }
}
