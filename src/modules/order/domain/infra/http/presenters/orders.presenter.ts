import { OrderEntity } from "../../../enterprise/order.entity";

export class OrdersPresenter {
  static toHTTP(order: OrderEntity) {
    return {
      id: order.id.toValue(),
      customerId: order.customerId,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deletedAt: order.deletedAt,
    };
  }
}
