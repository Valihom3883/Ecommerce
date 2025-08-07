import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantService {
  async resolveTenant(subdomain: string): Promise<any> {
    // TODO: implement real tenant resolution from DB
    console.log(`Resolving tenant for subdomain: ${subdomain}`);
    if (subdomain === 'test') {
      return { id: 'test-tenant-id', name: 'Test Tenant' };
    }
    return null;
  }
}
