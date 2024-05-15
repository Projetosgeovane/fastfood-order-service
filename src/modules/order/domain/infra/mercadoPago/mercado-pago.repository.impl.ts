import axios from "axios";
import { MercadoPagoRepository } from "../../application/repositories/mercado-pago.repository";
import { OrderEntity } from "../../enterprise/order.entity";

export class MercadoPagoRepositoryImpl implements MercadoPagoRepository {
  async createPaymentPreference(order: OrderEntity): Promise<any> {
    const preference = {
      items: [
        {
          title: `Order ${order.id}`,
          quantity: 1,
          unit_price: order.totalAmount,
        },
      ],
      external_reference: order.id, // Inclui o orderId como referência externa
      notification_url: 'https://meusite.com/webhook/mercadopago', // URL do webhook
    };

    try {
      const response = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        preference,
        {
          headers: {
            Authorization: `Bearer TEST-5148163482070323-051422-5e57fc832220c233c8b774a256d9c2e7-1812283594`,
          },
        }
      );

      return response.data.init_point; //
    } catch (error) {
      return error;
    }

  }
}
