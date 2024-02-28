import { MenuItem } from "@prisma/client";
import { EditMenuCategoryUseCase } from "~/modules/menu-categories/domain/use-cases";

export namespace EditMenuItemRepository {
  export interface Params {
    id: string;
    data: Partial<{
      name: string;
      price: number;
      imageUrl: string;
      description: string;
    }>;
  }
  export type Response = Promise<MenuItem>;

  export interface Contract {
    edit(
      params: EditMenuItemRepository.Params
    ): EditMenuItemRepository.Response;
  }
}
