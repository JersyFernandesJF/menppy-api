import { FastifyInstance } from "fastify";
import { fastifyRouteAdapter } from "~/modules/shared/adapters/fastify-route-adapter";
import { makeRegisterUserController } from "./controllers/register-user-controller";
import { makeLoginController } from "./controllers/login-user-controller";

export const authRoutes = (app: FastifyInstance) => {
  const ROUTE = "/pc/auth" as const;

  app.post(
    `${ROUTE}/register`,
    fastifyRouteAdapter(makeRegisterUserController())
  );
  app.post(`${ROUTE}/login`, fastifyRouteAdapter(makeLoginController()));
};
