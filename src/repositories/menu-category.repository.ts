import { prisma } from "~/lib/prisma";
import { Store } from "./store.repository";

export class MenuCategory {
  id: string;
  name: string;
  disabled: boolean = false;
  storeId: Store["id"];
}

type MenuCategoryCreate = Omit<MenuCategory, "id" | "disabled">;
type MenuCategoryUpdate = Pick<MenuCategory, "id"> &
  Omit<Partial<MenuCategory>, "id">;

export class MenuCategoryRepository {
  async create({ storeId, ...params }: MenuCategoryCreate) {
    const menuCategory = await prisma.menuCategory.create({
      data: {
        ...params,
        storeId,
        disabled: false,
      },
    });

    return menuCategory;
  }

  async findByName(name: MenuCategory["name"]) {
    const menuCategory = await prisma.menuCategory.findFirst({
      where: {
        name,
      },
    });

    return menuCategory;
  }

  async update({ id, ...params }: MenuCategoryUpdate) {
    const menuCategory = await prisma.menuCategory.update({
      where: {
        id,
      },
      data: params,
    });

    return menuCategory;
  }

  async findById(menuCategoryId: MenuCategory["id"]) {
    const menuCategory = await prisma.menuCategory.findUnique({
      where: {
        id: menuCategoryId,
      },
    });

    return menuCategory;
  }
  async deleteById(menuCategoryId: MenuCategory["id"]) {
    const menuCategory = await prisma.menuCategory.delete({
      where: {
        id: menuCategoryId,
      },
    });

    return menuCategory;
  }
}
