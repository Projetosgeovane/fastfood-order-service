import { Module } from '@nestjs/common';
import { CreateOrderController } from './controllers/order/create-order.controller.';
import { PersistenceModule } from '../persistence/persistence.module';
import { FetchOrdersController } from './controllers/order/fetch-orders.controller';
import { EditOrderController } from './controllers/order/edit-order.controler';
import { FetchOrderController } from './controllers/order/fetch-order.controller';
import { CreateOrderUseCase } from '../../application/use-cases/order/create-order.use-case';
import { FetchOrderUseCase } from '../../application/use-cases/order/fetch-order.use-case';
import { EditOrderUseCase } from '../../application/use-cases/order/edit-order.use-case';
import { FetchOrdersUseCase } from '../../application/use-cases/order/fetch-orders.use-case';
import { OrderMessageController } from './controllers/order/order-message.controller';

@Module({
  imports: [PersistenceModule],
  controllers: [
    OrderMessageController,
    CreateOrderController,
    FetchOrdersController,
    FetchOrderController,
    EditOrderController,
  ],
  providers: [
    CreateOrderUseCase,
    FetchOrdersUseCase,
    FetchOrderUseCase,
    EditOrderUseCase,
  ],
})
export class HttpModule { }
