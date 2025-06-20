import { AuthService } from './auth'
import { supabase } from './supabase'

export interface PayPalOrderData {
  orderID: string
  payerID?: string
  subscriptionID?: string
  facilitatorAccessToken?: string
}

export interface PaymentRecord {
  user_id: string
  payment_method: string
  payment_provider: string
  payment_id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  subscription_type?: 'monthly' | 'one-time'
  subscription_period_start?: Date
  subscription_period_end?: Date
  metadata?: any
  error_message?: string
}

export class PayPalEnhancedService {
  // Create one-time payment order
  static createOneTimeOrder() {
    return {
      intent: "CAPTURE",
      purchase_units: [{
        description: "NateTube One-time Access",
        amount: {
          currency_code: "USD",
          value: "25.00"
        }
      }]
    }
  }

  // Create monthly subscription
  static createMonthlySubscription() {
    return {
      plan_id: process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID, // You'll need to create this in PayPal
      application_context: {
        brand_name: "NateTube",
        locale: "en-US",
        shipping_preference: "NO_SHIPPING",
        user_action: "SUBSCRIBE_NOW",
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
        },
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`
      }
    }
  }

  // Store payment record in database
  static async storePaymentRecord(paymentData: PaymentRecord): Promise<void> {
    try {
      const { error } = await supabase
        .from('payments')
        .insert(paymentData)

      if (error) {
        console.error('Error storing payment record:', error)
        throw new Error('Failed to store payment record')
      }
    } catch (error) {
      console.error('Payment record storage error:', error)
      throw error
    }
  }

  // Update payment status
  static async updatePaymentStatus(
    paymentId: string, 
    status: string, 
    errorMessage?: string
  ): Promise<void> {
    try {
      const updateData: any = { 
        status, 
        updated_at: new Date().toISOString() 
      }
      
      if (errorMessage) {
        updateData.error_message = errorMessage
      }

      const { error } = await supabase
        .from('payments')
        .update(updateData)
        .eq('payment_id', paymentId)

      if (error) {
        console.error('Error updating payment status:', error)
        throw new Error('Failed to update payment status')
      }
    } catch (error) {
      console.error('Payment status update error:', error)
      throw error
    }
  }

  // Update user subscription status
  static async updateUserSubscription(
    userId: string, 
    subscriptionType: 'monthly' | 'one-time',
    paymentId: string
  ): Promise<void> {
    try {
      const now = new Date()
      const expiresAt = subscriptionType === 'monthly' 
        ? new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days
        : new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000) // 1 year for one-time

      // Update user payment status
      const { error: userError } = await supabase
        .from('users')
        .update({ 
          has_paid: true, 
          payment_method: 'paypal',
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (userError) {
        console.error('Error updating user:', userError)
        throw new Error('Failed to update user')
      }

      // Create or update subscription record
      await AuthService.updateSubscription(
        userId,
        subscriptionType,
        'active',
        expiresAt,
        paymentId
      )

    } catch (error) {
      console.error('User subscription update error:', error)
      throw error
    }
  }
}