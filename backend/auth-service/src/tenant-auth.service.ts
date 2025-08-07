import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantAuthService {
  async validateTenant(email: string, pass: string): Promise<any> {
    // TODO: implement real validation
    console.log('Validating tenant...', { email });
    if (email === 'admin@example.com' && pass === 'password') {
      return { userId: 1, username: 'admin' };
    }
    return null;
  }
}
