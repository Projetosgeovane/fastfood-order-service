import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('orders')
export class OrderMessageController {
  @EventPattern('order_created')
  async handleOrderCreated(data: any) {
    // Processar o pedido criado
    console.log('Order Created:', data);
    // Notificar a cozinha ou outros serviços conforme necessário
  }
}
