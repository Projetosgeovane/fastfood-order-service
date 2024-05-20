import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/modules/order/domain/application/repositories/order.repository';
import { OrderEntity } from 'src/modules/order/domain/enterprise/order.entity';
import { PrismaOrderMapper } from '../../mappers/prisma-order.mapper';
import { PrismaService } from '../../../../../../../common/database/prisma/prisma.service';
import { PaginationParams } from '@enablers/core/repositories';

@Injectable()
export class PrismaOrderRepositoryImpl implements OrderRepository {
  private readonly PERPAGE = 20;
  constructor(private readonly prisma: PrismaService) {}

  async create(data: OrderEntity): Promise<OrderEntity> {
    const order = PrismaOrderMapper.toPrisma(data);

    const createdOrder = await this.prisma.order.create({
      data: {
        ...order,
      },
    });

    return PrismaOrderMapper.toDomain(createdOrder);
  }

  async save(body: OrderEntity): Promise<void> {
    const order = PrismaOrderMapper.toPrisma(body);

    await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        customerId: order.customerId,
        totalAmount: order.totalAmount,
        status: order.status,
      },
    });
  }

  async findManyRecent({ page }: PaginationParams): Promise<OrderEntity[]> {
    const order = await this.prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: this.PERPAGE,
      skip: (page - 1) * this.PERPAGE,
    });

    return order.map(PrismaOrderMapper.toDomain);
  }

  async findById(id: string): Promise<OrderEntity> {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
      },
    });

    if (!order) {
      return null;
    }

    return PrismaOrderMapper.toDomain(order);
  }
  delete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
  softDelete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
}
