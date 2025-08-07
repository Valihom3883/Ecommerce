import { Controller, Post, Body, UseGuards, HttpException, HttpStatus, Req } from '@nestjs/common';
import { TenantGuard } from './shared/guards/tenant.guard';
import { ProductService } from './product.service';
import { Request } from 'express';

interface CreateProductDto {
  sku: string;
  price: number;
}

@Controller('products')
@UseGuards(TenantGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Req() request: Request) {
    // Validate inventory limits based on tenant tier
    await this.validateProductQuota(request);

    return this.productService.create({
      ...createProductDto,
      tenant_id: request['tenant'].id
    });
  }

  private async validateProductQuota(request: Request) {
    const productCount = await this.productService.count();
    const maxProducts = request['tenant'].config.max_products;

    if (productCount >= maxProducts) {
      throw new HttpException(
        `Product limit reached (${maxProducts})`,
        HttpStatus.PAYMENT_REQUIRED
      );
    }
  }
}
