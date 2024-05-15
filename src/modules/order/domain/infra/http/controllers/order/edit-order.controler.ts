import { BadRequestException, Body, Controller, NotFoundException, Param, Put } from "@nestjs/common";
import { EditOrderUseCase } from "src/modules/order/domain/application/use-cases/order/edit-order.use-case";
import { EditOrderDTO } from "../../dtos/edit-order.dto";

@Controller()
export class EditOrderController {
  constructor(private readonly editOrderUseCase: EditOrderUseCase) { }

  @Put('order/:orderId')
  async handle(@Param('orderId') id: string, @Body() body: EditOrderDTO) {
    const { customerId, totalAmount, status, } = body;

    const result = await this.editOrderUseCase.execute({
      id,
      customerId,
      totalAmount,
      status,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case Error:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
