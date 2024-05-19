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
      status: 'PENDING',
      totalAmount: 100,
    })) as any;

    expect(result.value.statusCode).toBe(201);
  });
});
