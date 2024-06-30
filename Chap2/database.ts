export interface IProduct {
  featured: boolean;
  id: string;
  name: string;
  unitPrice: number;
}

export class CommerceContext {
  get products(): IProduct[] {
    return [
      { featured: true, id: "1", name: "cookie", unitPrice: 100 },
      { featured: false, id: "2", name: "muffin", unitPrice: 200 },
    ];
  }
}
