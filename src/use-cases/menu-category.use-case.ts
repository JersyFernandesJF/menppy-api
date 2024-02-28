import { z } from "zod";
import {
  MenuCategory,
  MenuCategoryRepository,
} from "~/repositories/menu-category.repository";

export const menuCategoryCreateSchema = z.object({
  name: z.string(),
  storeId: z.string(),
});

export const menuCategoryUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  disabled: z.boolean().optional(),
});

export type MenuCategoryUpdateSchema = z.infer<typeof menuCategoryUpdateSchema>;

export type MenuCategoryCreateSchema = z.infer<typeof menuCategoryCreateSchema>;

export class MenuCategoryAlreadyExists extends Error {
  constructor() {
    super("Category already exists");
  }
}

export class MenuCategoryDoesNotExists extends Error {
  constructor() {
    super("Category does not exists");
  }
}

export class MenuCategoryUseCase {
  async create(params: MenuCategoryCreateSchema) {
    const menuCategoryRepository = new MenuCategoryRepository();

    const menuCategoryExists = await menuCategoryRepository.findByName(
      params.name,
    );

    if (menuCategoryExists) {
      throw new MenuCategoryAlreadyExists();
    }

    const menuCategory = await menuCategoryRepository.create(params);

    return menuCategory;
  }
  async update({ id, ...params }: MenuCategoryUpdateSchema) {
    const menuCategoryRepository = new MenuCategoryRepository();

    const menuExists = await menuCategoryRepository.findById(id);

    if (!menuExists) {
      throw new MenuCategoryDoesNotExists();
    }

    const menuCategory = await menuCategoryRepository.update({
      id,
      disabled: params.disabled,
      name: params.name,
    });

    return menuCategory;
  }
  async delete(menuCategoryId: MenuCategory["id"]) {
    const menuCategoryRepository = new MenuCategoryRepository();

    const menuCategoryExists = await menuCategoryRepository.findById(
      menuCategoryId,
    );

    if (!menuCategoryExists) {
      throw new MenuCategoryDoesNotExists();
    }

    const menuCategory = await menuCategoryRepository.deleteById(
      menuCategoryId,
    );

    return menuCategory;
  }
}
