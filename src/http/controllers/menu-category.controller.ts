import { MenuCategory } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  MenuCategoryAlreadyExists,
  MenuCategoryCreateSchema,
  MenuCategoryDoesNotExists,
  MenuCategoryUpdateSchema,
  MenuCategoryUseCase,
  menuCategoryCreateSchema,
  menuCategoryUpdateSchema,
} from "~/use-cases/menu-category.use-case";

export class MenuCategoryController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    const { name } = request.body as unknown as Pick<
      MenuCategoryCreateSchema,
      "name"
    >;
    const { storeId } = request.params as unknown as Pick<
      MenuCategoryCreateSchema,
      "storeId"
    >;

    const bodySchema = menuCategoryCreateSchema.parse({ name, storeId });

    const menuCategoryUseCase = new MenuCategoryUseCase();

    try {
      const menuCategory = await menuCategoryUseCase.create(bodySchema);

      return reply.status(201).send({
        data: {
          item: menuCategory,
        },
        message: "Operation completed successfully.",
      });
    } catch (error) {
      if (error instanceof MenuCategoryAlreadyExists) {
        return reply.status(400).send({
          message: error.message,
        });
      }

      throw error;
    }
  }
  static async update(request: FastifyRequest, reply: FastifyReply) {
    const { menuCategoryId } = request.params as unknown as {
      menuCategoryId: MenuCategory["id"];
    };
    const body = request.body as unknown as Omit<
      MenuCategoryUpdateSchema,
      "id"
    >;

    const bodySchema = menuCategoryUpdateSchema.parse({
      id: menuCategoryId,
      ...body,
    });

    const menuCategoryUseCase = new MenuCategoryUseCase();

    try {
      const menuCategory = await menuCategoryUseCase.update({
        id: bodySchema.id,
        disabled: bodySchema.disabled,
        name: bodySchema.name,
      });

      return reply.status(200).send({
        data: { item: menuCategory },
        message: "Operation completed successfully",
      });
    } catch (error) {
      if (error instanceof MenuCategoryDoesNotExists) {
        return reply.status(400).send({
          message: error.message,
        });
      }
      throw error;
    }
  }
  static async delete(request: FastifyRequest, reply: FastifyReply) {
    const { menuCategoryId } = request.params as unknown as {
      menuCategoryId: MenuCategory["id"];
    };

    const menuCategoryUseCase = new MenuCategoryUseCase();
    try {
      const menuCategory = await menuCategoryUseCase.delete(menuCategoryId);

      return reply.status(204).send({
        data: { item: menuCategory },
        message: "Menu deleted successfully.",
      });
    } catch (error) {
      if (error instanceof MenuCategoryDoesNotExists) {
        return reply.status(400).send({
          message: error?.message,
        });
      }

      throw error;
    }
  }
}
