import { ResourceExistsError } from "@enablers/core/errors";
import { OrderEntity } from "../../../enterprise/order.entity";
import { OrderRepository } from "../../repositories/order.repository";
import { Injectable } from "@nestjs/common";
import { Either, success } from "@enablers/core/types";
import { MercadoPagoRepository } from "../../repositories/mercado-pago.repository";
import { OrdersPresenter } from "../../../infra/http/presenters/orders.presenter";
interface OrderRequest {
  customerId: string;
  totalAmount: number;
  status: string;
}

type OrderResponse = Either<ResourceExistsError, object>;
@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly mercadoPagoRepository: MercadoPagoRepository

  ) { }

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

    order.status = "PENDING"

    const savedOrder = await this.orderRepository.create(order);

    const data = OrdersPresenter.toHTTP(savedOrder);

    const preferenceId = await this.mercadoPagoRepository.createPaymentPreference(data);

    return preferenceId;

    return success({});
  }
}
