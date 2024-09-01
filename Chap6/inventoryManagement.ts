import { type Order } from "./orderService.ts";

/**
 * 倉庫の管理インターフェース
 *
 * @description 倉庫の注文を受け取る
 */
export interface IInventoryManagement {
  /**
   * 倉庫に注文のことを通知する
   * @param order 注文情報
   */
  notifyWarehouses(order: Order): void;
}

export class InventoryManagement implements IInventoryManagement {
  notifyWarehouses(order: Order) {
    console.log("notify warehouses. order is:", order);
  }
}
