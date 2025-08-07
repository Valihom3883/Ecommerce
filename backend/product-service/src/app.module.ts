import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TenantGuard } from './shared/guards/tenant.guard';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, TenantGuard],
})
export class AppModule {}
