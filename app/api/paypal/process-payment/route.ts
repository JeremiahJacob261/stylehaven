import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth'
import { PayPalService } from '@/lib/paypal'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { orderID, payerID, facilitatorAccessToken, userId, amount, plan } = await request.json()
    const sessionToken = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await AuthService.validateSession(sessionToken)
    if (!user || user.id !== userId) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    // For one-time payments (lifetime plan)
    if (plan === 'lifetime') {
      await PayPalService.processOneTimePayment(userId, orderID, payerID, amount)
      
      return NextResponse.json({
        success: true,
        message: 'Lifetime payment processed successfully'
      })
    } 
    // For subscription payments (monthly plan)
    else if (plan === 'monthly') {
      // Calculate expiry for monthly plan
      const now = new Date()
      const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)  // 30 days
      
      // Store payment record
      await supabase.from('payments').insert({
        user_id: userId,
        payment_method: 'paypal',
        payment_provider: 'paypal',
        payment_id: orderID,
        amount: amount,
        currency: 'USD',
        status: 'completed',
        subscription_type: 'monthly',
        subscription_period_start: now,
        subscription_period_end: expiresAt,
        metadata: { 
          payer_id: payerID,
          facilitator_access_token: facilitatorAccessToken
        }
      })

      // Update user subscription
      await AuthService.updateSubscription(
        userId,
        'monthly',
        'active',
        expiresAt,
        orderID
      )

      // Update user payment status
      await supabase
        .from('users')
        .update({ 
          has_paid: true,
          payment_method: 'paypal',
          updated_at: now.toISOString()
        })
        .eq('id', userId)

      return NextResponse.json({
        success: true,
        message: 'Monthly subscription payment processed successfully'
      })
    }
    
    return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 })
  } catch (error: any) {
    console.error('PayPal payment processing error:', error)
    
    // Log the error
    try {
      await supabase.from('payment_errors').insert({
        error_type: 'paypal_payment_processing',
        error_message: error.message || 'Unknown error',
        error_details: JSON.stringify(error),
        created_at: new Date().toISOString()
      })
    } catch (logError) {
      console.error('Failed to log payment error:', logError)
    }
    
    return NextResponse.json({ 
      error: error.message || 'Payment processing failed' 
    }, { status: 500 })
  }
}