import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenant_id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('jsonb')
  variants: Array<{
    sku: string;
    price: number;
    inventory: number;
    options: Record<string, string>;
  }>;

  @Column('text', { array: true })
  categories: string[];
}
