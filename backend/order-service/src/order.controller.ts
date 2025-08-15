import { Controller, Post, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: { customer_email: string; line_items: any[]; payment_token: string }) {
    return this.orderService.create(createOrderDto);
  }

  @Post(':id/checkout')
  checkout(@Param('id') id: string) {
    return this.orderService.checkout(id);
  }

  @Post(':id/payment-success')
  paymentSuccess(@Param('id') id: string) {
    return this.orderService.paymentSuccess(id);
  }

  @Post(':id/payment-failed')
  paymentFailed(@Param('id') id: string) {
    return this.orderService.paymentFailed(id);
  }

  @Post(':id/ship-items')
  shipItems(@Param('id') id: string, @Body() body: { items: any[] }) {
    return this.orderService.shipItems(id, body.items);
  }

  @Post(':id/ship-remaining')
  shipRemaining(@Param('id') id: string, @Body() body: { items: any[] }) {
    return this.orderService.shipRemaining(id, body.items);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    return this.orderService.complete(id);
  }
}
