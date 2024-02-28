import { FastifyInstance } from "fastify";
import { fastifyRouteAdapter } from "~/modules/shared/adapters/fastify-route-adapter";
import { makeEditMenuCategoryController } from "./controllers/edit-menu-category-controller";
import { makeLoadMenuCategoriesByStoreController } from "./controllers/load-menu-categories-by-store-controller";

export const menuCategoriesRoutes = (app: FastifyInstance) => {
  const ROUTE = "/menu-categories" as const;
  app.patch(
    `${ROUTE}/:id`,
    fastifyRouteAdapter(makeEditMenuCategoryController())
  );

  app.get(
    `${ROUTE}/stores/:id`,
    fastifyRouteAdapter(makeLoadMenuCategoriesByStoreController())
  );
};
