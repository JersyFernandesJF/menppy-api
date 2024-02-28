import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { IStoreRepository } from "../../repositories";
import { ILoadStoresUseCase } from "./types";

export class LoadStoresUseCase extends UseCase<
  ILoadStoresUseCase.Params,
  ILoadStoresUseCase.Response
> {
  constructor(private readonly storesRepository: IStoreRepository) {
    super();
  }

  protected async perform(
    params: ILoadStoresUseCase.Params
  ): Promise<UseCaseResponse<ILoadStoresUseCase.Response>> {
    const result = await this.storesRepository.load(params);

    return this.casePassed(result);
  }
}
