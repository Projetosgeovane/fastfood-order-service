import { Either, success } from "@enablers/core/types";
import { OrderEntity } from "../../../enterprise/order.entity";
import { OrderRepository } from "../../repositories/order.repository";
import { Injectable } from "@nestjs/common";

interface FetchOrdersUseCaseRequest {
  page: number;
}

type FetchOrdersUseCaseResponse = Either<null, { orders: OrderEntity[] }>;
@Injectable()
export class FetchOrdersUseCase {
  constructor(private orderRepository: OrderRepository) { }

  async execute({ page }: FetchOrdersUseCaseRequest): Promise<FetchOrdersUseCaseResponse> {
    const orders = await this.orderRepository.findManyRecent({ page });

    return success({ orders });
  }
}
