import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email'
import { AuthService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { receiptType, receiptUrl, receiptData } = await request.json()
    
    // Get session token from headers
    const sessionToken = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate session and get user
    const user = await AuthService.validateSession(sessionToken)
    if (!user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    // Check if user has active subscription or is staff
    const hasAccess = await AuthService.hasActiveSubscription(user.id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'Active subscription required' }, { status: 403 })
    }

    // Send receipt email with the actual receipt data
    const result = await EmailService.sendReceiptEmail(
      user.email,
      user.username,
      receiptType,
      receiptUrl,
      receiptData
    )

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Receipt sent successfully' })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Send receipt error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}