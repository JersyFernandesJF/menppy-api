import { FastifyInstance } from "fastify";
import { fastifyRouteAdapter } from "~/modules/shared/adapters/fastify-route-adapter";
import { makeCreateOrderController } from "./create-order-controller";
import { makeLoadOrderController } from "./load-order-controller";
import { makeUpdateOrderController } from "./update-order-controller";

export const orderRoutes = (app: FastifyInstance) => {
  const ROUTE = "/orders" as const;

  app.post(ROUTE, fastifyRouteAdapter(makeCreateOrderController()));
  app.get(`${ROUTE}/:id`, fastifyRouteAdapter(makeLoadOrderController()));
  app.patch(`${ROUTE}/:id`, fastifyRouteAdapter(makeUpdateOrderController()));
};
