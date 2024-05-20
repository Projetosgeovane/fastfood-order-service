import { UniqueEntityID } from '@enablers/core/entities';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import {
  OrderEntity,
  OrderEntityProps,
} from 'src/modules/order/domain/enterprise/order.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { PrismaOrderMapper } from 'src/modules/order/domain/infra/persistence/mappers/prisma-order.mapper';

export function makeOrder(
  override: Partial<OrderEntityProps> = {},
  id?: UniqueEntityID,
): OrderEntity {
  const order = OrderEntity.instance(
    {
      customerId: randomUUID(),
      totalAmount: faker.number.int({ min: 1, max: 100 }),
      status: 'PENDING',
      ...override,
    },
    id,
  );

  return order;
}

@Injectable()
export class OrderFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrder(data: Partial<OrderEntityProps> = {}) {
    const order = makeOrder(data);

    await this.prisma.order.create({
      data: PrismaOrderMapper.toPrisma(order),
    });

    return order;
  }
}
