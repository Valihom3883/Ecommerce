class PaymentProcessor
  PCI_COMPLIANT_GATEWAYS = {
    stripe: StripeAdapter,
    paypal: PayPalAdapter,
    custom: CustomGatewayAdapter
  }

  def process(order, gateway_type)
    gateway = PCI_COMPLIANT_GATEWAYS[gateway_type].new
    transaction = gateway.charge(
      amount: order.total,
      currency: order.currency,
      token: order.payment_token
    )

    raise PaymentError unless transaction.success?

    OrderService.mark_as_paid(order.id)
    InventoryService.decrement_stock(order.line_items)
  end
end
