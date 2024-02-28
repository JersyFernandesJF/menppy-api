import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { IStoreByIdRepository, IStoreRepository } from "../../repositories";
import { ILoadStoreByIdUseCase } from "./types";

export class LoadStoreByIdUseCase extends UseCase<
  ILoadStoreByIdUseCase.Params,
  ILoadStoreByIdUseCase.Response
> {
  constructor(private readonly storesRepository: IStoreByIdRepository) {
    super();
  }

  protected async perform(
    params: ILoadStoreByIdUseCase.Params
  ): Promise<UseCaseResponse<ILoadStoreByIdUseCase.Response>> {
    const result = await this.storesRepository.load(params);

    return this.casePassed(result);
  }
}
