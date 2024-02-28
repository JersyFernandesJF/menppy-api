import { MenuItem } from "@prisma/client";
import { EditMenuItemRepository } from "../../repositories/edit-menu-item-repository";

export namespace IEditMenuItemUseCase {
  export type Params = EditMenuItemRepository.Params;
  export type Response = MenuItem;
}
