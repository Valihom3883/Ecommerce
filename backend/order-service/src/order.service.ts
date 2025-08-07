import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async checkout(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    order.status = OrderStatus.PENDING;
    return this.ordersRepository.save(order);
  }

  async paymentSuccess(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    order.status = OrderStatus.PAID;
    return this.ordersRepository.save(order);
  }

  async paymentFailed(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    order.status = OrderStatus.FAILED;
    return this.ordersRepository.save(order);
  }

  async shipItems(orderId: string, items: any[]): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    // In a real application, you would check if all items are shipped
    order.status = OrderStatus.FULFILLED;
    return this.ordersRepository.save(order);
  }

  async shipRemaining(orderId: string, items: any[]): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    // In a real application, you would check if all items are shipped
    order.status = OrderStatus.FULFILLED;
    return this.ordersRepository.save(order);
  }

  async complete(orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    order.status = OrderStatus.COMPLETED;
    return this.ordersRepository.save(order);
  }
}
