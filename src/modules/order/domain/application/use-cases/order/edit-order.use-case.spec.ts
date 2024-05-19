import {
  InMemoryRepositoriesProps,
  makeInMemoryRepositories,
} from 'src/test/factories/make-in-memory-repositories.factory';
import { EditOrderUseCase } from './edit-order.use-case';
import { makeOrder } from 'src/test/factories/make-payment.factory';

describe('EditOrderUseCase', () => {
  let inMemory: InMemoryRepositoriesProps;

  let sut: EditOrderUseCase;

  beforeEach(() => {
    inMemory = makeInMemoryRepositories();

    sut = new EditOrderUseCase(inMemory.OrderRepository);
  });

  it('should create a order', async () => {
    const order = makeOrder();

    inMemory.OrderRepository.items.push(order);

    const request = {
      id: order.id.toValue(),
      status: 'approved',
    };

    const result = (await sut.execute(request)) as any;

    console.log(result);

    expect(inMemory.OrderRepository.items[0].status).toBe('approved');
    expect(inMemory.OrderRepository.items[0].id.toValue()).toBe(
      order.id.toValue(),
    );
    expect(result.isSuccess()).toBe(true);
  });
});
