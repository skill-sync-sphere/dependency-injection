import { CommerceContext, IProduct } from "./database.ts";

export class ProductService {
  private readonly dbContext: CommerceContext;
  constructor() {
    this.dbContext = new CommerceContext();
  }

  getFeaturedProducts(isCustomerPreferred: boolean): IProduct[] {
    const discount = isCustomerPreferred ? 0.95 : 1;
    return this.dbContext.products.filter((prod) => {
      return prod.featured;
    }).map((prod) => {
      return { ...prod, unitPrice: prod.unitPrice * discount };
    });
  }
}
