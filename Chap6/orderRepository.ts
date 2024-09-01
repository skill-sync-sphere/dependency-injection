import { type IOrderRepository, type Order } from "./orderService.ts";

export class OrderRepository implements IOrderRepository {
  save(order: Order): void {
    console.log('Order saved!:', order);
  }
}
