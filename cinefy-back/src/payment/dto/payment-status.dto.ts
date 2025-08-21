export class PaymentStatusDto {
    event:
      | 'checkout.session.completed'
      | 'payment_intent.succeeded'
      | 'payment_intent.payment_failed'
      | 'payment_intent.canceled'
      | 'charge.refunded';
  
    type: string;
  
    object: {
      id: string;
      object: string;
      amount?: number;      
      currency?: string;
      status?: string;
      metadata?: { orderId: string; userId: string };
      payment_intent?: string;
      customer_email?: string;
      charges?: any;
      [key: string]: any;    
    };
  }
  