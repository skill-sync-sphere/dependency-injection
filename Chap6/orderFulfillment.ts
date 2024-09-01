import { IEventHandler, OrderApproved } from "./eventHandler.ts";
import { type IInventoryManagement } from "./inventoryManagement.ts";
import { type ILocationService } from "./locationService.ts";
import { type Order } from "./orderService.ts";

export class OrderFulfillment implements IEventHandler<OrderApproved> {
  private readonly locationService: ILocationService;
  private readonly inventoryManagement: IInventoryManagement;

  constructor(
    locationService: ILocationService,
    inventoryManagement: IInventoryManagement,
  ) {
    this.locationService = locationService;
    this.inventoryManagement = inventoryManagement;
  }

  private fulfill(order: Order): void {
    this.locationService.findWarehouses(order);
    this.inventoryManagement.notifyWarehouses(order);
  }

  public handle(event: OrderApproved): void {
    this.fulfill(event.order);
  }
}
