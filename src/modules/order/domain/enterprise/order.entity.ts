import { Optional } from '@enablers/core/types';
import { Entity, UniqueEntityID } from '../../../../../libs/core/src/entities';

export interface OrderEntityProps {
  customerId: string;
  totalAmount: number;
  status: string;

  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class OrderEntity extends Entity<OrderEntityProps> {
  static instance(
    props: Optional<OrderEntityProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const order = new OrderEntity(
      {
        customerId: props.customerId ?? null,
        totalAmount: props.totalAmount ?? null,
        status: props.status ?? null,
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? null,
        deletedAt: props.deletedAt ?? null,
        ...props,
      },
      id,
    );

    return order;
  }

  get customerId() {
    return this.props.customerId;
  }

  get totalAmount() {
    return this.props.totalAmount;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  set totalAmount(value: number) {
    this.props.totalAmount = value;
  }

  set status(value: string) {
    this.props.status = value;
  }
}
