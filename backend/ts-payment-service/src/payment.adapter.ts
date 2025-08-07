import { Stripe } from 'stripe';

// Dummy env object
const env = {
  STRIPE_KEY: 'your-stripe-key'
};

// Dummy Stripe class for compilation
class DummyStripe {
  paymentIntents = {
    create: async (options: {
      amount: number;
      currency: string;
      payment_method: string;
      confirm: boolean;
    }) => {
      return {
        id: 'pi_123',
        status: 'succeeded'
      };
    }
  };
}

interface ChargeResult {
  success: boolean;
  transaction_id: string;
}

interface PaymentProvider {
  charge(amount: number, currency: string, token: string): Promise<ChargeResult>;
}

class StripeAdapter implements PaymentProvider {
  constructor(private stripe: Stripe) {}

  async charge(amount: number, currency: string, token: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: token,
      confirm: true
    });

    return {
      success: paymentIntent.status === 'succeeded',
      transaction_id: paymentIntent.id
    };
  }
}

class PayPalAdapter implements PaymentProvider {
  async charge(amount: number, currency: string, token: string): Promise<ChargeResult> {
    // Placeholder implementation for PayPal
    console.log(`Charging ${amount} ${currency} with PayPal using token ${token}`);
    return {
      success: true,
      transaction_id: 'paypal_123'
    };
  }
}

class PaymentGatewayFactory {
  static create(gatewayType: string): PaymentProvider {
    switch(gatewayType) {
      case 'stripe': return new StripeAdapter(new DummyStripe() as unknown as Stripe);
      case 'paypal': return new PayPalAdapter();
      default: throw new Error('Unsupported gateway');
    }
  }
}
