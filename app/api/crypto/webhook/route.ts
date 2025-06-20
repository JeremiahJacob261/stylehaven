// app/api/crypto/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { CryptoPaymentService } from '@/lib/crypto'
import { AuthService } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-nowpayments-sig') || ''
    
    // Verify webhook signature (skip in sandbox for testing)
    if (process.env.NODE_ENV === 'production') {
      if (!CryptoPaymentService.verifyIPN(body, signature)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
      }
    }

    const data = JSON.parse(body)
    console.log('NOWPayments webhook received:', data)
    
    if (data.payment_status === 'finished' || data.payment_status === 'confirmed') {
      // Find the payment record
      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('payment_id', data.payment_id)
        .single()

      if (payment) {
        // Update payment status
        await supabase
          .from('payments')
          .update({ 
            status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('payment_id', data.payment_id)

        // Update user subscription - NateTube lifetime access
        await AuthService.updateSubscription(
          payment.user_id,
          'one-time',
          'active',
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
          data.payment_id
        )

        // Update user payment status
        await supabase
          .from('users')
          .update({ 
            has_paid: true,
            payment_method: payment.payment_method,
            updated_at: new Date().toISOString()
          })
          .eq('id', payment.user_id)

        console.log(`Payment completed for user ${payment.user_id}`)
      }
    } else if (data.payment_status === 'failed' || data.payment_status === 'expired') {
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({ 
          status: 'failed',
          error_message: `Payment ${data.payment_status}`,
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', data.payment_id)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Crypto webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}