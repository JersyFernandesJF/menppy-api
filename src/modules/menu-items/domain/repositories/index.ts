import { AddMenuItemRepository } from "./add-menu-item";
import { EditMenuItemRepository } from "./edit-menu-item-repository";

export type MenuItemRepository = AddMenuItemRepository.Contract & EditMenuItemRepository.Contract;
