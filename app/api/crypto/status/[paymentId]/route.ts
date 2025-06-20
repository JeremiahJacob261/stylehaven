import { NextRequest, NextResponse } from 'next/server'
import { CryptoPaymentService } from '@/lib/crypto'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await params
    
    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID required' }, { status: 400 })
    }

    const paymentStatus = await CryptoPaymentService.getPaymentStatus(paymentId)
    
    return NextResponse.json({
      success: true,
      status: paymentStatus.payment_status,
      payment: paymentStatus
    })
  } catch (error: any) {
    console.error('Payment status check error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to check payment status' 
    }, { status: 500 })
  }
}