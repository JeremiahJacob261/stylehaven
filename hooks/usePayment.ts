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
      return
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
        await refreshUser()
        setPaymentState({
          isProcessing: false,
          error: null,
          success: true,
          data: data
        })
      } else {
        setPaymentState({
          isProcessing: false,
          error: data.error || 'Payment processing failed',
          success: false,
          data: null
        })
      }
    } catch (error: any) {
      console.error('PayPal payment processing error:', error)
      setPaymentState({
        isProcessing: false,
        error: error.message || 'Payment processing failed',
        success: false,
        data: null
      })
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
      return
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
          data: data.payment
        })
      } else {
        setPaymentState({
          isProcessing: false,
          error: data.error || 'Payment initialization failed',
          success: false,
          data: null
        })
      }
    } catch (error: any) {
      console.error('Crypto payment error:', error)
      setPaymentState({
        isProcessing: false,
        error: error.message || 'Payment failed',
        success: false,
        data: null
      })
    }
  }, [user])

  const checkCryptoPaymentStatus = useCallback(async (paymentId: string) => {
    setPaymentState(prev => ({ ...prev, isProcessing: true }))

    try {
      const response = await fetch(`/api/crypto/status/${paymentId}`)
      const data = await response.json()
      
      if (data.success) {
        const isComplete = 
          data.status === 'finished' || 
          data.status === 'confirmed'
        
        if (isComplete) {
          await refreshUser()
        }
        
        setPaymentState({
          isProcessing: false,
          error: null,
          success: isComplete,
          data: data.payment
        })
        
        return data.status
      } else {
        setPaymentState(prev => ({
          ...prev,
          isProcessing: false,
          error: data.error || 'Failed to check payment status'
        }))
      }
    } catch (error: any) {
      console.error('Error checking payment status:', error)
      setPaymentState(prev => ({
        ...prev,
        isProcessing: false,
        error: error.message || 'Failed to check payment status'
      }))
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