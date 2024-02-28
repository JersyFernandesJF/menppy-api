import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {
  UserAlreadyExistsError,
  UserDotNotExistsError,
  UserUseCase,
  UserUseCaseGetById,
} from "~/use-cases/user.use-case";

export async function registerController(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const params = registerBodySchema.parse(req.body);

  const userUseCase = new UserUseCase();

  try {
    const user = await userUseCase.create(params);

    return rep.status(201).send({
      data: {
        item: user,
      },
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return rep.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}

export class UserController {
  static async get(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as unknown as UserUseCaseGetById;

    const userUseCase = new UserUseCase();

    try {
      const user = await userUseCase.getById({ userId });

      return reply.status(200).send({
        data: { item: user },
        message: "User found",
      });
    } catch (err) {
      if (err instanceof UserDotNotExistsError) {
        return reply.status(400).send({ message: err.message });
      }

      throw err;
    }
  }
}