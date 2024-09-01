import { type Order } from "./orderService.ts";
/**
 * 購入された商品と届け先の住所をもとに注文された商品を箱に詰めて配送するのに最適な倉庫を選択する
 */
export interface ILocationService {
  /**
   * 注文された商品と届け先の住所をもとに最適な倉庫を選択する
   * @param order 注文情報
   */
  findWarehouses(order: Order): void;
}

export class LocationService implements ILocationService {
  findWarehouses(order: Order): void {
    console.log(`Find warehouses. Order is`, order);
  }
}
