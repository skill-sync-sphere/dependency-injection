import { ProductService } from "./service.ts";

class HomeController {
  index(args: string[]) {
    const prodService: ProductService = new ProductService();
    const isCustomerPreferred = args[0] === "preferred";
    return prodService.getFeaturedProducts(isCustomerPreferred);
  }
}

console.log(new HomeController().index(Deno.args));
