import { BadRequestException, Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";
import { OrdersPresenter } from "../../presenters/orders.presenter";
import { FetchOrderUseCase } from "src/modules/order/domain/application/use-cases/order/fetch-order.use-case";

@Controller()
export class FetchOrderController {
  constructor(private readonly fetchOrderUseCase: FetchOrderUseCase) { }
  @Get('order/:orderId')

  async handle(@Param('orderId') id: string) {
    const result = await this.fetchOrderUseCase.execute({ id });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const orders = OrdersPresenter.toHTTP(result.value.order);

    return { orders };
  }
}
