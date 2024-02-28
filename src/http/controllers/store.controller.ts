import { FastifyReply, FastifyRequest } from "fastify";
import { Store } from "~/repositories/store.repository";
import {
  StoreDoesNotExistsError,
  StoreUseCase,
  storeCreateSchema,
} from "~/use-cases/store.use-case";

export class StoreController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = storeCreateSchema.parse(request.body);

    const storeUseCase = new StoreUseCase();

    try {
      const store = await storeUseCase.create(bodySchema);

      return reply.status(201).send({
        data: { item: store },
        message: "Store created successfully",
      });
    } catch (error) {
      throw error;
    }
  }

  static async getMenu(request: FastifyRequest, reply: FastifyReply) {
    const { storeId } = request.params as unknown as { storeId: Store["id"] };

    const storeUseCase = new StoreUseCase();

    try {
      const storeMenu = await storeUseCase.getMenu({ storeId });

      return reply.status(200).send({
        data: {
          items: storeMenu,
        },
        message: "Store menu successfully found",
      });
    } catch (error) {
      if (error instanceof StoreDoesNotExistsError) {
        return reply.status(400).send({
          message: "Store not found",
        });
      }

      throw error;
    }
  }
}
