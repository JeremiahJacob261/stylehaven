import { useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface PaymentState {
  isProcessing: boolean
  error: string | null
  success: boolean
  data: any
}

export function usePayment() {
  const { user, refreshUser } = useAuth()
  const [paymentState, setPaymentState] = useState<PaymentState>({
    isProcessing: false,
    error: null,
    success: false,
    data: null
  })

  const resetPaymentState = useCallback(() => {
    setPaymentState({
      isProcessing: false,
      error: null,
      success: false,
      data: null
    })
  }, [])

  const processPayPalPayment = useCallback(async (
    orderData: {
      orderID: string
      payerID: string
      facilitatorAccessToken: string
    },
    plan: 'monthly' | 'lifetime',
    amount: number
  ) => {
    if (!user) {
      setPaymentState({
        isProcessing: false,
        error: 'User not authenticated',
        success: false,
        data: null
      })
      return { success: false, error: 'User not authenticated' }
    }

    setPaymentState(prev => ({ ...prev, isProcessing: true, error: null }))

    try {
      const response = await fetch('/api/paypal/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('session_token')}`
        },
        body: JSON.stringify({
          orderID: orderData.orderID,
          payerID: orderData.payerID,
          facilitatorAccessToken: orderData.facilitatorAccessToken,
          userId: user.id,
          amount: amount,
          plan: plan
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Refresh user data to get updated subscription status
        await refreshUser()
        
        setPaymentState({
          isProcessing: false,
          error: null,
          success: true,
          data: { paymentMethod: 'paypal', plan, amount, ...data }
        })
        
        return { success: true, data }
      } else {
        setPaymentState({
          isProcessing: false,
          error: data.error || 'Payment processing failed',
          success: false,
          data: null
        })
        
        return { success: false, error: data.error || 'Payment processing failed' }
      }
    } catch (error: any) {
      console.error('PayPal payment processing error:', error)
      const errorMessage = error.message || 'Payment processing failed'
      
      setPaymentState({
        isProcessing: false,
        error: errorMessage,
        success: false,
        data: null
      })
      
      return { success: false, error: errorMessage }
    }
  }, [user, refreshUser])

  const processCryptoPayment = useCallback(async (
    cryptoCurrency: string,
    plan: 'monthly' | 'lifetime',
    amount: number
  ) => {
    if (!user) {
      setPaymentState({
        isProcessing: false,
        error: 'User not authenticated',
        success: false,
        data: null
      })
      return { success: false, error: 'User not authenticated' }
    }

    setPaymentState(prev => ({ ...prev, isProcessing: true, error: null }))
    
    try {
      const response = await fetch('/api/crypto/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('session_token')}`
        },
        body: JSON.stringify({
          cryptoCurrency,
          userId: user.id,
          amount,
          plan
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setPaymentState({
          isProcessing: false,
          error: null,
          success: true,
          data: data.payment || data
        })
        
        return { success: true, data: data.payment || data }
      } else {
        setPaymentState({
          isProcessing: false,
          error: data.error || 'Crypto payment creation failed',
          success: false,
          data: null
        })
        
        return { success: false, error: data.error || 'Crypto payment creation failed' }
      }
    } catch (error: any) {
      console.error('Crypto payment processing error:', error)
      const errorMessage = error.message || 'Crypto payment creation failed'
      
      setPaymentState({
        isProcessing: false,
        error: errorMessage,
        success: false,
        data: null
      })
      
      return { success: false, error: errorMessage }
    }
  }, [user])

  const checkCryptoPaymentStatus = useCallback(async (paymentId: string) => {
    try {
      const response = await fetch(`/api/crypto/status/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('session_token')}`
        }
      })

      const data = await response.json()
      
      if (data.success) {
        const status = data.status
        
        if (status === 'finished' || status === 'confirmed') {
          // Refresh user data and mark payment as successful
          await refreshUser()
          
          setPaymentState({
            isProcessing: false,
            error: null,
            success: true,
            data: { paymentMethod: 'crypto', status, payment: data.payment }
          })
        }
        
        return status
      } else {
        console.error('Failed to check payment status:', data.error)
        return 'failed'
      }
    } catch (error: any) {
      console.error('Payment status check error:', error)
      return 'failed'
    }
  }, [refreshUser])

  return {
    paymentState,
    resetPaymentState,
    processPayPalPayment,
    processCryptoPayment,
    checkCryptoPaymentStatus
  }
}