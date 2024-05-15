import { ResourceNotFoundError } from "libs/core/src/errors";
import { OrderRepository } from "../../repositories/order.repository";
import { Injectable } from "@nestjs/common";
import { Either, failure, success } from "libs/core/src/types";

interface EditOrderUseCaseRequest {
  id: string;
  customerId: string;
  totalAmount: number;
  status: string;
}

type EditOrderUseCaseResponse = Either<ResourceNotFoundError, object>;
@Injectable()
export class EditOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) { }

  async execute({
    id,
    customerId,
    totalAmount,
    status,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      return failure(new ResourceNotFoundError('Order not found'));
    }

    order.totalAmount = totalAmount;
    order.status = status;

    await this.orderRepository.save(order);

    return success({});
  }
}
