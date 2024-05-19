import { OrderEntity } from 'src/modules/order/domain/enterprise/order.entity';
import { PaginationParams } from './pagination-params.contract';
export abstract class BaseRepository<T> {
  abstract create(data: T): Promise<OrderEntity>;
  abstract save(data: T): Promise<void>;
  abstract findManyRecent(page: PaginationParams): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract delete(id: string): Promise<void>;
}
