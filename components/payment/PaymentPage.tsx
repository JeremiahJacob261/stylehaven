"use client";

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  CreditCard, 
  Check, 
  Star, 
  Zap, 
  Shield,
  Bitcoin,
  Wallet,
  Clock,
  Crown,
  Gift
} from 'lucide-react'

interface PaymentPageProps {
  onPaymentSuccess: () => void
}

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  duration: string
  savings?: string
  features: string[]
  popular?: boolean
}

export default function PaymentPage({ onPaymentSuccess }: PaymentPageProps) {
  const { user, refreshUser } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly')
  const [selectedCrypto, setSelectedCrypto] = useState<string>('btc')
  const [availableCryptos, setAvailableCryptos] = useState<string[]>(['btc', 'eth', 'xmr', 'usdt'])
  const [cryptoPaymentData, setCryptoPaymentData] = useState<any>(null)

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 4.99,
      duration: 'per month',
      features: [
        'Generate unlimited receipts',
        'All brand templates included',
        'Email delivery',
        'Priority support',
        'Mobile-friendly interface'
      ]
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: 39.99,
      duration: 'per year',
      savings: 'Save 33%',
      popular: true,
      features: [
        'Everything in Monthly',
        'Save $20 per year',
        'Premium templates',
        'Advanced customization',
        'Export to multiple formats',
        'API access (coming soon)'
      ]
    }
  ]

  useEffect(() => {
    fetchAvailableCryptos()
  }, [])

  const fetchAvailableCryptos = async () => {
    try {
      const response = await fetch('/api/crypto/currencies')
      const data = await response.json()
      if (data.success) {
        setAvailableCryptos(data.currencies)
      }
    } catch (error) {
      console.error('Failed to fetch crypto currencies:', error)
    }
  }

  const handlePayPalPayment = async () => {
    if (!user) return

    setIsProcessing(true)
    try {
      const response = await fetch('/api/paypal/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('session_token')}`
        },
        body: JSON.stringify({
          planType: selectedPlan,
          userId: user.id
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Redirect to PayPal
        window.location.href = data.approvalUrl
      } else {
        alert('PayPal payment initialization failed: ' + data.error)
      }
    } catch (error) {
      console.error('PayPal payment error:', error)
      alert('PayPal payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCryptoPayment = async () => {
    if (!user) return

    setIsProcessing(true)
    try {
      const selectedPlanData = subscriptionPlans.find(p => p.id === selectedPlan)
      
      const response = await fetch('/api/crypto/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('session_token')}`
        },
        body: JSON.stringify({
          planType: selectedPlan,
          cryptoCurrency: selectedCrypto,
          userId: user.id,
          amount: selectedPlanData?.price
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setCryptoPaymentData(data.payment)
      } else {
        alert('Crypto payment initialization failed: ' + data.error)
      }
    } catch (error) {
      console.error('Crypto payment error:', error)
      alert('Crypto payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const selectedPlanData = subscriptionPlans.find(p => p.id === selectedPlan)

  if (cryptoPaymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Bitcoin className="w-6 h-6 text-orange-500" />
                <span>Complete Payment</span>
              </CardTitle>
              <CardDescription>
                Send {selectedCrypto.toUpperCase()} to the address below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${cryptoPaymentData.pay_address}`}
                    alt="Payment QR Code"
                    className="mx-auto mb-4"
                  />
                  <p className="text-sm text-gray-600 mb-2">Send exactly:</p>
                  <p className="text-xl font-bold">{cryptoPaymentData.pay_amount} {selectedCrypto.toUpperCase()}</p>
                  <p className="text-sm text-gray-600 mt-2">To address:</p>
                  <p className="text-xs bg-white p-2 rounded border break-all">{cryptoPaymentData.pay_address}</p>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Payment expires in 60 minutes</span>
                </div>

                <Button
                  onClick={() => setCryptoPaymentData(null)}
                  variant="outline"
                  className="w-full"
                >
                  Back to Payment Options
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Plan
          </h1>
          <p className="text-gray-600">
            Unlock unlimited receipt generation with NateTube
          </p>
        </div>

        {/* Plan Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {subscriptionPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-blue-600 border-blue-600' 
                  : 'hover:border-gray-400'
              } ${plan.popular ? 'md:scale-105' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  {selectedPlan === plan.id && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </CardTitle>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.duration}</span>
                  {plan.savings && (
                    <Badge variant="secondary" className="text-green-600">
                      <Gift className="w-3 h-3 mr-1" />
                      {plan.savings}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Secure Payment Methods</span>
            </CardTitle>
            <CardDescription>
              Choose your preferred payment method for the {selectedPlanData?.name} plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* PayPal Payment */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Credit Card & PayPal</h3>
              <Button
                onClick={handlePayPalPayment}
                disabled={isProcessing}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {isProcessing ? 'Processing...' : `Pay $${selectedPlanData?.price} with PayPal`}
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-xs text-gray-500">OR PAY ANONYMOUSLY</span>
              </div>
            </div>

            {/* Crypto Payment */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Cryptocurrency (Anonymous)</h3>
              <div className="flex space-x-4">
                <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCryptos.map((crypto) => (
                      <SelectItem key={crypto} value={crypto}>
                        {crypto.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleCryptoPayment}
                  disabled={isProcessing}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                  size="lg"
                >
                  <Bitcoin className="w-5 h-5 mr-2 text-orange-600" />
                  {isProcessing ? 'Processing...' : `Pay with ${selectedCrypto.toUpperCase()}`}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                * Crypto payments are processed anonymously with no KYC required
              </p>
            </div>

            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Wallet className="w-3 h-3" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Zap className="w-3 h-3" />
                <span>Instant Access</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-6">
          <p>
            Questions? Contact support at{' '}
            <a href="mailto:support@natetube.com" className="text-blue-600 hover:underline">
              support@natetube.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}