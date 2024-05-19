import { BaseRepository } from '@enablers/core/repositories';
import { OrderEntity } from '../../enterprise/order.entity';

export abstract class OrderRepository extends BaseRepository<OrderEntity> {}
