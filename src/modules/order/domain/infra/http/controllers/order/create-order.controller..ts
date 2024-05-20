import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateOrderDTO } from '../../dtos/create-order.dto';
import { CreateOrderUseCase } from 'src/modules/order/domain/application/use-cases/order/create-order.use-case';

@Controller('fos')
export class CreateOrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post('order')
  async handle(@Body() body: CreateOrderDTO) {
    const { customerId, totalAmount, products } = body;

    const result = await this.createOrderUseCase.execute({
      customerId,
      totalAmount,
      products,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case Error: {
          throw new ConflictException(error.message);
        }
        default: {
          throw new BadRequestException();
        }
      }
    }

    return result;
  }
}
