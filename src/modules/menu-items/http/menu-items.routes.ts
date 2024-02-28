import { FastifyInstance } from "fastify";
import { fastifyRouteAdapter } from "~/modules/shared/adapters/fastify-route-adapter";
import { makeAddMenuItemController } from "./controllers";
import { makeEditMenuCategoryController } from "./controllers/edit-menu-item-controller";

export const menuItemsRoutes = (app: FastifyInstance) => {
  app.post("/menu-items", fastifyRouteAdapter(makeAddMenuItemController()));

  app.patch(
    "/menu-items/:id",
    fastifyRouteAdapter(makeEditMenuCategoryController())
  );
};
