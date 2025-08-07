import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantService: TenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.headers.host || '';
    const subdomain = host.split('.')[0];

    try {
      const tenant = await this.tenantService.resolveTenant(subdomain);
      if (!tenant) {
        return res.status(404).json({ error: 'Invalid store domain' });
      }

      req['tenant'] = tenant;
      // Using a dedicated context service would be better than process.env
      // but for now this will suffice for a simple implementation.
      process.env.CURRENT_TENANT = tenant.id;
      next();
    } catch (err) {
      res.status(500).json({ error: 'Could not resolve tenant' });
    }
  }
}
