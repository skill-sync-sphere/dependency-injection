import { HomeController, UserContext } from "./controller.ts";
import { CommerceContext, SqlProductRepository } from "./database.ts";
import { ProductService } from "./service.ts";

const controller = new HomeController(
  new ProductService(
    new SqlProductRepository(new CommerceContext("hogehoge")),
    new UserContext(Deno.args),
  ),
);

controller.index();
