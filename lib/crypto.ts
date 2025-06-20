import axios from 'axios'
import crypto from 'crypto'

// Use sandbox for testing
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
  payment_url?: string
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
      
      // Filter to only our supported currencies
      const supportedCurrencies = ['sol', 'ltc', 'xrp']
      const availableCurrencies = response.data.currencies || []
      
      return supportedCurrencies.filter(currency => 
        availableCurrencies.includes(currency)
      )
    } catch (error) {
      console.error('Error fetching currencies:', error)
      // Return fallback supported currencies
      return ['sol', 'ltc', 'xrp']
    }
  }

  static async createPayment(paymentData: CryptoPaymentRequest): Promise<CryptoPaymentResponse> {
    try {
      const response = await axios.post(
        `${NOWPAYMENTS_API_URL}/payment`,
        paymentData,
        { headers: this.getHeaders() }
      )
      
      return {
        payment_id: response.data.payment_id,
        payment_status: response.data.payment_status,
        pay_address: response.data.pay_address,
        pay_amount: response.data.pay_amount,
        pay_currency: response.data.pay_currency,
        price_amount: response.data.price_amount,
        price_currency: response.data.price_currency,
        payment_url: response.data.payment_url
      }
    } catch (error: any) {
      console.error('Crypto payment creation error:', error.response?.data || error)
      throw new Error(error.response?.data?.message || 'Failed to create crypto payment')
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
    try {
      const expectedSignature = crypto
        .createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET!)
        .update(payload)
        .digest('hex')
      
      return signature === expectedSignature
    } catch (error) {
      console.error('IPN verification error:', error)
      return false
    }
  }

  // Get minimum payment amount for a currency
  static async getMinimumAmount(currency: string): Promise<number> {
    try {
      const response = await axios.get(
        `${NOWPAYMENTS_API_URL}/min-amount?currency_from=${currency}&currency_to=usd`,
        { headers: this.getHeaders() }
      )
      return response.data.min_amount || 0
    } catch (error) {
      console.error('Error getting minimum amount:', error)
      return 0
    }
  }

  // Get estimated price in crypto
  static async getEstimatedPrice(
    amount: number, 
    fromCurrency: string, 
    toCurrency: string
  ): Promise<number> {
    try {
      const response = await axios.get(
        `${NOWPAYMENTS_API_URL}/estimate?amount=${amount}&currency_from=${fromCurrency}&currency_to=${toCurrency}`,
        { headers: this.getHeaders() }
      )
      return response.data.estimated_amount || 0
    } catch (error) {
      console.error('Error getting estimated price:', error)
      return 0
    }
  }
}