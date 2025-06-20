import paypal from '@paypal/checkout-server-sdk'
import { supabase } from '@/lib/supabase'
import { AuthService } from '@/lib/auth'

// PayPal environment setup
const environment = process.env.PAYPAL_ENVIRONMENT === 'production' 
  ? new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT_ID!,
      process.env.PAYPAL_CLIENT_SECRET!
    )
  : new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID!,
      process.env.PAYPAL_CLIENT_SECRET!
    )

const client = new paypal.core.PayPalHttpClient(environment)

export interface PayPalSubscriptionPlan {
  name: string
  description: string
  billing_cycles: Array<{
    frequency: {
      interval_unit: 'MONTH' | 'YEAR'
      interval_count: number
    }
    tenure_type: 'REGULAR'
    sequence: number
    total_cycles: number
    pricing_scheme: {
      fixed_price: {
        value: string
        currency_code: string
      }
    }
  }>
  payment_preferences: {
    auto_bill_outstanding: boolean
    setup_fee_failure_action: 'CONTINUE' | 'CANCEL'
    payment_failure_threshold: number
  }
}

export class PayPalService {
  static async createProduct(): Promise<string> {
    const request = new paypal.v1.billing.ProductsCreateRequest()
    request.requestBody({
      name: 'NateTube Receipt Generator',
      description: 'Professional receipt generation service',
      type: 'SERVICE',
      category: 'SOFTWARE'
    })

    try {
      const response = await client.execute(request)
      return response.result.id
    } catch (error) {
      console.error('PayPal product creation error:', error)
      await this.logPaymentError('product_creation', error)
      throw new Error('Failed to create PayPal product')
    }
  }

  static async createSubscriptionPlan(productId: string): Promise<string> {
    // Create the monthly subscription plan ($5/month)
    const planData: PayPalSubscriptionPlan = {
      name: 'NateTube Monthly Plan',
      description: 'Monthly access to NateTube receipt generator',
      billing_cycles: [
        {
          frequency: {
            interval_unit: 'MONTH',
            interval_count: 1
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0, // Unlimited cycles
          pricing_scheme: {
            fixed_price: {
              value: '5.00',
              currency_code: 'USD'
            }
          }
        }
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3
      }
    }

    const request = new paypal.v1.billing.PlansCreateRequest()
    request.requestBody({
      product_id: productId,
      ...planData
    })

    try {
      const response = await client.execute(request)
      return response.result.id
    } catch (error) {
      console.error('PayPal plan creation error:', error)
      await this.logPaymentError('plan_creation', error)
      throw new Error('Failed to create PayPal subscription plan')
    }
  }

  static async createSubscription(
    userId: string, 
    returnUrl: string, 
    cancelUrl: string
  ): Promise<any> {
    try {
      // Get or create product if needed
      const productId = process.env.PAYPAL_PRODUCT_ID || await this.createProduct()
      
      // Get or create plan if needed
      const planId = process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID || await this.createSubscriptionPlan(productId)
      
      const request = new paypal.v1.billing.SubscriptionsCreateRequest()
      request.requestBody({
        plan_id: planId,
        application_context: {
          brand_name: 'NateTube',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          payment_method: {
            payer_selected: 'PAYPAL',
            payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
          },
          return_url: returnUrl,
          cancel_url: cancelUrl
        }
      })

      const response = await client.execute(request)
      
      // Log the initial subscription record
      await this.storePaymentRecord({
        user_id: userId,
        payment_method: 'paypal',
        payment_provider: 'paypal',
        payment_id: response.result.id,
        amount: 5.00,
        currency: 'USD',
        status: 'pending',
        subscription_type: 'monthly',
        subscription_period_start: new Date(),
        subscription_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        metadata: response.result
      })

      return response.result
    } catch (error) {
      console.error('PayPal subscription creation error:', error)
      await this.logPaymentError('subscription_creation', error, userId)
      throw new Error('Failed to create PayPal subscription')
    }
  }

  static async captureOrder(orderId: string): Promise<any> {
    try {
      const request = new paypal.orders.OrdersCaptureRequest(orderId)
      request.requestBody({})
      const response = await client.execute(request)
      return response.result
    } catch (error) {
      console.error('PayPal order capture error:', error)
      await this.logPaymentError('order_capture', error)
      throw new Error('Failed to capture PayPal order')
    }
  }

  static async getSubscription(subscriptionId: string): Promise<any> {
    const request = new paypal.v1.billing.SubscriptionsGetRequest(subscriptionId)
    
    try {
      const response = await client.execute(request)
      return response.result
    } catch (error) {
      console.error('PayPal subscription fetch error:', error)
      await this.logPaymentError('subscription_fetch', error)
      throw new Error('Failed to fetch PayPal subscription')
    }
  }

  static async cancelSubscription(subscriptionId: string, userId: string, reason: string): Promise<boolean> {
    const request = new paypal.v1.billing.SubscriptionsCancelRequest(subscriptionId)
    request.requestBody({
      reason: reason
    })

    try {
      await client.execute(request)
      
      // Update subscription status in database
      await supabase
        .from('payments')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString(),
          metadata: { cancellation_reason: reason }
        })
        .eq('payment_id', subscriptionId)
      
      return true
    } catch (error) {
      console.error('PayPal subscription cancellation error:', error)
      await this.logPaymentError('subscription_cancellation', error, userId)
      throw new Error('Failed to cancel PayPal subscription')
    }
  }

  static async processOneTimePayment(
    userId: string,
    orderId: string,
    payerId: string,
    amount: number
  ): Promise<boolean> {
    try {
      // Store payment record for one-time payment
      await this.storePaymentRecord({
        user_id: userId,
        payment_method: 'paypal',
        payment_provider: 'paypal',
        payment_id: orderId,
        amount: amount,
        currency: 'USD',
        status: 'completed',
        subscription_type: 'one-time',
        subscription_period_start: new Date(),
        subscription_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year for lifetime
        metadata: { payer_id: payerId }
      })

      // Update user subscription status
      await AuthService.updateSubscription(
        userId,
        'one-time',
        'active',
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        orderId
      )

      // Update user payment status
      await supabase
        .from('users')
        .update({ 
          has_paid: true,
          payment_method: 'paypal',
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      return true
    } catch (error) {
      console.error('PayPal one-time payment processing error:', error)
      await this.logPaymentError('one_time_payment', error, userId)
      throw new Error('Failed to process one-time payment')
    }
  }
  
  static async storePaymentRecord(paymentData: {
    user_id: string
    payment_method: string
    payment_provider: string
    payment_id: string
    amount: number
    currency: string
    status: string
    subscription_type: string
    subscription_period_start: Date
    subscription_period_end: Date
    metadata?: any
  }): Promise<void> {
    try {
      await supabase.from('payments').insert(paymentData)
    } catch (error) {
      console.error('Error storing payment record:', error)
      throw new Error('Failed to store payment record')
    }
  }

  static async logPaymentError(
    errorType: string, 
    error: any, 
    userId?: string
  ): Promise<void> {
    try {
      await supabase.from('payment_errors').insert({
        user_id: userId || null,
        error_type: errorType,
        error_message: error.message || 'Unknown error',
        error_details: JSON.stringify(error),
        created_at: new Date().toISOString()
      })
    } catch (logError) {
      console.error('Failed to log payment error:', logError)
    }
  }

  static async handleWebhookEvent(event: any): Promise<void> {
    try {
      const eventType = event.event_type
      const resource = event.resource

      if (eventType === 'BILLING.SUBSCRIPTION.CREATED') {
        // Subscription was created but not yet active
        await supabase
          .from('payments')
          .update({ 
            status: 'created',
            updated_at: new Date().toISOString(),
            metadata: { ...resource }
          })
          .eq('payment_id', resource.id)
      
      } else if (eventType === 'BILLING.SUBSCRIPTION.ACTIVATED') {
        // Subscription is now active after first payment
        const user = await this.getUserBySubscriptionId(resource.id)
        if (user) {
          await AuthService.updateSubscription(
            user.id,
            'monthly',
            'active',
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            resource.id
          )

          await supabase
            .from('users')
            .update({ 
              has_paid: true,
              payment_method: 'paypal',
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id)
            
          await supabase
            .from('payments')
            .update({ 
              status: 'active',
              updated_at: new Date().toISOString(),
              metadata: { ...resource }
            })
            .eq('payment_id', resource.id)
        }
      
      } else if (eventType === 'BILLING.SUBSCRIPTION.CANCELLED') {
        // Handle subscription cancellation
        await supabase
          .from('payments')
          .update({ 
            status: 'cancelled',
            updated_at: new Date().toISOString(),
            metadata: { ...resource }
          })
          .eq('payment_id', resource.id)
      
      } else if (eventType === 'BILLING.SUBSCRIPTION.PAYMENT.FAILED') {
        // Handle payment failure
        await supabase
          .from('payments')
          .update({ 
            status: 'payment_failed',
            updated_at: new Date().toISOString(),
            metadata: { ...resource }
          })
          .eq('payment_id', resource.id)
      }
    } catch (error) {
      console.error('Error handling PayPal webhook:', error)
      await this.logPaymentError('webhook_processing', error)
    }
  }

  private static async getUserBySubscriptionId(subscriptionId: string): Promise<any> {
    const { data } = await supabase
      .from('payments')
      .select('user_id')
      .eq('payment_id', subscriptionId)
      .single()
    
    if (data) {
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user_id)
        .single()
      
      return userData
    }
    
    return null
  }
}