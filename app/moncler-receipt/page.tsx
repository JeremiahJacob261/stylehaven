"use client";

import { useEffect, useState } from 'react';
import { MonclerReceiptData } from '@/types/receipt-types';

export default function MonclerReceipt() {
  const [receiptData, setReceiptData] = useState<MonclerReceiptData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('monclerReceiptData');
    if (savedData) {
      setReceiptData(JSON.parse(savedData));
    }
  }, []);

  if (!receiptData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Please wait while we load your receipt data.</p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        {/* Print button - hidden during print */}
        {/* <div className="no-print fixed top-4 right-4 z-50">
          <button
            onClick={handlePrint}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Print Receipt
          </button>
        </div> */}

        {/* Email container */}
        <div className="max-w-3xl mx-auto bg-white">
          {/* Header */}
          <div className="text-center py-4 bg-white">
            <p className="text-sm text-gray-600 mb-4">
              If you have problems viewing this email, <a href="#" className="underline">click here</a>
            </p>
            <div className="py-4">
              <img 
                src="/moncler/moncler_files/TRN_HeaderLogo.png" 
                alt="Moncler" 
                className="mx-auto w-28"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="px-8 py-8 bg-white">
            {/* Thank you title */}
            <div className="text-center mb-10">
              <h1 className="text-2xl font-light uppercase tracking-wide text-black mb-10">
                THANK YOU FOR YOUR ORDER
              </h1>
              
              <div className="text-base text-black leading-relaxed">
                <p>Dear {receiptData.FIRST_NAME},</p>
                <br />
                <p>Thank you for choosing Moncler!</p>
                <p>Your order has been received.</p>
              </div>
            </div>

            {/* Order information */}
            <div className="text-center mb-8">
              <div className="bg-black text-white py-4 px-8 inline-block mb-8">
                <a href="#" className="text-sm font-normal uppercase tracking-wide text-white no-underline">
                  MANAGE ORDER
                </a>
              </div>
              
              <div className="mb-8">
                <p className="text-lg font-semibold text-black mb-2">
                  Order number<br />{receiptData.ORDER_NUMBER}
                </p>
                <p className="text-sm text-black">
                  Order date: {receiptData.DATE}
                </p>
              </div>
            </div>

            {/* Your items section */}
            <div className="mb-10">
              <h2 className="text-xl font-light uppercase tracking-wide text-black mb-6">YOUR ITEM(S)</h2>
              <div className="border-t border-gray-300 pt-6 mb-6">
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="md:col-span-1">
                    <img 
                      src={receiptData.PRODUCT_IMAGE} 
                      alt={receiptData.PRODUCT_NAME}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="md:col-span-2">
                    {/* Product details would go here */}
                  </div>
                  <div className="md:col-span-1 text-right">
                    <p className="text-base font-light uppercase tracking-wide text-black">TOTAL</p>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-6">
                  {/* Order totals */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base font-light text-black">Subtotal</span>
                    <span className="text-base font-light text-black">{receiptData.SUBTOTAL}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base font-semibold text-black">Order total</span>
                    <span className="text-base font-semibold text-black">{receiptData.TOTAL_AMOUNT}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-base font-semibold text-black mb-3">Shipping Address</h3>
                <div className="text-base font-light text-black leading-relaxed">
                  <p>{receiptData.SHIPPING_ADDRESS_1}</p>
                  <p>{receiptData.SHIPPING_ADDRESS_2}</p>
                  <p>{receiptData.SHIPPING_ADDRESS_3}</p>
                  <p>{receiptData.SHIPPING_ADDRESS_4}</p>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-black mb-3">Billing Address</h3>
                <div className="text-base font-light text-black leading-relaxed">
                  <p>{receiptData.BILLING_ADDRESS_1}</p>
                  <p>{receiptData.BILLING_ADDRESS_2}</p>
                  <p>{receiptData.BILLING_ADDRESS_3}</p>
                  <p>{receiptData.BILLING_ADDRESS_4}</p>
                </div>
              </div>
            </div>

            {/* Payment and delivery methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-base font-semibold text-black mb-1">Delivery Method</h3>
                <p className="text-base font-light text-black">Standard</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-black mb-1">Payment Method</h3>
                <p className="text-base font-light text-black">{receiptData.PAYMENT_METHOD}</p>
                <p className="text-base font-light text-black">**** **** **** {receiptData.CARD_ENDING}</p>
              </div>
            </div>

            {/* Footer message */}
            <div className="text-center text-base font-light text-black leading-relaxed mb-10">
              <p>According to the payment method chosen at checkout, the payment may already have been deducted or pre-authorized.</p>
              <br />
              <p>To check the status of your order enter your order number <a href="#" className="text-black underline">here</a>. If you shopped as a registered user, you can get status updates directly on <a href="#" className="text-black underline">My Moncler</a>.</p>
              <br />
              <p>Warmly,<br />Moncler Team</p>
            </div>
          </div>

          {/* Browse new arrivals section */}
          <div className="border-t border-gray-300 py-10 text-center bg-white">
            <h2 className="text-xl font-light uppercase tracking-wide text-black mb-8">BROWSE OUR NEW ARRIVALS</h2>
          </div>

          {/* Services section */}
          <div className="border-t border-gray-300 py-10 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <a href="#" className="text-black no-underline">
                <span className="text-base font-light uppercase tracking-wide">OUR SPECIAL SERVICES</span>
              </a>
              <a href="#" className="text-black no-underline">
                <span className="text-base font-light uppercase tracking-wide">SHIPPING INFORMATION</span>
              </a>
              <a href="#" className="text-black no-underline">
                <span className="text-base font-light uppercase tracking-wide">EXCHANGES AND RETURNS</span>
              </a>
            </div>
          </div>

          {/* Help section */}
          <div className="border-t border-gray-300 py-10 text-center bg-white">
            <h2 className="text-base font-light uppercase tracking-wide text-black mb-4">NEED HELP?</h2>
            <p className="text-xs font-light text-black">
              Please note this is an automatic email, do not reply to this message directly.
            </p>
          </div>

          {/* Social media and app links */}
          <div className="border-t border-gray-300 py-6 text-center bg-white">
            <div className="flex justify-center space-x-4 mb-6">
              <a href="#"><img src="/moncler/moncler_files/FB-white.png" alt="Facebook" className="w-3 h-4" /></a>
              <a href="#"><img src="/moncler/moncler_files/xlogo.png" alt="Twitter" className="w-5 h-5" /></a>
              <a href="#"><img src="/moncler/moncler_files/instagrambigg.png" alt="Instagram" className="w-4 h-4" /></a>
              <a href="#"><img src="/moncler/moncler_files/YT-white.png" alt="YouTube" className="w-6 h-4" /></a>
              <a href="#"><img src="/moncler/moncler_files/NL_GooglePlay_ENG.png" alt="Google Play" className="h-5" /></a>
              <a href="#"><img src="/moncler/moncler_files/NL_Appstore_ENG.png" alt="App Store" className="h-5" /></a>
            </div>
          </div>

          {/* Legal links */}
          <div className="py-6 text-center bg-white text-xs">
            <a href="#" className="text-black no-underline mr-4">Privacy Policy</a>
            <a href="#" className="text-black no-underline">Terms of Sale</a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </>
  );
}