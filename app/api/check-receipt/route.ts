import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const receiptType = searchParams.get('type')
  
  if (!receiptType) {
    return NextResponse.json({ error: 'Receipt type required' }, { status: 400 })
  }

  // You can add logic here to check if the receipt page is ready
  // For now, we'll just return success
  return NextResponse.json({ 
    success: true, 
    receiptUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${receiptType}-receipt`
  })
}