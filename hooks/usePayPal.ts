import { useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { PayPalEnhancedService, PayPalOrderData } from '@/lib/paypal-enhanced'

export interface UsePayPalReturn {
  isProcessing: boolean
  error: string | null
  handleOneTimePayment: (orderData: PayPalOrderData) => Promise<void>
  handleMonthlySubscription: (subscriptionData: PayPalOrderData) => Promise<void>
  clearError: () => void
}

export const usePayPal = (): UsePayPalReturn => {
  const { user, refreshUser } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const handleOneTimePayment = useCallback(async (orderData: PayPalOrderData) => {
    if (!user) {
      setError('User not authenticated')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Store initial payment record
      const paymentRecord = {
        user_id: user.id,
        payment_method: 'paypal',
        payment_provider: 'paypal',
        payment_id: orderData.orderID,
        amount: 25.00,
        currency: 'USD',
        status: 'pending' as const,
        subscription_type: 'one-time' as const,
        subscription_period_start: new Date(),
        subscription_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        metadata: {
          payer_id: orderData.payerID,
          facilitator_access_token: orderData.facilitatorAccessToken
        }
      }

      await PayPalEnhancedService.storePaymentRecord(paymentRecord)

      // Update payment status to completed
      await PayPalEnhancedService.updatePaymentStatus(orderData.orderID, 'completed')

      // Update user subscription
      await PayPalEnhancedService.updateUserSubscription(
        user.id, 
        'one-time', 
        orderData.orderID
      )

      // Refresh user data
      await refreshUser()

      console.log('One-time payment processed successfully')
    } catch (error: any) {
      console.error('One-time payment error:', error)
      setError(error.message || 'Payment processing failed')
      
      // Update payment status to failed
      try {
        await PayPalEnhancedService.updatePaymentStatus(
          orderData.orderID, 
          'failed', 
          error.message
        )
      } catch (updateError) {
        console.error('Failed to update payment status:', updateError)
      }
    } finally {
      setIsProcessing(false)
    }
  }, [user, refreshUser])

  const handleMonthlySubscription = useCallback(async (subscriptionData: PayPalOrderData) => {
    if (!user) {
      setError('User not authenticated')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const subscriptionId = subscriptionData.subscriptionID || subscriptionData.orderID
      
      // Store subscription record
      const paymentRecord = {
        user_id: user.id,
        payment_method: 'paypal',
        payment_provider: 'paypal',
        payment_id: subscriptionId,
        amount: 5.00,
        currency: 'USD',
        status: 'completed' as const,
        subscription_type: 'monthly' as const,
        subscription_period_start: new Date(),
        subscription_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        metadata: {
          subscription_id: subscriptionId,
          payer_id: subscriptionData.payerID
        }
      }

      await PayPalEnhancedService.storePaymentRecord(paymentRecord)

      // Update user subscription
      await PayPalEnhancedService.updateUserSubscription(
        user.id, 
        'monthly', 
        subscriptionId
      )

      // Refresh user data
      await refreshUser()

      console.log('Monthly subscription processed successfully')
    } catch (error: any) {
      console.error('Monthly subscription error:', error)
      setError(error.message || 'Subscription processing failed')
      
      // Update payment status to failed if we have an ID
      if (subscriptionData.subscriptionID || subscriptionData.orderID) {
        try {
          await PayPalEnhancedService.updatePaymentStatus(
            subscriptionData.subscriptionID || subscriptionData.orderID, 
            'failed', 
            error.message
          )
        } catch (updateError) {
          console.error('Failed to update payment status:', updateError)
        }
      }
    } finally {
      setIsProcessing(false)
    }
  }, [user, refreshUser])

  return {
    isProcessing,
    error,
    handleOneTimePayment,
    handleMonthlySubscription,
    clearError
  }
}