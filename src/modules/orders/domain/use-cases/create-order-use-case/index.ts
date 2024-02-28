import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { OrderRepository } from "../../repositories";
import { CreateOrderRepository } from "../../repositories/create-order-repository";
import { Order, OrderItems } from "@prisma/client";

type Params = Omit<CreateOrderRepository.Params, "code"> & {
  items: Array<{
    orderItemsMenuItemId: string;
    notes?: string;
  }>;
};

type Response = Order & { items: OrderItems[] };

export class CreateOrderUseCase extends UseCase<Params, Response> {
  constructor(private readonly orderRepository: OrderRepository) {
    super();
  }

  protected async perform(params: Params): Promise<UseCaseResponse<Response>> {
    const code = "some_code";
    const order = await this.orderRepository.create({
      orderStoreId: params.orderStoreId,
      orderUserId: params.orderUserId,
      code: code,
    });

    const items = await this.orderRepository.addOrderItems({
      items: params.items.map((item) => ({
        orderItemsMenuItemId: item.orderItemsMenuItemId,
        orderItemsOrderId: order.id,
        notes: item.notes,
      })),
    });

    return this.casePassed({ order, items });
  }
}
