import { CreateUserRepository } from "./create-user-repository";
import { FindUserByKey } from "./find-user-by-key";

export type UserRepository = CreateUserRepository.Contract &
  FindUserByKey.Contract;
