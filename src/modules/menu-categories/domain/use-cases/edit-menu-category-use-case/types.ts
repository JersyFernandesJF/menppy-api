import { MenuCategory } from "@prisma/client";
import { EditMenuCategoryRepository } from "../../repositories/edit-menu-category-repository";

export namespace IEditMenuCategoryUseCase {
  export type Params = EditMenuCategoryRepository.Params;
  export type Response = MenuCategory;
}
