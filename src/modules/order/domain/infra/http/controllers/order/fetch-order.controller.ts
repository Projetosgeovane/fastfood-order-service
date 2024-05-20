import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { OrdersPresenter } from '../../presenters/orders.presenter';
import { FetchOrderUseCase } from 'src/modules/order/domain/application/use-cases/order/fetch-order.use-case';

@Controller('fos')
export class FetchOrderController {
  constructor(private readonly fetchOrderUseCase: FetchOrderUseCase) {}
  @Get('order/:orderId')
  async handle(@Param('orderId') id: string) {
    const result = await this.fetchOrderUseCase.execute({ id });

    if (result.isFailure()) {
      throw new NotFoundException();
    }

    const orders = OrdersPresenter.toHTTP(result.value.order);

    return { orders };
  }
}
