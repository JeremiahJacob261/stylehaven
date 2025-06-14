// app/api/paypal/create-subscription/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PayPalService } from '@/lib/paypal'
import { AuthService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { planType, userId } = await request.json()
    const sessionToken = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await AuthService.validateSession(sessionToken)
    if (!user || user.id !== userId) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    // Create PayPal subscription
    const planId = planType === 'yearly' ? 'P-yearly-plan-id' : 'P-monthly-plan-id'
    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`
    const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`

    const subscription = await PayPalService.createSubscription(planId, returnUrl, cancelUrl)
    
    const approvalUrl = subscription.links.find((link: any) => link.rel === 'approve')?.href

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      approvalUrl
    })
  } catch (error: any) {
    console.error('PayPal subscription error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}