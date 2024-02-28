import { LoadMenuCategoriesByStoreUseCase } from "~/modules/menu-categories/domain/use-cases";
import { menuCategoryPrismaRepository } from "~/modules/menu-categories/infra/menu-category-prisma-repository";
import { Controller } from "~/modules/shared/classes/controller";
import { badRequest, ok } from "~/modules/shared/helpers/http-helpers";
import { Http } from "~/modules/shared/protocols/http";

type Params = { id: string };

const buildLoadMenuCategoriesByStoreController = (
  useCase: LoadMenuCategoriesByStoreUseCase
) => {
  class MenuCategoriesByStoreController extends Controller<any, Params> {
    constructor(private readonly service: LoadMenuCategoriesByStoreUseCase) {
      super();
    }
    async perform(
      httpRequest: Http.Request<Body, Params, any, any>
    ): Promise<Http.Response<any>> {
      const operation = await this.service.execute({
        id: httpRequest.params!.id,
      });

      if (operation?.failed) {
        return badRequest(operation.failed);
      }

      return ok(operation.result);
    }
  }

  return new MenuCategoriesByStoreController(useCase);
};

export const makeLoadMenuCategoriesByStoreController = () => {
  return buildLoadMenuCategoriesByStoreController(
    new LoadMenuCategoriesByStoreUseCase(menuCategoryPrismaRepository)
  );
};
