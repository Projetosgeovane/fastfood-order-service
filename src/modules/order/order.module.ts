import { Module } from '@nestjs/common';
import { PersistenceModule } from './domain/infra/persistence/persistence.module';
import { HttpModule } from './domain/infra/http/http.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    HttpModule,
    PersistenceModule,
    ClientsModule.register([
      {
        name: 'ORCHESTRATOR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'order_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class OrderModule { }
