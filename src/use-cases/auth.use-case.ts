import { compare } from "bcryptjs";
import { UserRepository } from "~/repositories/user.repository";

type AuthUseCaseTokenParams = {
  email: string;
  password: string;
};

export class UserDoNotExistsError extends Error {
  constructor() {
    super("Email or password incorrect.");
  }
}

export class AuthUseCase {
  static async token({ email, password }: AuthUseCaseTokenParams) {
    const userRepository = new UserRepository();

    const user = await userRepository.getByEmail(email);

    if (!user) {
      throw new UserDoNotExistsError();
    }

    const equalPassword = await compare(password, user?.password as string);

    if (!equalPassword) {
      throw new UserDoNotExistsError();
    }

    return user;
  }
}
