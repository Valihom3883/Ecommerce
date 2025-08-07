import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth.controller';
import { TenantAuthService } from './tenant-auth.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, TenantAuthService],
})
export class AppModule {}
