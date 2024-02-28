import { MenuCategory } from "@prisma/client";

export namespace EditMenuCategoryRepository {
  export interface Params {
    id: string;
    data: Partial<{
      name: string;
      disabled: boolean;
    }>;
  }

  export type Response = Promise<MenuCategory>;

  export interface Contract {
    edit(
      params: EditMenuCategoryRepository.Params
    ): EditMenuCategoryRepository.Response;
  }
}
