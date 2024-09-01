import { type IEventHandler, type OrderApproved } from "./eventHandler.ts";
import { type Order } from "./orderService.ts";


export class BillingSystem implements IEventHandler<OrderApproved> {
  private notifyAccounting(order: Order): void {
    console.log(`Notify Accounting. Order is:`, order)
  }

  public handle(event: OrderApproved): void {
    this.notifyAccounting(event.order);
  }  
}
