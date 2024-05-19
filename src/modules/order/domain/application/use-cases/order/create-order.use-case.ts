import { ResourceExistsError } from '@enablers/core/errors';
import { OrderEntity } from '../../../enterprise/order.entity';
import { OrderRepository } from '../../repositories/order.repository';
import { Injectable } from '@nestjs/common';
import { Either, success } from '@enablers/core/types';
import { OrdersPresenter } from '../../../infra/http/presenters/orders.presenter';
import axios from 'axios';
interface OrderRequest {
  customerId: string;
  totalAmount: number;
  status: string;
}

type OrderResponse = Either<ResourceExistsError, object>;
@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({
    customerId,
    totalAmount,
    status,
  }: OrderRequest): Promise<OrderResponse> {
    const order = OrderEntity.instance({
      customerId,
      totalAmount,
      status,
    });

    order.status = 'PENDING';

    const savedOrder = await this.orderRepository.create(order);

    const data = OrdersPresenter.toHTTP(savedOrder);

    const paymentLink = await axios.post(
      'https://d0ewo299u4.execute-api.us-east-1.amazonaws.com/dev/fps/payment',
      data,
    );

    return success({
      statusCode: 201,
      paymentLink: paymentLink.data.paymentLink,
    });
  }
}
