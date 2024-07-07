import { IProduct } from "./database.ts";
import { ProductService } from "./service.ts";

class HomeController {
  index(args: string[]): IProduct[] {
    const prodService: ProductService = new ProductService();
    const isCustomerPreferred = args[0] === "preferred";
    return prodService.getFeaturedProducts(isCustomerPreferred);
  }
}

console.log(new HomeController().index(Deno.args));
