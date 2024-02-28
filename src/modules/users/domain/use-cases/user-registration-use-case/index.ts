import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
import { UserRepository } from "../../repositories";
import { CreateUserRepository } from "../../repositories/create-user-repository";
import { EntityAlreadyExistsError } from "~/modules/shared/errors/entity-already-exists-error";
import { User } from "@prisma/client";
import { CryptographyRepository } from "~/modules/shared/protocols/cryptography";

type Params = CreateUserRepository.Params;
type Response = EntityAlreadyExistsError | User;

export class UserRegistrationUseCase extends UseCase<Params, Response> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoRepository: CryptographyRepository
  ) {
    super();
  }

  protected async perform(params: Params): Promise<UseCaseResponse<Response>> {
    const userAlreadyExists = await this.userRepository.loadByKey({
      key: { email: params.email },
    });

    if (userAlreadyExists) {
      return this.caseFailed(new EntityAlreadyExistsError("User"));
    }

    const hashedPassword = await this.cryptoRepository.hash(params.password);

    const { email, id, name } = await this.userRepository.create({
      ...params,
      password: hashedPassword,
    });

    return this.casePassed({ email, id, name });
  }
}
