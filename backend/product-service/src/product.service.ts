import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

interface CreateProductDto {
  title: string;
  description: string;
  variants: Array<{
    sku: string;
    price: number;
    inventory: number;
    options: Record<string, string>;
  }>;
  categories: string[];
  tenant_id: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async count(): Promise<number> {
    return this.productsRepository.count();
  }
}
