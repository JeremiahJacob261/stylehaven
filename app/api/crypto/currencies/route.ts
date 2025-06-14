// app/api/crypto/currencies/route.ts
import { NextResponse } from 'next/server'
import { CryptoPaymentService } from '@/lib/crypto'

export async function GET() {
  try {
    const currencies = await CryptoPaymentService.getAvailableCurrencies()
    return NextResponse.json({ success: true, currencies })
  } catch (error) {
    return NextResponse.json({ 
      success: true, 
      currencies: ['btc', 'eth', 'ltc', 'xmr', 'usdt', 'usdc'] 
    })
  }
}