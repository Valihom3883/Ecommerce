import { Controller, Post, Body } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(@Body() createTenantDto: { name: string; subdomain: string; tier: string }) {
    return this.tenantService.create(createTenantDto);
  }
}
