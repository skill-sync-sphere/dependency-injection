import { Order, OrderService } from "./orderService.ts";
import { MessageService } from "./messageService.ts";
import { BillingSystem } from "./billingSystem.ts";
import { OrderFulfillment } from "./orderFulfillment.ts";
import { OrderRepository } from "./orderRepository.ts";
import { LocationService } from "./locationService.ts";
import { InventoryManagement } from "./inventoryManagement.ts";
import { CompositeEventHandler } from "./notificationService.ts";

const controller = new OrderService(
  new OrderRepository(),
  new CompositeEventHandler([
    new MessageService(),
    new BillingSystem(),
    new OrderFulfillment(new LocationService(), new InventoryManagement()),
  ])
  // Compositeサービスにより、以下の引数が不要になる
  // new MessageService(),
  // new BillingSystem(),
  // new OrderFulfillment(new LocationService(), new InventoryManagement()),
  // Facadeサービスにより、以下の引数が不要になる
  // new LocationService(),
  // new InventoryManagement(),
);

const order = new Order();
console.log("Order before approve:", order);
controller.approveOrder(order);
