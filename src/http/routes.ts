import { FastifyInstance } from "fastify";
import { menuCategoriesRoutes } from "~/modules/menu-categories/http/menu-categories.routes";
import { menuItemsRoutes } from "~/modules/menu-items/http/menu-items.routes";
import { orderRoutes } from "~/modules/orders/http/controllers/orders.routes";
import { storesRoutes } from "~/modules/stores/http/stores.routes";
import { authRoutes } from "~/modules/users/http/auth.routes";
import { userRoutes } from "~/modules/users/http/user.routes";
import { AuthController } from "./controllers/auth.controller";
import { MenuCategoryController } from "./controllers/menu-category.controller";
import { StoreController } from "./controllers/store.controller";
import { registerController } from "./controllers/user.controller";

export async function appV1Routes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/auth/token", AuthController.token);

  app.post("/stores", StoreController.create);
  app.get("/stores/:storeId/menu", StoreController.getMenu);
  app.post("/stores/:storeId/menu-categories", MenuCategoryController.create);

  storesRoutes(app);
  menuCategoriesRoutes(app);
  authRoutes(app);
  userRoutes(app);
  menuItemsRoutes(app);
  orderRoutes(app);
}
