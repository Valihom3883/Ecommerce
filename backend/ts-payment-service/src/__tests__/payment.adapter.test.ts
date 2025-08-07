import { PaymentGatewayFactory } from '../payment.adapter';

describe('PaymentGatewayFactory', () => {
  it('should create a StripeAdapter', () => {
    const adapter = PaymentGatewayFactory.create('stripe');
    expect(adapter).toBeDefined();
    expect(adapter.constructor.name).toBe('StripeAdapter');
  });

  it('should create a PayPalAdapter', () => {
    const adapter = PaymentGatewayFactory.create('paypal');
    expect(adapter).toBeDefined();
    expect(adapter.constructor.name).toBe('PayPalAdapter');
  });

  it('should throw an error for an unsupported gateway', () => {
    expect(() => {
      PaymentGatewayFactory.create('unsupported');
    }).toThrow('Unsupported gateway');
  });
});
