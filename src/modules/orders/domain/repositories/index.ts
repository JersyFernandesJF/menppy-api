import { AddItemsToOrderRepository } from "./add-items-to-order-repository";
import { CreateOrderRepository } from "./create-order-repository";
import { LoadOrderRepository } from "./load-order-repository";
import { UpdateOrderRepository } from "./update-order-repository";

export type OrderRepository = CreateOrderRepository.Contract &
  LoadOrderRepository.Contract &
  UpdateOrderRepository.Contract &
  AddItemsToOrderRepository.Contract;
