import { MenuItem } from "@prisma/client";
import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { MenuItemRepository } from "../../repositories";
import { AddMenuItemRepository } from "../../repositories/add-menu-item";

type Params = AddMenuItemRepository.Params;
type Response = MenuItem;

export class AddMenuItemUseCase extends UseCase<Params, Response> {
  constructor(private readonly menuItemRepository: MenuItemRepository) {
    super();
  }

  protected async perform(params: Params): Promise<UseCaseResponse<Response>> {
    const menuItem = await this.menuItemRepository.create(params);
    return this.casePassed(menuItem);
  }
}
