import { EditMenuCategoryRepository } from "./edit-menu-category-repository";
import { LoadMenuCategoriesByStore } from "./load-menu-categories-by-store";

export type MenuCategoryRepository = EditMenuCategoryRepository.Contract &
  LoadMenuCategoriesByStore.Contract;
