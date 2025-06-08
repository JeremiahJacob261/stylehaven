"use client";

import { useEffect, useState } from 'react';
import { NorthFaceReceiptData } from '@/types/receipt-types';

export default function NorthFaceReceipt() {
  const [receiptData, setReceiptData] = useState<NorthFaceReceiptData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('northfaceReceiptData');
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
      <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        {/* Print button - hidden during print */}
        {/* <div className="no-print fixed top-4 right-4 z-50">
          <button
            onClick={handlePrint}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Print Receipt
          </button>
        </div> */}

        {/* Email content */}
        <div className="max-w-2xl mx-auto bg-white">
          {/* Header */}
          <div className="text-center py-5">
            <img 
              src="/northface/northface_files/0ec5ac62-677e-40f8-9b7d-5c501058bf9c.jpg" 
              alt="The North Face" 
              className="mx-auto h-12 w-auto"
            />
          </div>

          {/* Navigation */}
          <div className="text-center py-4">
            <div className="flex justify-center space-x-15">
              <a href="#" className="text-black text-sm font-bold">MEN</a>
              <a href="#" className="text-black text-sm font-bold">WOMEN</a>
              <a href="#" className="text-black text-sm font-bold">KIDS</a>
              <a href="#" className="text-black text-sm font-bold">BAGS & TENTS</a>
            </div>
          </div>

          {/* Main content */}
          <div className="px-12 py-12">
            {/* Thank you message */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-black uppercase mb-6">
                THANKS FOR<br />YOUR ORDER
              </h1>
              <div className="text-lg leading-relaxed">
                <p className="font-bold">Hi {receiptData.CUSTOMER_NAME.split(' ')[0]}</p>
                <br />
                <p>Thanks for shopping with us.</p>
                <br />
                <p>We've received your order,<br />a summary of which can be found below.</p>
                <br />
                <p>We'll get in touch again when your order is on its way.</p>
                <br />
                <p>You can check the status of your order anytime by visiting<br />your <a href="#" className="underline font-bold">My Account</a> page.</p>
              </div>
            </div>

            {/* Order details */}
            <div className="border-t border-gray-300 pt-8 mb-8">
              <h2 className="text-2xl font-bold text-black uppercase mb-2">
                ORDER {receiptData.ORDER_NUMBER}
              </h2>
              <p className="text-sm uppercase text-black mb-8">{receiptData.ORDER_DATE}</p>

              {/* Product details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <img 
                    src={receiptData.PRODUCT_IMAGE} 
                    alt={receiptData.PRODUCT_NAME}
                    className="w-full h-64 object-cover mb-2"
                  />
                  <a href="#" className="text-sm underline font-bold">Product Info</a>
                </div>
                <div className="space-y-6">
                  <h3 className="text-base font-bold uppercase">{receiptData.PRODUCT_NAME}</h3>
                  
                  <div>
                    <p className="text-base uppercase">COLOR:</p>
                    <p className="text-base uppercase font-bold">{receiptData.PRODUCT_COLOR}</p>
                  </div>
                  
                  <div>
                    <p className="text-base uppercase">SIZE:</p>
                    <p className="text-base uppercase font-bold">{receiptData.PRODUCT_SIZE}</p>
                  </div>
                  
                  <div>
                    <p className="text-base uppercase">QUANTITY:</p>
                    <p className="text-base uppercase font-bold">{receiptData.QUANTITY}</p>
                  </div>
                  
                  <div>
                    <p className="text-base uppercase">Unit Price:</p>
                    <p className="text-base uppercase font-bold">{receiptData.PRODUCT_PRICE}</p>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="border-t border-gray-300 pt-8 mb-8">
                <div className="flex justify-end">
                  <div className="w-80 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Subtotal:</span>
                      <span className="text-sm font-bold">{receiptData.SUBTOTAL}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Shipping:</span>
                      <span className="text-sm font-bold">{receiptData.SHIPPING_COST}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-bold">Total:</span>
                      <span className="text-sm font-bold">{receiptData.TOTAL_AMOUNT}</span>
                    </div>
                    <div>
                      <span className="text-xs">(VAT included)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping information */}
              <div className="border-t border-gray-300 pt-8 mb-8">
                <h3 className="text-2xl font-bold uppercase mb-6">SHIPPING INFORMATION</h3>
                <div className="mb-6">
                  <p className="text-sm font-bold uppercase mb-2">SHIPPING ADDRESS:</p>
                  <div className="text-base leading-relaxed">
                    {receiptData.SHIPPING_ADDRESS_1}<br />
                    {receiptData.SHIPPING_ADDRESS_2}<br />
                    {receiptData.SHIPPING_ADDRESS_3}<br />
                    {receiptData.SHIPPING_ADDRESS_4}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-bold uppercase mb-2">PAYMENT METHOD:</p>
                    <p className="text-base">{receiptData.PAYMENT_METHOD}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase mb-2">SHIPPING METHOD:</p>
                    <p className="text-base">{receiptData.SHIPPING_METHOD}</p>
                  </div>
                </div>
              </div>

              {/* Customer service section */}
              <div className="border-t border-b border-gray-300 py-8 mb-8">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <img src="/northface/northface_files/a6616b56-96b2-493b-9df9-9d00a83d5014.jpg" alt="Support" className="mx-auto mb-2" />
                  </div>
                  <div className="text-center">
                    <img src="/northface/northface_files/1035c32e-04e3-442d-8c41-a7bc5e7836b8.jpg" alt="Contact" className="mx-auto mb-2" />
                  </div>
                  <div>
                    <p className="text-base font-bold uppercase mb-2">Got a question?</p>
                    <p className="text-base font-bold uppercase text-red-600">Get in touch!</p>
                  </div>
                </div>
              </div>

              {/* Footer message */}
              <div className="text-center text-sm leading-relaxed mb-8">
                <p>Please do not reply directly to this message.<br />
                This email was sent to you by <a href="#" className="underline font-bold">https://www.thenorthface.com</a>, a website<br />
                owned and operated by VF International S.a.g.l. - THE NORTH FACE Division -<br />
                Via Laveggio 5, 6855 Stabio (CH) - CH-514.4.028.163-8.</p>
              </div>

              {/* Links */}
              <div className="text-center text-sm">
                <a href="#" className="underline">Returns</a> | <a href="#" className="underline">Terms of Sale</a>
              </div>
            </div>
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