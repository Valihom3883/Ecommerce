import { Controller, Post, Body } from '@nestjs/common';
import { TenantAuthService } from './tenant-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: TenantAuthService) {}

  @Post('login')
  async tenantLogin(@Body() credentials: { email: string; password: string }) {
    return this.authService.validateTenant(
      credentials.email,
      credentials.password
    );
  }
}
