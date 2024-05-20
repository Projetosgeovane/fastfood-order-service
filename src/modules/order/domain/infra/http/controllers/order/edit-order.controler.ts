import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { EditOrderUseCase } from 'src/modules/order/domain/application/use-cases/order/edit-order.use-case';
import { EditOrderDTO } from '../../dtos/edit-order.dto';

@Controller('fos')
export class EditOrderController {
  constructor(private readonly editOrderUseCase: EditOrderUseCase) {}

  @Put('order/:orderId')
  async handle(@Param('orderId') id: string, @Body() body: EditOrderDTO) {
    const { status } = body;

    const result = await this.editOrderUseCase.execute({
      id,

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
