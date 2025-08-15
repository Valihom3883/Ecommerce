import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { InventoryService } from './inventory.service';
import { PaymentGateway } from './payment.gateway';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private eventEmitter: EventEmitter2,
    private inventoryService: InventoryService,
    private paymentGateway: PaymentGateway,
  ) {}

  async processPayment(orderId: string, paymentData: any) {
    const order = await this.ordersRepository.findOneBy({ id: orderId });

    try {
      const result = await this.paymentGateway.charge(
        order.total,
        paymentData
      );

      if (result.success) {
        await this.transitionStatus(orderId, OrderStatus.PAID);
        await this.inventoryService.adjustInventory(order.items, 'decrement');
        this.eventEmitter.emit('order.paid', order);
      } else {
        await this.transitionStatus(orderId, OrderStatus.FAILED);
        this.eventEmitter.emit('order.failed', { order, error: 'Payment failed' });
      }
    } catch (error) {
      await this.transitionStatus(orderId, OrderStatus.FAILED);
      this.eventEmitter.emit('order.failed', { order, error });
    }
  }

  async transitionStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    order.status = status;
    return this.ordersRepository.save(order);
  }

  async create(createOrderDto: { customer_email: string; line_items: any[]; payment_token: string }): Promise<Order> {
    // In a real application, you would calculate the total based on the line items
    const total = 100;
    const order = this.ordersRepository.create({
      tenant_id: 'fashionhub', // This would come from the tenant context
      items: createOrderDto.line_items,
      total,
      status: OrderStatus.PENDING,
    });
    await this.ordersRepository.save(order);
    await this.processPayment(order.id, createOrderDto.payment_token);
    return order;
  }
}
