import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OrdersPresenter } from '../../presenters/orders.presenter';
import { FetchOrdersUseCase } from 'src/modules/order/domain/application/use-cases/order/fetch-orders.use-case';

@Controller('fos')
export class FetchOrdersController {
  constructor(private readonly fetchOrdersUseCase: FetchOrdersUseCase) {}

  @Get('orders')
  async handle(@Query('page', ParseIntPipe) page: number) {
    const result = await this.fetchOrdersUseCase.execute({ page });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const orders = result.value.orders.map(OrdersPresenter.toHTTP);

    return { orders };
  }
}
