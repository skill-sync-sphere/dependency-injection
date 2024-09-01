import { IEventHandler, OrderApproved } from "./eventHandler.ts";
// Compositeパターンにより、以下のインポートは不要になる
// import { type IBillingSystem } from "./billingSystem.ts";
// import { type IMessageService } from "./messageService.ts";
// import { type IOrderFulfillment } from "./orderFulfillment.ts";
// Facadeサービスにより、以下のインポートは不要になる
// import { type ILocationService } from "./locationService.ts";
// import { type IInventoryManagement } from "./inventoryManagement.ts";

export class Order {
  private status: 'approved' | 'pending' | 'rejected' = 'pending';
  private price = 1000;
  private amount = 10;

  public constructor() {
    this.status = 'pending';
  }

  public approve() {
    this.status = 'approved';
  }

  public get isApproved(): boolean {
    return this.status === 'approved';
  }

  public createReceipt(): OrderReceipt {
    return new OrderReceipt(this.price, this.amount);
  }
}

export class OrderReceipt {
  private price: number;
  private amount: number;

  constructor(price: number, amount: number) {
    this.price = price;
    this.amount = amount;
  }
}

/**
 * 注文リポジトリインターフェース
 */
export interface IOrderRepository {
  /**
   * 注文情報を更新する
   * 
   * @param order 注文情報
   */
  save(order: Order): void;
}

/**
 * 注文サービスインターフェース
 */
interface IOrderService {
  /**
   * 注文を承認する
   * 
   * @param order 注文情報
   */
  approveOrder(order: Order): void;
}

export class OrderService implements IOrderService {
  private readonly repository: IOrderRepository;
  private readonly handler: IEventHandler<OrderApproved>;
  // private readonly notificationService: INotificationService;

  // Compositeパターンにより、以下のプロパティは不要になる
  // private readonly messageService: IMessageService;
  // private readonly billingSystem: IBillingSystem;
  // private readonly orderFulfillment: IOrderFulfillment;

  // Facadeサービスにより、以下のプロパティは不要になる
  // private readonly locationService: ILocationService;
  // private readonly inventoryManagement: IInventoryManagement;

  constructor(
    repository: IOrderRepository,
    handler: IEventHandler<OrderApproved>,
  ) {
    this.repository = repository;
    this.handler = handler;
  }

  public approveOrder(order: Order): void {
    this.updateOrder(order);
    this.handler.handle(new OrderApproved(order));
  }

  private updateOrder(order: Order): void {
    order.approve();
    this.repository.save(order);
  }

  // Compositeパターンにより、以下の処理は不要になる
  // private notify(order: Order): void {
    // this.messageService.sendReceipt(receipt);
    // this.billingSystem.notifyAccounting(order);
    // this.orderFulfillment.fulfill(order);
  // }

  // Facadeサービスにより、以下のメソッドは不要になる
  // private fulfill(order: Order): void {
  // this.locationService.findWarehouses(order);
  // this.inventoryManagement.notifyWarehouses(order);
  // }
}
