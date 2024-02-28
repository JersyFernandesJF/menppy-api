import { prisma } from "~/lib/prisma";
import { MenuCategoryRepository } from "../domain/repositories";
import { EditMenuCategoryRepository } from "../domain/repositories/edit-menu-category-repository";
import { LoadMenuCategoriesByStore } from "../domain/repositories/load-menu-categories-by-store";

export class MenuCategoryPrismaRepository implements MenuCategoryRepository {
  async edit(
    params: EditMenuCategoryRepository.Params
  ): EditMenuCategoryRepository.Response {
    const menuCategory = await prisma.menuCategory.update({
      where: { id: params.id },
      data: params.data,
    });

    return menuCategory;
  }

  async load(
    params: LoadMenuCategoriesByStore.Params
  ): LoadMenuCategoriesByStore.Response {
    const menuCategories = await prisma.menuCategory.findMany({
      where: { storeId: params.storeId },
      include: {
        menuItems: true,
      },
    });
    const totalElements = await prisma.menuCategory.count({
      where: { storeId: params.storeId },
    });

    return {
      menuCategories,
      totalElements,
    };
  }
}

export const menuCategoryPrismaRepository = new MenuCategoryPrismaRepository();
