import { prisma } from "~/lib/prisma";
import { IStoreRepository } from "../domain/repositories";
import { LoadStoresRepository } from "../domain/repositories/load-stores-repository";
import { LoadStoreByKey } from "../domain/repositories/load-store-by-key";

export class StoresPrismaRepository implements IStoreRepository {
  async load(
    params: LoadStoresRepository.Params
  ): LoadStoresRepository.Response {
    try {
      const stores = await prisma.store.findMany({});
      const totalElements = await prisma.store.count();

      return {
        stores,
        totalElements,
      };
    } catch (error) {
      console.log(error);
      return {
        stores: [],
        totalElements: 0,
      };
    }
  }

  async loadByKey(params: LoadStoreByKey.Params): LoadStoreByKey.Response {
    try {
      const store = await prisma.store.findFirst({
        where: params.key,
      });

      return store;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const storesPrismaRepository = new StoresPrismaRepository();
