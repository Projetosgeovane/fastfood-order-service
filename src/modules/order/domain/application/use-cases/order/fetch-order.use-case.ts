import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../../repositories/order.repository";
import { OrderEntity } from "../../../enterprise/order.entity";
import { Either, failure, success } from "@enablers/core/types";

interface FetchOrderByIdUseCaseRequest {
  id: string;
}

type FetchOrderByIdUseCaseResponse = Either<
  null,
  {
    order: OrderEntity;
  }
>;
@Injectable()
export class FetchOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) { }

  async execute({id}: FetchOrderByIdUseCaseRequest): Promise<FetchOrderByIdUseCaseResponse> {
    const order = await this.orderRepository.findById(id);

    if(!order) {
      return failure(null);
    }

    return success({ order });
  }
}
