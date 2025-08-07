class PaymentProcessor
  PCI_COMPLIANT_GATEWAYS = {
    stripe: StripeAdapter,
    paypal: PayPalAdapter
  }

  ALLOWED_GATEWAYS = PCI_COMPLIANT_GATEWAYS.keys.map(&:to_s)

  def process(order, gateway_type)
    gateway_str = gateway_type.to_s
    unless ALLOWED_GATEWAYS.include?(gateway_str)
      raise PaymentError, "Invalid gateway: #{gateway_type}"
    end
    gateway = PCI_COMPLIANT_GATEWAYS[gateway_str.to_sym].new
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
