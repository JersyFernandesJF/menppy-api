import { EditMenuCategoryUseCase } from "~/modules/menu-categories/domain/use-cases";
import { IEditMenuCategoryUseCase } from "~/modules/menu-categories/domain/use-cases/edit-menu-category-use-case/types";
import { menuCategoryPrismaRepository } from "~/modules/menu-categories/infra/menu-category-prisma-repository";
import { Controller } from "~/modules/shared/classes/controller";
import { badRequest, ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";

type Params = { id: string };
type Body = IEditMenuCategoryUseCase.Params["data"];

const buildEditMenuCategoryController = (useCase: EditMenuCategoryUseCase) => {
  class EditMenuCategoryController extends Controller<Body, Params> {
    constructor(private readonly service: EditMenuCategoryUseCase) {
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

  return new EditMenuCategoryController(useCase);
};

export const makeEditMenuCategoryController = () => {
  return buildEditMenuCategoryController(
    new EditMenuCategoryUseCase(menuCategoryPrismaRepository)
  );
};
