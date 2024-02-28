import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { IStoreRepository } from "../../repositories";
import { IStoresLoadByKeyUseCase } from "./types";
import { EntityNotFoundError } from "~/modules/shared/errors/entity-not-found-error";

export class StoresLoadByKeyUseCase extends UseCase<
  IStoresLoadByKeyUseCase.Params,
  IStoresLoadByKeyUseCase.Response
> {
  constructor(private readonly storesRepository: IStoreRepository) {
    super();
  }

  protected async perform(
    params: IStoresLoadByKeyUseCase.Params
  ): Promise<UseCaseResponse<IStoresLoadByKeyUseCase.Response>> {
    const store = await this.storesRepository.loadByKey(params);

    if (!store) {
      return this.caseFailed(new EntityNotFoundError("Store"));
    }

    return this.casePassed({ store });
  }
}
