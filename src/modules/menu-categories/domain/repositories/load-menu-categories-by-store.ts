import { MenuCategory, MenuItem } from "@prisma/client";

export namespace LoadMenuCategoriesByStore {
  export interface Params {
    storeId: string;
  }

  export type MenuCategoryWithItsItems = {
    menuItems: Array<MenuItem>;
  } & MenuCategory;

  export type Response = Promise<{
    menuCategories: MenuCategoryWithItsItems[];
    totalElements: number;
  }>;

  export interface Contract {
    load(
      params: LoadMenuCategoriesByStore.Params
    ): LoadMenuCategoriesByStore.Response;
  }
}
