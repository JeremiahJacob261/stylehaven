import axios from 'axios'
import crypto from 'crypto'

const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1'
const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY!

export interface CryptoPaymentRequest {
  price_amount: number
  price_currency: string
  pay_currency: string
  order_id: string
  order_description: string
  ipn_callback_url: string
  success_url: string
  cancel_url: string
}

export interface CryptoPaymentResponse {
  payment_id: string
  payment_status: string
  pay_address: string
  pay_amount: number
  pay_currency: string
  price_amount: number
  price_currency: string
  payment_url: string
  qr_code?: string
}

export class CryptoPaymentService {
  private static getHeaders() {
    return {
      'x-api-key': NOWPAYMENTS_API_KEY,
      'Content-Type': 'application/json'
    }
  }

  static async getAvailableCurrencies(): Promise<string[]> {
    try {
      const response = await axios.get(`${NOWPAYMENTS_API_URL}/currencies`, {
        headers: this.getHeaders()
      })
      return response.data.currencies
    } catch (error) {
      console.error('Error fetching currencies:', error)
      return ['btc', 'eth', 'ltc', 'xmr', 'usdt']
    }
  }

  static async createPayment(paymentData: CryptoPaymentRequest): Promise<CryptoPaymentResponse> {
    try {
      const response = await axios.post(
        `${NOWPAYMENTS_API_URL}/payment`,
        paymentData,
        { headers: this.getHeaders() }
      )
      return response.data
    } catch (error: any) {
      console.error('Crypto payment creation error:', error)
      throw new Error('Failed to create crypto payment')
    }
  }

  static async getPaymentStatus(paymentId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${NOWPAYMENTS_API_URL}/payment/${paymentId}`,
        { headers: this.getHeaders() }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching payment status:', error)
      throw new Error('Failed to get payment status')
    }
  }

  static verifyIPN(payload: string, signature: string): boolean {
    const expectedSignature = crypto
      .createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET!)
      .update(payload)
      .digest('hex')
    
    return signature === expectedSignature
  }

  // Direct wallet payments (for maximum anonymity)
  static generateDirectPaymentAddress(currency: string): string {
    switch (currency.toLowerCase()) {
      case 'btc':
        return process.env.BITCOIN_WALLET_ADDRESS || ''
      case 'xmr':
        return process.env.MONERO_WALLET_ADDRESS || ''
      default:
        return ''
    }
  }
}