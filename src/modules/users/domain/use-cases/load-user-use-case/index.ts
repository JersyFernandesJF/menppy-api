import { EntityNotFoundError } from "~/modules/shared/errors/entity-not-found-error";
import { UseCase, UseCaseResponse } from "~/modules/shared/classes/use-case";
 import { UserRepository } from "../../repositories";
import { User } from "@prisma/client";

interface Params {
  id: string;
}

type Response = User | EntityNotFoundError;

export class LoadUserUseCase extends UseCase<Params, Response> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  protected async perform(params: Params): Promise<UseCaseResponse<Response>> {
    const user = await this.userRepository.loadByKey({
      key: params,
    });

    if (!user) {
      return this.caseFailed(new EntityNotFoundError("User"));
    }

    return this.casePassed(user);
  }
}
