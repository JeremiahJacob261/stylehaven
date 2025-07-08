"use client";

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usePayment } from '@/hooks/usePayment'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Check, 
  Shield,
  Bitcoin,
  Clock,
  Crown,
  AlertCircle,
  Copy,
  CreditCard,
  Zap,
  Calendar,
  Star,
  CheckCircle
} from 'lucide-react'

interface PaymentPageProps {
  onPaymentSuccess: () => void
}

interface CryptoPaymentData {
  payment_id: string
  pay_address: string
  pay_amount: number
  pay_currency: string
  price_amount: number
  price_currency: string
  payment_url?: string
}

declare global {
  interface Window {
    paypal: any;
  }
}

export default function PaymentPage({ onPaymentSuccess }: PaymentPageProps) {
  const { user } = useAuth()
  const { 
    paymentState, 
    resetPaymentState, 
    processPayPalPayment, 
    processCryptoPayment, 
    checkCryptoPaymentStatus 
  } = usePayment()
  
  const [selectedCrypto, setSelectedCrypto] = useState<string>('sol')
  const [cryptoPaymentData, setCryptoPaymentData] = useState<CryptoPaymentData | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<string>('pending')
  const [timeLeft, setTimeLeft] = useState<number>(3600) // 1 hour in seconds
  const [selectedPlan, setSelectedPlan] = useState<'lifetime' | 'monthly'>('lifetime')
  const [paypalProcessing, setPaypalProcessing] = useState(false)
  
  const paypalOneTimeRef = useRef<HTMLDivElement>(null)
  const paypalSubscriptionRef = useRef<HTMLDivElement>(null)

  // Plan pricing
  const PLAN_PRICES = {
    lifetime: 25,
    monthly: 5
  }

  // Available cryptocurrencies
  const availableCryptos = [
    { value: 'sol', label: 'Solana (SOL)', icon: '◎' },
    { value: 'ltc', label: 'Litecoin (LTC)', icon: 'Ł' },
    { value: 'xrp', label: 'Ripple (XRP)', icon: 'XRP' }
  ]

  // Timer for crypto payments
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (cryptoPaymentData && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setCryptoPaymentData(null)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [cryptoPaymentData, timeLeft])

  // Status checking for crypto payments
  useEffect(() => {
    let statusInterval: NodeJS.Timeout
    if (cryptoPaymentData) {
      statusInterval = setInterval(async () => {
        const status = await checkCryptoPaymentStatus(cryptoPaymentData.payment_id)
        if (status === 'finished' || status === 'confirmed') {
          setTimeout(() => {
            onPaymentSuccess()
          }, 1500) // Small delay to show success state
        }
      }, 10000)
    }
    return () => clearInterval(statusInterval)
  }, [cryptoPaymentData, checkCryptoPaymentStatus, onPaymentSuccess])

  // Watch for successful crypto payment creation and set the payment data
  useEffect(() => {
    if (paymentState.success && paymentState.data && !cryptoPaymentData && paymentState.data.paymentMethod !== 'paypal') {
      console.log('Setting crypto payment data:', paymentState.data)
      setCryptoPaymentData(paymentState.data)
      setTimeLeft(3600)
      setPaymentStatus('waiting')
    }
  }, [paymentState.success, paymentState.data, cryptoPaymentData])

  // PayPal button initialization
  useEffect(() => {
    if (window.paypal) {
      // One-time payment button
      if (paypalOneTimeRef.current && selectedPlan === 'lifetime') {
        paypalOneTimeRef.current.innerHTML = ''
        
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [{
                description: "StyleHaven Lifetime Access",
                amount: {
                  currency_code: "USD",
                  value: PLAN_PRICES.lifetime.toString(),
                },
              }],
            })
          },
          onApprove: async (data: any, actions: any) => {
            try {
              setPaypalProcessing(true)
              const order = await actions.order.capture()
              
              const result = await processPayPalPayment({
                orderID: data.orderID,
                payerID: data.payerID,
                facilitatorAccessToken: data.facilitatorAccessToken,
              }, 'lifetime', PLAN_PRICES.lifetime)

              if (result.success) {
                // Show success message briefly then redirect
                setTimeout(() => {
                  onPaymentSuccess()
                }, 2000)
              }
            } catch (error) {
              console.error("PayPal payment processing error:", error)
              setPaypalProcessing(false)
            }
          },
          onError: (err: any) => {
            console.error("PayPal error:", err)
            setPaypalProcessing(false)
          },
        }).render(paypalOneTimeRef.current)
      }

      // Monthly subscription button
      if (paypalSubscriptionRef.current && selectedPlan === 'monthly') {
        paypalSubscriptionRef.current.innerHTML = ''
        
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [{
                description: "StyleHaven Monthly Subscription",
                amount: {
                  currency_code: "USD",
                  value: PLAN_PRICES.monthly.toString(),
                },
              }],
            })
          },
          onApprove: async (data: any, actions: any) => {
            try {
              setPaypalProcessing(true)
              const order = await actions.order.capture()
              
              const result = await processPayPalPayment({
                orderID: data.orderID,
                payerID: data.payerID,
                facilitatorAccessToken: data.facilitatorAccessToken,
              }, 'monthly', PLAN_PRICES.monthly)

              if (result.success) {
                // Show success message briefly then redirect
                setTimeout(() => {
                  onPaymentSuccess()
                }, 2000)
              }
            } catch (error) {
              console.error("PayPal subscription payment processing error:", error)
              setPaypalProcessing(false)
            }
          },
          onError: (err: any) => {
            console.error("PayPal subscription error:", err)
            setPaypalProcessing(false)
          },
        }).render(paypalSubscriptionRef.current)
      }
    }
  }, [selectedPlan, processPayPalPayment, onPaymentSuccess])

  // Handle PayPal payment success
  useEffect(() => {
    if (paymentState.success && paymentState.data?.paymentMethod === 'paypal') {
      // PayPal payment was successful, onPaymentSuccess will be called from the PayPal button handler
      
      setPaypalProcessing(false)
    }
  }, [paymentState.success, paymentState.data])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleCryptoPayment = async () => {
    const amount = PLAN_PRICES[selectedPlan]
    console.log(`Initiating crypto payment for ${selectedCrypto} - $${amount}`)
    await processCryptoPayment(selectedCrypto, selectedPlan, amount)
  }

  const selectedCryptoData = availableCryptos.find(c => c.value === selectedCrypto)

  // Show success message for PayPal
  if (paymentState.success && paymentState.data?.paymentMethod === 'paypal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Payment Successful! 🎉
              </h1>
              
              <p className="text-gray-600 mb-6">
                Your {paymentState.data.plan === 'lifetime' ? 'lifetime' : 'monthly'} subscription has been activated. 
                Redirecting you to the dashboard...
              </p>
              
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Crypto payment display
  if (cryptoPaymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Bitcoin className="w-6 h-6" />
                <span>Complete Payment</span>
              </CardTitle>
              <CardDescription className="text-orange-100">
                Send {selectedCryptoData?.icon} {selectedCrypto.toUpperCase()} to complete your StyleHaven purchase
              </CardDescription>
              {paymentStatus === 'waiting' && (
                <Badge variant="secondary" className="mx-auto bg-white/20 text-white border-white/30">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Waiting for payment...
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="text-center">
                <div className="bg-gray-50 p-6 rounded-xl mb-6 border-2 border-dashed border-gray-200">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${cryptoPaymentData.pay_address}`}
                    alt="Payment QR Code"
                    className="mx-auto mb-4 rounded-lg shadow-md"
                  />
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-600 mb-2 font-medium">Send exactly:</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-gray-900">{cryptoPaymentData.pay_amount} {selectedCrypto.toUpperCase()}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(cryptoPaymentData.pay_amount.toString())}
                          className="ml-2"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-600 mb-2 font-medium">To address:</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs bg-gray-50 p-3 rounded border flex-1 font-mono break-all">
                          {cryptoPaymentData.pay_address}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(cryptoPaymentData.pay_address)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-6 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Payment expires in {formatTime(timeLeft)}</span>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => checkCryptoPaymentStatus(cryptoPaymentData.payment_id)}
                    variant="default"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={paymentState.isProcessing}
                  >
                    {paymentState.isProcessing ? 'Checking...' : 'Check Payment Status'}
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setCryptoPaymentData(null)
                      resetPaymentState()
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Back to Payment Options
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Unlock StyleHaven Access
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your plan and start generating professional receipts with unlimited access to all features
          </p>
        </div>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Lifetime Plan */}
          <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 ${selectedPlan === 'lifetime' ? 'ring-4 ring-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl' : 'hover:shadow-lg border-2 border-gray-200'}`}
                onClick={() => setSelectedPlan('lifetime')}>
            <CardHeader className="relative">
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 font-semibold">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Lifetime Access</h3>
                    <p className="text-sm text-gray-600 font-normal">One-time payment, forever yours</p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${PLAN_PRICES.lifetime}
                  <span className="text-lg text-gray-500 font-normal"> one-time</span>
                </div>
                <p className="text-green-600 font-semibold">Save $35+ vs monthly</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited receipt generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">All brand templates included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">No monthly fees ever</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Priority customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Future updates included</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Plan */}
          <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 ${selectedPlan === 'monthly' ? 'ring-4 ring-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl' : 'hover:shadow-lg border-2 border-gray-200'}`}
                onClick={() => setSelectedPlan('monthly')}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Monthly Plan</h3>
                    <p className="text-sm text-gray-600 font-normal">Flexible monthly billing</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-200 text-blue-700">Flexible</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${PLAN_PRICES.monthly}
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                </div>
                <p className="text-gray-600">Cancel anytime, no commitment</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited receipt generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">All brand templates included</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Email support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Monthly updates</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {paymentState.error && (
          <Card className="mb-8 border-red-200 bg-red-50 shadow-lg">
            <CardContent className="py-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-800 font-semibold">Payment Error</p>
                  <p className="text-red-700 mt-1">{paymentState.error}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetPaymentState}
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Methods */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-green-600" />
              <span className="text-xl">Choose Payment Method</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Selected: <span className="font-semibold text-gray-900">
                {selectedPlan === 'lifetime' ? 'Lifetime Access' : 'Monthly Subscription'} - 
                ${PLAN_PRICES[selectedPlan]}{selectedPlan === 'monthly' ? '/month' : ' one-time'}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="paypal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-14 mb-8">
                <TabsTrigger value="paypal" className="flex items-center space-x-3 text-base">
                  <CreditCard className="w-5 h-5" />
                  <span>PayPal & Cards</span>
                </TabsTrigger>
                <TabsTrigger value="crypto" className="flex items-center space-x-3 text-base">
                  <Bitcoin className="w-5 h-5" />
                  <span>Cryptocurrency</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="paypal" className="space-y-6">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure Payment with PayPal</h3>
                  <p className="text-gray-600 mb-6">
                    Pay safely with PayPal, credit card, or debit card. Your payment information is protected.
                  </p>
                  
                  {(paymentState.isProcessing || paypalProcessing) && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-blue-800 font-medium">Processing payment...</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedPlan === 'lifetime' ? (
                    <div ref={paypalOneTimeRef} className="min-h-[50px]"></div>
                  ) : (
                    <div ref={paypalSubscriptionRef} className="min-h-[50px]"></div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="crypto" className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bitcoin className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Pay with Cryptocurrency</h3>
                  <p className="text-gray-600">
                    Anonymous payments with popular cryptocurrencies. No personal information required.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Select Cryptocurrency
                  </label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCryptos.map((crypto) => (
                        <SelectItem key={crypto.value} value={crypto.value}>
                          <div className="flex items-center space-x-3 py-2">
                            <span className="text-xl">{crypto.icon}</span>
                            <span className="font-medium">{crypto.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={handleCryptoPayment}
                  disabled={paymentState.isProcessing}
                  className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg font-semibold"
                  size="lg"
                >
                  <Bitcoin className="w-6 h-6 mr-3" />
                  {paymentState.isProcessing ? 'Initializing...' : `Pay $${PLAN_PRICES[selectedPlan]} with ${selectedCryptoData?.label}`}
                </Button>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="flex flex-col items-center space-y-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">Anonymous</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">No KYC</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-600">Fast & Secure</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg">
            Questions about payment? Contact us at{' '}
            <a href="mailto:support@stylehaven.com" className="text-blue-600 hover:underline font-semibold">
              support@stylehaven.com
            </a>
          </p>
          <p className="text-sm mt-2">
            Secure payments powered by PayPal and NOWPayments • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </div>
  )
}