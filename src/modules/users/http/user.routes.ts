import { FastifyInstance } from "fastify";
import { fastifyRouteAdapter } from "~/modules/shared/adapters/fastify-route-adapter";
import { makeLoadUserController } from "./controllers/load-user-controller";

export const userRoutes = (app: FastifyInstance) => {
  app.get("/users/:id", fastifyRouteAdapter(makeLoadUserController()));
};
