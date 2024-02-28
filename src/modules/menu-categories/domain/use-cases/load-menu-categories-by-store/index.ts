import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { MenuCategoryRepository } from "../../repositories";
import { MenuCategory } from "@prisma/client";

type Params = { id: string };
export type Response = {
  menuCategories: MenuCategory[];
  totalElements: number;
};

export class LoadMenuCategoriesByStoreUseCase extends UseCase<
  Params,
  Response
> {
  constructor(private readonly menuCategoryRepository: MenuCategoryRepository) {
    super();
  }

  protected async perform(params: Params): Promise<UseCaseResponse<Response>> {
    const operation = await this.menuCategoryRepository.load({
      storeId: params.id,
    });

    return this.casePassed(operation);
  }
}
