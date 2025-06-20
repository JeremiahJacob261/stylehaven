import React, { useRef, useEffect, JSX, useState } from "react";
import { usePayPal } from "@/hooks/usePayPal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Clock, Zap } from "lucide-react";

declare global {
    interface Window {
        paypal: any;
    }
}

export default function Paypal(): JSX.Element {
    const paypalOneTime = useRef<HTMLDivElement>(null);
    const paypalSubscription = useRef<HTMLDivElement>(null);
    const [selectedPlan, setSelectedPlan] = useState<'one-time' | 'monthly'>('one-time');
    
    const { 
        isProcessing, 
        error, 
        handleOneTimePayment, 
        handleMonthlySubscription, 
        clearError 
    } = usePayPal();

    useEffect(() => {
        if (!window.paypal) {
            console.error("PayPal SDK not loaded");
            return;
        }

        // One-time payment button
        if (paypalOneTime.current && selectedPlan === 'one-time') {
            paypalOneTime.current.innerHTML = ''; // Clear previous render
            
            window.paypal
                .Buttons({
                    createOrder: (data: any, actions: any) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: "NateTube One-time Access",
                                    amount: {
                                        currency_code: "USD",
                                        value: "25.00",
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data: any, actions: any) => {
                        try {
                            const order = await actions.order.capture();
                            console.log("One-time payment successful:", order);
                            
                            await handleOneTimePayment({
                                orderID: data.orderID,
                                payerID: data.payerID,
                                facilitatorAccessToken: data.facilitatorAccessToken
                            });
                        } catch (error) {
                            console.error("Payment capture error:", error);
                        }
                    },
                    onError: (err: any) => {
                        console.error("PayPal error:", err);
                    },
                    onCancel: (data: any) => {
                        console.log("Payment cancelled:", data);
                    },
                })
                .render(paypalOneTime.current);
        }

        // Monthly subscription button
        if (paypalSubscription.current && selectedPlan === 'monthly') {
            paypalSubscription.current.innerHTML = ''; // Clear previous render
            
            window.paypal
                .Buttons({
                    createSubscription: (data: any, actions: any) => {
                        return actions.subscription.create({
                            'plan_id': process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID // You need to create this plan in PayPal
                        });
                    },
                    onApprove: async (data: any, actions: any) => {
                        try {
                            console.log("Monthly subscription approved:", data);
                            
                            await handleMonthlySubscription({
                                orderID: data.orderID,
                                subscriptionID: data.subscriptionID,
                                payerID: data.payerID
                            });
                        } catch (error) {
                            console.error("Subscription approval error:", error);
                        }
                    },
                    onError: (err: any) => {
                        console.error("PayPal subscription error:", err);
                    },
                    onCancel: (data: any) => {
                        console.log("Subscription cancelled:", data);
                    },
                })
                .render(paypalSubscription.current);
        }
    }, [selectedPlan, handleOneTimePayment, handleMonthlySubscription]);

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Choose Your Plan
                </h1>
                <p className="text-gray-600">
                    Select the best option for your needs
                </p>
            </div>

            {/* Plan Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                    className={`cursor-pointer transition-all ${
                        selectedPlan === 'one-time' 
                            ? 'ring-2 ring-blue-500 border-blue-500' 
                            : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan('one-time')}
                >
                    <CardHeader className="text-center">
                        <CardTitle className="flex items-center justify-center space-x-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <span>One-time Payment</span>
                        </CardTitle>
                        <div className="text-3xl font-bold text-gray-900">$25</div>
                        <p className="text-sm text-gray-600">Lifetime access</p>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li>✓ Unlimited receipt generation</li>
                            <li>✓ All brand templates</li>
                            <li>✓ Lifetime access</li>
                            <li>✓ No recurring fees</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card 
                    className={`cursor-pointer transition-all ${
                        selectedPlan === 'monthly' 
                            ? 'ring-2 ring-blue-500 border-blue-500' 
                            : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan('monthly')}
                >
                    <CardHeader className="text-center">
                        <CardTitle className="flex items-center justify-center space-x-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <span>Monthly Plan</span>
                        </CardTitle>
                        <div className="text-3xl font-bold text-gray-900">$5</div>
                        <p className="text-sm text-gray-600">per month</p>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li>✓ Unlimited receipt generation</li>
                            <li>✓ All brand templates</li>
                            <li>✓ Monthly billing</li>
                            <li>✓ Cancel anytime</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-800">
                        <strong>Payment Error:</strong> {error}
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearError}
                        className="mt-2"
                    >
                        Dismiss
                    </Button>
                </div>
            )}

            {/* PayPal Buttons */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Complete Payment</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isProcessing && (
                        <div className="text-center text-gray-600 mb-4">
                            Processing payment...
                        </div>
                    )}
                    
                    {selectedPlan === 'one-time' && (
                        <div ref={paypalOneTime}></div>
                    )}
                    
                    {selectedPlan === 'monthly' && (
                        <div ref={paypalSubscription}></div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}