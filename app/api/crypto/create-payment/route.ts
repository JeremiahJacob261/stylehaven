// app/api/crypto/create-payment/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { CryptoPaymentService } from '@/lib/crypto'
import { AuthService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { planType, cryptoCurrency, userId, amount } = await request.json()
    const sessionToken = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await AuthService.validateSession(sessionToken)
    if (!user || user.id !== userId) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    const orderId = `nt_${userId}_${Date.now()}`
    
    const paymentData = {
      price_amount: amount,
      price_currency: 'USD',
      pay_currency: cryptoCurrency,
      order_id: orderId,
      order_description: `NateTube ${planType} subscription`,
      ipn_callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/crypto/webhook`,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`
    }

    const payment = await CryptoPaymentService.createPayment(paymentData)

    // Store payment record
    await AuthService.createPaymentRecord({
      user_id: userId,
      payment_method: cryptoCurrency,
      payment_provider: 'nowpayments',
      payment_id: payment.payment_id,
      amount: amount,
      currency: 'USD',
      status: 'pending',
      subscription_type: planType,
      subscription_period_start: new Date(),
      subscription_period_end: new Date(Date.now() + (planType === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
      metadata: { crypto_currency: cryptoCurrency }
    })

    return NextResponse.json({
      success: true,
      payment: {
        payment_id: payment.payment_id,
        pay_address: payment.pay_address,
        pay_amount: payment.pay_amount,
        pay_currency: payment.pay_currency
      }
    })
  } catch (error: any) {
    console.error('Crypto payment error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}