import { ResourceExistsError } from '@enablers/core/errors';
import { OrderEntity } from '../../../enterprise/order.entity';
import { OrderRepository } from '../../repositories/order.repository';
import { Injectable } from '@nestjs/common';
import { Either, success } from '@enablers/core/types';
import { OrdersPresenter } from '../../../infra/http/presenters/orders.presenter';
import axios from 'axios';
interface ProductItem {
  title: string;
  quantity: number;
  unit_price: number;
}
interface OrderRequest {
  customerId: string;
  totalAmount: number;
  products: ProductItem[];
}

type OrderResponse = Either<ResourceExistsError, object>;
@Injectable()
export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute({
    customerId,
    totalAmount,
    products,
  }: OrderRequest): Promise<OrderResponse> {
    const order = OrderEntity.instance({
      customerId,
      totalAmount,
      status: 'PENDING',
    });

    const savedOrder = await this.orderRepository.create(order);

    const data = OrdersPresenter.toHTTP(savedOrder);

    const paymentLink = await axios.post(
      'https://d0ewo299u4.execute-api.us-east-1.amazonaws.com/dev/fps/payment',
      {
        id: data.id,
        customerId: data.customerId,
        totalAmount: data.totalAmount,
        status: data.status,
        products,
      },
    );

    return success({
      statusCode: 201,
      paymentLink: paymentLink.data.value.paymentLink,
    });
  }
}
