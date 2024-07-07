import { ArgumentError, ArgumentNullError } from "./error.ts";
import { type IProductRepository, Product } from "./service.ts";

export class SqlProductRepository implements IProductRepository {
  private readonly context: CommerceContext;

  constructor(context: CommerceContext) {
    if (!context) throw new ArgumentNullError("context");

    this.context = context;
  }
  getFeaturedProducts(): Product[] {
    return this.context.products.filter((x) => x.isFeatured);
  }
}

export class CommerceContext {
  private readonly _connectionString: string;

  constructor(connectionString: string) {
    if (!connectionString?.trim()) {
      throw new ArgumentError(
        "connectionString should not be empty",
        "connectionString",
      );
    }

    this._connectionString = connectionString;
  }

  public products: Product[] = [
    new Product("Chocolate", 200, true),
    new Product("Asparagus", 250, false),
  ];
}
