import { type OrderReceipt } from "./orderService.ts";
import { type IEventHandler, type OrderApproved } from "./eventHandler.ts";

export class MessageService implements IEventHandler<OrderApproved> {
  private sendReceipt(orderReceipt: OrderReceipt): void {
    console.log(`Send Receipt:`, orderReceipt);
  }

  public handle(event: OrderApproved): void {
    const orderReceipt = event.order.createReceipt();
    this.sendReceipt(orderReceipt);
  }
}
