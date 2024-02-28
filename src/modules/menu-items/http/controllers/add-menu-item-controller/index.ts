import { AddMenuItemRepository } from "~/modules/menu-items/domain/repositories/add-menu-item";
import { AddMenuItemUseCase } from "~/modules/menu-items/domain/use-cases";
import { menuItemPrismaRepository } from "~/modules/menu-items/infra/menu-item-prisma-repository";
import { Controller } from "~/modules/shared/classes/controller";
import { ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";
import { Validator } from "~/modules/shared/protocols/validator";
import { ZodObjectValidation } from "~/modules/shared/validations/zod-object-validation";
import {
  AddMenuItemValidationProps,
  addMenuItemValidationSchema,
} from "./helpers";

type Body = AddMenuItemRepository.Params;
type Request = Http.Request<Body, any, any>;

const buildAddMenuItemController = (useCase: AddMenuItemUseCase) => {
  class AddMenuItemController extends Controller {
    constructor(private readonly service: AddMenuItemUseCase) {
      super();
    }

    async perform(httpRequest: Request): Promise<Http.Response<unknown>> {
      const item = await this.service.execute({
        menuCategoryId: httpRequest.body!.menuCategoryId,
        name: httpRequest.body!.name,
        price: httpRequest.body!.price,
        description: httpRequest.body!.description,
        notes: httpRequest.body!.notes,
        imageUrl: httpRequest.body!.imageUrl,
        available: httpRequest.body!.available,
        hasPromo: httpRequest.body!.hasPromo,
      });

      return ok({
        data: { item: item.result },
        message: "Operation completed successfully",
      });
    }

    buildValidators(httpRequest: Request): Validator[] {
      return [
        new ZodObjectValidation(addMenuItemValidationSchema, {
          name: httpRequest.body?.name,
          price: httpRequest.body?.price,
          description: httpRequest.body?.description,
          notes: httpRequest.body?.notes,
          menuCategoryId: httpRequest.body?.menuCategoryId,
          imageUrl: httpRequest.body?.imageUrl,
          available: httpRequest.body?.available,
          hasPromo: httpRequest.body?.hasPromo,
        } as Partial<AddMenuItemValidationProps>),
      ];
    }
  }

  return new AddMenuItemController(useCase);
};

export const makeAddMenuItemController = () => {
  return buildAddMenuItemController(
    new AddMenuItemUseCase(menuItemPrismaRepository)
  );
};
