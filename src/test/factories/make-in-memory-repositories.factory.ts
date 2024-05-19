import { InMemoryOrderRepositoryImpl } from '../repositories/in-memory-order-repository.impl';

export interface InMemoryRepositoriesProps {
  OrderRepository: InMemoryOrderRepositoryImpl;
}

export function makeInMemoryRepositories(): InMemoryRepositoriesProps {
  const inMemoryOrderRepositoryImpl = new InMemoryOrderRepositoryImpl();

  return {
    OrderRepository: inMemoryOrderRepositoryImpl,
  };
}
