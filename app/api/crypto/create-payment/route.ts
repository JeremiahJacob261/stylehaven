// app/api/crypto/create-payment/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth'
import { CryptoPaymentService } from '@/lib/crypto'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { cryptoCurrency, userId, amount, plan } = await request.json()
    const sessionToken = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await AuthService.validateSession(sessionToken)
    if (!user || user.id !== userId) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    // Calculate expiry based on plan
    const now = new Date()
    const expiresAt = plan === 'monthly'
      ? new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)  // 30 days
      : new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000) // 1 year for lifetime

    // Generate order ID
    const orderId = `order_${Date.now()}_${userId.substring(0, 8)}`
    
    // Create payment with NOWPayments
    const payment = await CryptoPaymentService.createPayment({
      price_amount: amount,
      price_currency: 'USD',
      pay_currency: cryptoCurrency,
      order_id: orderId,
      order_description: `NateTube ${plan === 'monthly' ? 'Monthly' : 'Lifetime'} Plan`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/crypto/webhook`,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment`
    })
    
    // Store payment record
    await supabase.from('payments').insert({
      user_id: userId,
      payment_method: 'crypto',
      payment_provider: 'nowpayments',
      payment_id: payment.payment_id,
      amount: amount,
      currency: 'USD',
      crypto_currency: cryptoCurrency,
      crypto_amount: payment.pay_amount,
      status: 'pending',
      subscription_type: plan,
      subscription_period_start: now,
      subscription_period_end: expiresAt,
      metadata: {
        pay_address: payment.pay_address,
        payment_status: payment.payment_status
      }
    })

    return NextResponse.json({ 
      success: true,
      payment: payment
    })
  } catch (error: any) {
    console.error('Crypto payment creation error:', error)
    
    // Log the error
    try {
      await supabase.from('payment_errors').insert({
        error_type: 'crypto_payment_creation',
        error_message: error.message || 'Unknown error',
        error_details: JSON.stringify(error),
        created_at: new Date().toISOString()
      })
    } catch (logError) {
      console.error('Failed to log payment error:', logError)
    }
    
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}