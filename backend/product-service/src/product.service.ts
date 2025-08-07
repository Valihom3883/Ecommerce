import { Injectable } from '@nestjs/common';

interface CreateProductDto {
  sku: string;
  price: number;
  tenant_id: string;
}

@Injectable()
export class ProductService {
  private readonly products = [];

  create(product: CreateProductDto) {
    this.products.push(product);
    return product;
  }

  count() {
    return this.products.length;
  }
}
