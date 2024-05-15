import { Module } from "@nestjs/common";
import { MercadoPagoRepositoryImpl } from "./mercado-pago.repository.impl";
import { MercadoPagoRepository } from "../../application/repositories/mercado-pago.repository";

@Module({
  providers: [{
    useClass: MercadoPagoRepositoryImpl,
    provide: MercadoPagoRepository,
  }
  ],
  exports: [MercadoPagoRepository],
})

export class MercadoPagoModule { }
