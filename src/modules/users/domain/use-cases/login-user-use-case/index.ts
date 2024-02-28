import { EntityNotFoundError } from "~/modules/shared/errors/entity-not-found-error";
import { OperationFailedError } from "~/modules/shared/errors/operation-failed-error";
import { CryptographyRepository } from "~/modules/shared/protocols/cryptography";
import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { UserRepository } from "../../repositories";
import { ILoginUserCase } from "./helpers";

export class LoginUserCase extends UseCase<
  ILoginUserCase.Params,
  ILoginUserCase.Response
> {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly cryptoRepo: CryptographyRepository
  ) {
    super();
  }

  protected async perform(
    params: ILoginUserCase.Params
  ): Promise<UseCaseResponse<ILoginUserCase.Response>> {
    const user = await this.userRepo.loadByKey({
      key: { email: params.email },
    });

    if (!user) {
      return this.caseFailed(new EntityNotFoundError("User"));
    }

    const { password, ...data } = user;

    const isPasswordValid = await this.cryptoRepo.hashCompare({
      hash: user.password,
      value: params.password,
    });

    if (!isPasswordValid) {
      return this.caseFailed(new OperationFailedError('Password or email is incorrect'));
    }

    const accessToken = await this.cryptoRepo.encrypt(user.id);

    return this.casePassed({
      accessToken,
      user: data,
    });
  }
}
