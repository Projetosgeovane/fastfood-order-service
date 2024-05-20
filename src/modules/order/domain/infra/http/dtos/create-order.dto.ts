interface ProductItem {
  title: string;
  quantity: number;
  unit_price: number;
}
export class CreateOrderDTO {
  customerId: string;
  totalAmount: number;
  products: ProductItem[];
}
