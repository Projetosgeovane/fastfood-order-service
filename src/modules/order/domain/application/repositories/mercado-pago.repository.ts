export abstract class MercadoPagoRepository {
  abstract createPaymentPreference(data: any): Promise<any>;
}
