import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { MenuItemRepository } from "../../repositories";
import { IEditMenuItemUseCase } from "./types";
import { EditMenuItemRepository } from "../../repositories/edit-menu-item-repository";

export class EditMenuItemUseCase extends UseCase<
  IEditMenuItemUseCase.Params,
  IEditMenuItemUseCase.Response
> {
  constructor(private readonly menuItemRepository: MenuItemRepository) {
    super();
  }
  protected async perform(
    params: EditMenuItemRepository.Params
  ): Promise<UseCaseResponse<IEditMenuItemUseCase.Response>> {
    const menuItem = await this.menuItemRepository.edit(params);
    return this.casePassed(menuItem);
  }
}
