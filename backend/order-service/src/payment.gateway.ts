import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentGateway {
  async charge(amount: number, paymentData: any): Promise<{ success: boolean }> {
    console.log(`Charging ${amount} with payment data:`, paymentData);
    // In a real application, this would interact with a payment gateway like Stripe
    return { success: true };
  }
}
