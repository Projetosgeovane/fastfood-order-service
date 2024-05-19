import { UniqueEntityID } from '@enablers/core/entities';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import {
  OrderEntity,
  OrderEntityProps,
} from 'src/modules/order/domain/enterprise/order.entity';

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
