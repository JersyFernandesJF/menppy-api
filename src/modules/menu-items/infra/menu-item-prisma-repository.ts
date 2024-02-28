import { prisma } from "~/lib/prisma";
import { MenuItemRepository } from "../domain/repositories";
import { AddMenuItemRepository } from "../domain/repositories/add-menu-item";
import { EditMenuItemRepository } from "../domain/repositories/edit-menu-item-repository";

export class MenuItemPrismaRepository implements MenuItemRepository {
  async create(
    params: AddMenuItemRepository.Params
  ): AddMenuItemRepository.Response {
    const item = await prisma.menuItem.create({
      data: {
        name: params.name,
        price: params.price,
        description: params.description,
        notes: params.notes,
        menuCategoryId: params.menuCategoryId,
        imageUrl: params.imageUrl,
        available: params.available,
        hasPromo: params.hasPromo,
      },
    });

    return item;
  }
  async edit(
    params: EditMenuItemRepository.Params
  ): EditMenuItemRepository.Response {
    const menuItem = await prisma.menuItem.update({
      where: { id: params.id },
      data: params.data,
    });
    return menuItem;
  }
}

export const menuItemPrismaRepository = new MenuItemPrismaRepository();
