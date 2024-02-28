import { IEditMenuCategoryUseCase } from "~/modules/menu-categories/domain/use-cases/edit-menu-category-use-case/types";
import { EditMenuItemUseCase } from "~/modules/menu-items/domain/use-cases";
import { menuItemPrismaRepository } from "~/modules/menu-items/infra/menu-item-prisma-repository";
import { Controller } from "~/modules/shared/classes/controller";
import { badRequest, ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";

type Params = { id: string };
type Body = IEditMenuCategoryUseCase.Params["data"];

const buildEditMenuItemController = (useCase: EditMenuItemUseCase) => {
  class EditMenuItemController extends Controller<Body, Params> {
    constructor(private readonly service: EditMenuItemUseCase) {
      super();
    }
    async perform(
      httpRequest: Http.Request<Body, Params, any, any>
    ): Promise<Http.Response<any>> {
      const operation = await this.service.execute({
        id: httpRequest.params!.id!,
        data: httpRequest.body!,
      });

      if (operation?.failed) {
        return badRequest(operation.failed);
      }
      return ok(operation.result);
    }
  }
  return new EditMenuItemController(useCase);
};

export const makeEditMenuCategoryController = () => {
  return buildEditMenuItemController(
    new EditMenuItemUseCase(menuItemPrismaRepository)
  );
};
