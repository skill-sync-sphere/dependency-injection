import { ArgumentNullError } from "./error.ts";
import type {
  DiscountedProduct,
  IProductService,
  IUserContext,
  Role,
} from "./service.ts";

export class HomeController {
  private readonly productService: IProductService;

  constructor(productService: IProductService) {
    if (!productService) throw new ArgumentNullError("productService");

    this.productService = productService;
  }

  index() {
    const products = this.productService.getFeaturedProducts();
    const vm = new FeaturedProductsViewModel(
      products.map((x) => new ProductViewModel(x)),
    );
    this.view(vm);
  }

  private view(viewModel: FeaturedProductsViewModel) {
    viewModel.products.forEach((x) => console.log(x.summaryText));
  }
}

class FeaturedProductsViewModel {
  public readonly products: ProductViewModel[];

  constructor(products: ProductViewModel[]) {
    this.products = products;
  }
}

class ProductViewModel {
  public readonly summaryText: string;
  constructor(product: DiscountedProduct) {
    this.summaryText = `${product.name} (${product.price})`;
  }
}

export class UserContext implements IUserContext {
  private readonly args: string[];

  constructor(args: string[]) {
    if (!args) throw new ArgumentNullError("args");

    this.args = args;
  }

  isInRole(role: Role): boolean {
    return this.args[0] === role.toString();
  }
}
