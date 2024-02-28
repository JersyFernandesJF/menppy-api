import { z } from "zod";
import { Store, StoreRepository } from "~/repositories/store.repository";

export const storeCreateSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().optional(),
  currency: z.string(),
  address: z.string(),
  photoUrl: z.string().optional(),
  notes: z.string().optional(),
});

export type StoreCreateParams = z.infer<typeof storeCreateSchema>;

export type StoreUseCaseMenuParams = {
  storeId: Store["id"];
};

export class StoreDoesNotExistsError extends Error {
  constructor() {
    super("Store does not exists!");
  }
}

export class StoreUseCase {
  async create(params: StoreCreateParams) {
    const storeRepository = new StoreRepository();

    const store = await storeRepository.create(params);

    return store;
  }

  async getMenu({ storeId }: StoreUseCaseMenuParams) {
    const storeRepository = new StoreRepository();

    const store = await storeRepository.getById(storeId);

    if (!store) {
      throw new StoreDoesNotExistsError();
    }

    const storeMenu = await storeRepository.menu(storeId);

    return storeMenu;
  }
}
