import { Module } from "@nestjs/common";
import { OrderRepository } from "../../application/repositories/order.repository";
import { DatabaseModule } from "../../../../../common/database/database.module";
import { PrismaOrderRepositoryImpl } from "./prisma/repositories/prisma-order.repository.impl";

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      useClass: PrismaOrderRepositoryImpl,
      provide: OrderRepository,
    }
  ],

  exports: [OrderRepository],
})

export class PersistenceModule { }
