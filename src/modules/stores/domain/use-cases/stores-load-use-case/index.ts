import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { IStoreRepository } from "../../repositories";
import { IStoresLoadUseCase } from "./types";

export class StoresLoadUseCase extends UseCase<
  IStoresLoadUseCase.Params,
  IStoresLoadUseCase.Response
> {
  constructor(private readonly storesRepository: IStoreRepository) {
    super();
  }

  protected async perform(
    params: IStoresLoadUseCase.Params
  ): Promise<UseCaseResponse<IStoresLoadUseCase.Response>> {
    const result = await this.storesRepository.load(params);

    return this.casePassed(result);
  }
}
