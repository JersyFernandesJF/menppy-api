import { prisma } from "~/lib/prisma";
import { OrderRepository } from "../domain/repositories";
import { CreateOrderRepository } from "../domain/repositories/create-order-repository";
import { LoadOrderRepository } from "../domain/repositories/load-order-repository";
import { UpdateOrderRepository } from "../domain/repositories/update-order-repository";
import { AddItemsToOrderRepository } from "../domain/repositories/add-items-to-order-repository";

class OrderPrismaRepository implements OrderRepository {
  async create(
    params: CreateOrderRepository.Params
  ): CreateOrderRepository.Response {
    const order = await prisma.order.create({
      data: {
        orderStoreId: params.orderStoreId,
        orderUserId: params.orderUserId,
        code: params.code,
      },
    });

    return order;
  }

  async load(params: LoadOrderRepository.Params): LoadOrderRepository.Response {
    const order = await prisma.order.findFirst({
      where: { id: params.id },
      include: {
        orderItems: { where: { orderItemsOrderId: params.id } },
      },
    });
    return order;
  }

  async update({
    id,
    status,
  }: UpdateOrderRepository.Params): UpdateOrderRepository.Response {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return order;
  }

  async addOrderItems(
    params: AddItemsToOrderRepository.Params
  ): AddItemsToOrderRepository.Response {
    const items = await prisma.$transaction(
      params.items.map((item) => prisma.orderItems.create({ data: item }))
    );

    return items;
  }
}

export const orderPrismaRepository = new OrderPrismaRepository();
