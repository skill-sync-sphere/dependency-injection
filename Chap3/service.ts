import { ArgumentNullError } from "./error.ts";

export interface IProductService {
  getFeaturedProducts(): DiscountedProduct[];
}

export class ProductService implements IProductService {
  private readonly repository: IProductRepository;
  private readonly userContext: IUserContext;

  constructor(repository: IProductRepository, userContext: IUserContext) {
    if (!repository) throw new ArgumentNullError("repository");
    if (!userContext) throw new ArgumentNullError("userContext");

    this.repository = repository;
    this.userContext = userContext;
  }

  getFeaturedProducts(): DiscountedProduct[] {
    return this.repository.getFeaturedProducts().map((x) =>
      x.applyDiscountFor(this.userContext)
    );
  }
}

export class DiscountedProduct {
  public readonly name: string;
  public readonly price: number;
  constructor(name: string, price: number) {
    if (name == null) throw new ArgumentNullError("name");

    this.name = name;
    this.price = price;
  }
}

export interface IProductRepository {
  getFeaturedProducts(): Product[];
}

export class Product {
  name: string = "";
  unitPrice: number = 0;
  isFeatured: boolean = false;

  constructor(name: string, unitPrice: number, isFeatured: boolean) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.isFeatured = isFeatured;
  }

  applyDiscountFor(user: IUserContext) {
    const preferred = user.isInRole(Role.PreferredCustomer);
    const discount = preferred ? 0.95 : 1.0;
    return new DiscountedProduct(this.name, this.unitPrice * discount);
  }
}

export interface IUserContext {
  isInRole(role: Role): boolean;
}

export enum Role {
  PreferredCustomer = "preferred",
}
