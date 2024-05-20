import {
  InMemoryRepositoriesProps,
  makeInMemoryRepositories,
} from 'src/test/factories/make-in-memory-repositories.factory';
import { CreateOrderUseCase } from './create-order.use-case';

describe('CreateOrderUseCase', () => {
  let inMemory: InMemoryRepositoriesProps;

  let sut: CreateOrderUseCase;

  beforeEach(() => {
    inMemory = makeInMemoryRepositories();

    sut = new CreateOrderUseCase(inMemory.OrderRepository);
  });

  it('should create a order', async () => {
    const result = (await sut.execute({
      customerId: 'customer-id',
      totalAmount: 100,
      products: [
        {
          title: 'batata',
          quantity: 1,
          unit_price: 7,
        },
        {
          title: 'salada',
          quantity: 1,
          unit_price: 10,
        },
      ],
    })) as any;

    expect(result.value.statusCode).toBe(201);
  });
});
