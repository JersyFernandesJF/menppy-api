import { FastifyInstance } from "fastify";
import { fastifyRouteAdapter } from "~/modules/shared/adapters/fastify-route-adapter";
import { makeLoadStoreByIdController } from "./controllers/load-store-controller";
import { makeLoadStoresController } from "./controllers/load-stores-controller";

export const storesRoutes = (app: FastifyInstance) => {
  const ROUTE = "/stores" as const;

  app.get(ROUTE, fastifyRouteAdapter(makeLoadStoresController()));
  app.get(
    `${ROUTE}/:storeId`,
    fastifyRouteAdapter(makeLoadStoreByIdController())
  );
};
