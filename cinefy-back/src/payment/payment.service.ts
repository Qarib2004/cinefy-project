import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { PaymentStatus } from '@prisma/client';
import { PaymentDto } from './dto/payment.dto';
import { returnPaymentObject } from './return-payment.object';
import Stripe from 'stripe';
import { PaymentStatusDto } from './dto/payment-status.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private logger = new Logger(PaymentService.name);

  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {
    this.stripe = new Stripe(process.env.SECRET_KEY_STRIPE || "");
;
  }

  async checkout(dto: PaymentDto, userId: string) {
    const user = await this.userService.getById(userId);
    if(!user){
      throw new NotFoundException('user not found')
    }

    if (user.isHasPremium) {
      throw new ConflictException(
        'The user already has an active premium subscription.'
      );
    }

    const order = await this.prisma.payment.create({
      data: {
        status: dto.status,
        amount: Number(dto.amount),
        user: { connect: { id: userId } }
      }
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', 
            product_data: {
              name: 'Premium subscription'
            },
            unit_amount: Math.round(Number(dto.amount) * 100) 
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.APP_URL}/thanks`,
      cancel_url: `${process.env.APP_URL}/cancel`,
      metadata: {
        orderId: order.id,
        userId: userId
      }
    });

    return { url: session.url };
  }

  async updateStatus(dto: PaymentStatusDto) {
    if (!process.env.WEBHOOK_SECRET) {
      throw new Error('WEBHOOK_SECRET is missing');
    }
  
    const eventType = dto.event;
    const object = dto.object;
  
    switch (eventType) {
      case 'checkout.session.completed':
        if (!object.metadata?.orderId || !object.metadata?.userId) {
          throw new Error('Missing metadata in checkout session');
        }
  
        await this.prisma.payment.update({
          where: { id: object.metadata.orderId },
          data: { status: PaymentStatus.PAYED },
        });
  
        await this.prisma.user.update({
          where: { id: object.metadata.userId },
          data: { isHasPremium: true },
        });
  
        this.logger.log(`Payment #${object.metadata.orderId} successfully paid`);
        break;
  
      case 'payment_intent.succeeded':
        if (object.metadata?.orderId && object.metadata?.userId) {
          await this.prisma.payment.update({
            where: { id: object.metadata.orderId },
            data: { status: PaymentStatus.PAYED },
          });
  
          await this.prisma.user.update({
            where: { id: object.metadata.userId },
            data: { isHasPremium: true },
          });
  
          this.logger.log(`PaymentIntent #${object.id} successfully paid`);
        }
        break;
  
      case 'payment_intent.payment_failed':
        this.logger.warn(`PaymentIntent #${object.id} failed`);
        break;
  
      case 'payment_intent.canceled':
        this.logger.warn(`PaymentIntent #${object.id} canceled`);
        break;
  
      case 'charge.refunded':
        this.logger.log(`Charge #${object.id} refunded`);
        break;
  
      default:
        this.logger.log(`Unhandled Stripe event type: ${eventType}`);
        break;
    }
  
    return { received: true };
  }
  

  /*Admin requests */

  async getAll() {
    return this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      select: returnPaymentObject
    });
  }

  async delete(id: string) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
