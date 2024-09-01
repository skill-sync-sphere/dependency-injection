import { type Order } from "./orderService.ts";

export abstract class BaseEvent {
  private readonly id: string = "";
}

export interface IEventHandler<TEvent extends BaseEvent> {
  handle(event: TEvent): void;
}

export class OrderApproved extends BaseEvent {
  public readonly order: Order;

  constructor(order: Order) {
    super();
    this.order = order;
  }
}
