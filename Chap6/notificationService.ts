import { type BaseEvent, type IEventHandler } from "./eventHandler.ts";

export class CompositeEventHandler<TEvent extends BaseEvent>
  implements IEventHandler<TEvent>
{
  private readonly handlers: IEventHandler<TEvent>[];

  public constructor(handlers: IEventHandler<TEvent>[]) {
    this.handlers = handlers;
  }

  public handle(event: TEvent): void {
    this.handlers.forEach((handler) => handler.handle(event));
  }
}
