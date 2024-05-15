import { BaseRepository } from "@enablers/core/repositories";
import { OrderEntity } from "../../enterprise/order.entity";
import { CreateOrderDTO } from "../../infra/http/dtos/create-order.dto";

export abstract class OrderRepository extends BaseRepository<OrderEntity> {
  abstract create(data: CreateOrderDTO): Promise<OrderEntity>;

}
