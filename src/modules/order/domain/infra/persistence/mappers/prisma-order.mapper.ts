import { Prisma, Order as PrismaOrder } from "@prisma/client";
import { OrderEntity } from "../../../enterprise/order.entity";
import { UniqueEntityID } from "@enablers/core/entities";

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): OrderEntity {
    const order = OrderEntity.instance(
      {
        customerId: raw.customerId,
        totalAmount: raw.totalAmount,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return order;
  }

  static toPrisma(
    order: OrderEntity,
  ): Prisma.OrderUncheckedCreateInput {
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
