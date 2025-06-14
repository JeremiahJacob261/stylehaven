// app/api/crypto/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { CryptoPaymentService } from '@/lib/crypto'
import { AuthService } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-nowpayments-sig') || ''
    
    // Verify webhook signature
    if (!CryptoPaymentService.verifyIPN(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const data = JSON.parse(body)
    
    if (data.payment_status === 'finished') {
      // Update payment status
      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('payment_id', data.payment_id)
        .single()

      if (payment) {
        // Update payment status
        await supabase
          .from('payments')
          .update({ status: 'completed' })
          .eq('payment_id', data.payment_id)

        // Update user subscription
        await AuthService.updateSubscription(
          payment.user_id,
          payment.subscription_type,
          'active',
          new Date(payment.subscription_period_end)
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Crypto webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}