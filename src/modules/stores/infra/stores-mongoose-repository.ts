import { prisma } from "~/lib/prisma";
import { IStoreByIdRepository, IStoreRepository } from "../domain/repositories";
import { LoadStoresRepository } from "../domain/repositories/load-stores-repository";
import { LoadStoreByIdRepository } from "../domain/repositories/load-store-repository";

export class StoresPrismaRepository implements IStoreRepository {
  async load(
    params: LoadStoresRepository.Params
  ): LoadStoresRepository.Response {
    const stores = await prisma.store.findMany(params);
    const totalElements = await prisma.store.count();

    return {
      stores,
      totalElements,
    };
  }
}

export class StoreByIdPrismaRepository implements IStoreByIdRepository {
  async load(
    params: LoadStoreByIdRepository.Params
  ): LoadStoreByIdRepository.Response {
    const store = await prisma.store.findUnique({
      where: { id: params?.storeId },
      include: { menuCategories: { include: { menuItems: true } } },
    });

    return {
      store,
    };
  }
}
