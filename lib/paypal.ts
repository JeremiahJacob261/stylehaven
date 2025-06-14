import paypal from '@paypal/checkout-server-sdk'

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
      throw new Error('Failed to create PayPal product')
    }
  }

  static async createSubscriptionPlan(
    productId: string,
    planData: PayPalSubscriptionPlan
  ): Promise<string> {
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
      throw new Error('Failed to create PayPal subscription plan')
    }
  }

  static async createSubscription(planId: string, returnUrl: string, cancelUrl: string) {
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

    try {
      const response = await client.execute(request)
      return response.result
    } catch (error) {
      console.error('PayPal subscription creation error:', error)
      throw new Error('Failed to create PayPal subscription')
    }
  }

  static async getSubscription(subscriptionId: string) {
    const request = new paypal.v1.billing.SubscriptionsGetRequest(subscriptionId)
    
    try {
      const response = await client.execute(request)
      return response.result
    } catch (error) {
      console.error('PayPal subscription fetch error:', error)
      throw new Error('Failed to fetch PayPal subscription')
    }
  }

  static async cancelSubscription(subscriptionId: string, reason: string) {
    const request = new paypal.v1.billing.SubscriptionsCancelRequest(subscriptionId)
    request.requestBody({
      reason: reason
    })

    try {
      await client.execute(request)
      return true
    } catch (error) {
      console.error('PayPal subscription cancellation error:', error)
      throw new Error('Failed to cancel PayPal subscription')
    }
  }
}