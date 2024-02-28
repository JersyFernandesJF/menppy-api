import { MenuItem } from "@prisma/client";

export namespace AddMenuItemRepository {
  export interface Params {
    name: string;
    price: number;
    menuCategoryId: string;
    hasPromo?: boolean;
    available?: boolean;
    description?: string;
    notes?: string;
    imageUrl?: string;
  }

  export type Response = Promise<MenuItem>;

  export interface Contract {
    create(
      params: AddMenuItemRepository.Params
    ): AddMenuItemRepository.Response;
  }
}
