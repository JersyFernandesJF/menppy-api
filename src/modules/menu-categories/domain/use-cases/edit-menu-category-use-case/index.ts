import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { IEditMenuCategoryUseCase } from "./types";
import { MenuCategoryRepository } from "../../repositories";

export class EditMenuCategoryUseCase extends UseCase<
  IEditMenuCategoryUseCase.Params,
  IEditMenuCategoryUseCase.Response
> {
  constructor(private readonly menuCategoryRepository: MenuCategoryRepository) {
    super();
  }

  protected async perform(
    params: IEditMenuCategoryUseCase.Params
  ): Promise<UseCaseResponse<IEditMenuCategoryUseCase.Response>> {
    const menuCategory = await this.menuCategoryRepository.edit(params);
    return this.casePassed(menuCategory);
  }
}
