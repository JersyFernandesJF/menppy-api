import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthUseCase, UserDoNotExistsError } from "~/use-cases/auth.use-case";

const tokenBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthController {
  static async token(req: FastifyRequest, rep: FastifyReply) {
    const params = tokenBody.parse(req.body);

    try {
      const user = await AuthUseCase.token(params);

      return rep
        .status(201)
        .send({ data: { item: user }, message: "Login success" });
    } catch (error) {
      if (error instanceof UserDoNotExistsError) {
        return rep.status(403).send({ message: error.message });
      }

      throw error;
    }
  }
}
