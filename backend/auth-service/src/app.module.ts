import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { TenantAuthService } from './tenant-auth.service';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { TenantService } from './tenant/tenant.service';
import { TenantsController } from './tenant/tenants.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, TenantsController],
  providers: [AppService, TenantAuthService, TenantService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes('*');
  }
}
