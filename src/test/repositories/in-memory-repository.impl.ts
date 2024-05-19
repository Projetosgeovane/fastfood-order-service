import { BaseRepository, PaginationParams } from '@enablers/core/repositories';
import { OrderEntity } from 'src/modules/order/domain/enterprise/order.entity';

/**
 * Classe que gerencia uma coleção de itens com suporte a soft delete.
 * @param < T > Tipo do item gerenciado pela classe.
 */
export class InMemoryRepositoryImpl<T> extends BaseRepository<T> {
  public items: T[] = [];
  protected readonly PERPAGE = 20;

  async save(data: T): Promise<void> {
    const index = this.items.findIndex(
      (item) =>
        (item as any).id.toString() === (data as any).id &&
        !(item as any).deletedAt,
    );
    if (index !== -1) {
      this.items[index] = data;
    }
  }

  async create(data: T): Promise<OrderEntity> {
    this.items.push(data);
    return data as any;
  }

  async findManyRecent({ page }: PaginationParams): Promise<T[]> {
    const items = this.items
      .filter((item: any) => !item.deletedAt)
      .sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * this.PERPAGE, page * this.PERPAGE);

    return items;
  }

  async findById(id: string): Promise<T | null> {
    const item = this.items.find((item) => (item as any).id.toString() === id);
    if (item) {
      return item;
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex(
      (item) => (item as any).id.toString() === id && !(item as any).deletedAt,
    );
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
