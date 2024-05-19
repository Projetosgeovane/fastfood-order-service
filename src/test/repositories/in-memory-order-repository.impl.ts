import { InMemoryRepositoryImpl } from './in-memory-repository.impl';
import { OrderEntity } from 'src/modules/order/domain/enterprise/order.entity';
import { OrderRepository } from 'src/modules/order/domain/application/repositories/order.repository';

export class InMemoryOrderRepositoryImpl
  extends InMemoryRepositoryImpl<OrderEntity>
  implements OrderRepository {}
