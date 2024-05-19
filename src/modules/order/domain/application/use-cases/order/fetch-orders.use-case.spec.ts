import {
  InMemoryRepositoriesProps,
  makeInMemoryRepositories,
} from 'src/test/factories/make-in-memory-repositories.factory';
import { FetchOrdersUseCase } from './fetch-orders.use-case';
import { makeOrder } from 'src/test/factories/make-payment.factory';

describe('FetchNetworksUseCase', () => {
  let inMemory: InMemoryRepositoriesProps;

  let sut: FetchOrdersUseCase;

  beforeEach(() => {
    inMemory = makeInMemoryRepositories();

    sut = new FetchOrdersUseCase(inMemory.OrderRepository);
  });

  it('should be able fetch all orders', async () => {
    const order1 = makeOrder();
    const order2 = makeOrder();
    const order3 = makeOrder();

    inMemory.OrderRepository.items.push(order1);
    inMemory.OrderRepository.items.push(order2);
    inMemory.OrderRepository.items.push(order3);

    const result = await sut.execute({ page: 1 });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.orders).toHaveLength(3);
  });
});
