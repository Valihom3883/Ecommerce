import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum OrderStatus {
  CART = 'Cart',
  PENDING = 'Pending',
  PAID = 'Paid',
  FAILED = 'Failed',
  FULFILLED = 'Fulfilled',
  PARTIALLY_FULFILLED = 'PartiallyFulfilled',
  COMPLETED = 'Completed',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenant_id: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CART,
  })
  status: OrderStatus;

  @Column('jsonb')
  items: Array<{
    product_id: string;
    quantity: number;
    price: number;
  }>;

  @Column('decimal')
  total: number;
}
