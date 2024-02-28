import { hash } from "bcryptjs";
import {
  User,
  UserCreateParams,
  UserRepository,
} from "~/repositories/user.repository";

type UserUseCaseCreate = Omit<
  UserCreateParams,
  "password_hash" | "stores" | "id"
> & {
  password: string;
};

export type UserUseCaseGetById = {
  userId: User["id"];
};

class UserAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists");
  }
}

export class UserDotNotExistsError extends Error {
  constructor() {
    super("User does not exists");
  }
}

class UserUseCase {
  async create({ email, name, password }: UserUseCaseCreate) {
    const userRepository = new UserRepository();

    const userWithSameEmail = await userRepository.getByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 2);
    const user = await userRepository.create({
      email,
      name,
      password: passwordHash,
    });

    return user;
  }

  async getById({ userId }: UserUseCaseGetById) {
    const userRepository = new UserRepository();

    const user = await userRepository.getById(userId);

    if (!user) {
      throw new UserDotNotExistsError();
    }

    return user;
  }
}

export { UserAlreadyExistsError, UserUseCase };
