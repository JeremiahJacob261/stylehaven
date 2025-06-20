import { NextRequest, NextResponse } from 'next/server'
import { PayPalService } from '@/lib/paypal'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    
    // Verify the webhook (in a production environment, you should 
    // validate the signature from PayPal using their webhook validation)
    
    // Process the webhook event
    await PayPalService.handleWebhookEvent(payload)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('PayPal webhook error:', error)
    
    // Log the error
    try {
      await supabase.from('payment_errors').insert({
        error_type: 'paypal_webhook',
        error_message: error.message || 'Unknown error',
        error_details: JSON.stringify(error),
        created_at: new Date().toISOString()
      })
    } catch (logError) {
      console.error('Failed to log webhook error:', logError)
    }
    
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}