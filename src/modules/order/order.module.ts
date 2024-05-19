import { Module } from '@nestjs/common';
import { PersistenceModule } from './domain/infra/persistence/persistence.module';
import { HttpModule } from './domain/infra/http/http.module';

@Module({
  imports: [HttpModule, PersistenceModule],
})
export class OrderModule {}
