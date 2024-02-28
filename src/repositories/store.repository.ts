import { prisma } from "~/lib/prisma";
import { User } from "./user.repository";

class Store {
  id: string;
  name: string;
  email?: string | null;
  currency: string;
  notes?: string | null;
  address?: string | null;
  photoUrl?: string | null;
  userId: User["id"];
}

type StoreCreateParams = Pick<
  Store,
  "name" | "address" | "currency" | "email" | "userId" | "notes" | "photoUrl"
>;

class StoreRepository {
  async create({ userId, ...params }: StoreCreateParams) {
    const store = prisma.store.create({
      data: {
        ...params,
        userId,
      },
    });

    return store;
  }
  async menu(storeId: Store["id"]) {
    const menu = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
      include: {
        menuCategories: {
          include: {
            menuItems: true,
          },
        },
      },
    });

    return menu?.menuCategories;
  }

  async getById(storeId: Store["id"]) {
    const store = prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    return store;
  }
}

export { Store, StoreRepository, type StoreCreateParams };
