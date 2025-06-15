"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { GetServerSideProps } from 'next';
import { getReceiptData } from '@/lib/receipt-data';

interface StockXReceiptProps {
  ORDER_NUMBER: string;
  ORDER_DATE: string;
  CUSTOMER_NAME: string;
  CUSTOMER_EMAIL: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  PRODUCT_SIZE: string;
  PRODUCT_PRICE: string;
  SHIPPING_COST: string;
  TAX_AMOUNT: string;
  TOTAL_AMOUNT: string;
  TRACKING_NUMBER: string;
  ESTIMATED_DELIVERY: string;
  SHIPPING_ADDRESS_1: string;
  SHIPPING_ADDRESS_2: string;
  SHIPPING_ADDRESS_3: string;
  SHIPPING_ADDRESS_4: string;
  PAYMENT_METHOD: string;
  CARD_ENDING: string;
  ORDER_STATUS: 'ordered' | 'verified';
}

const defaultProps: StockXReceiptProps = {
  ORDER_NUMBER: "STX123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "/stockx/stockx_files/product-image.jpg",
  PRODUCT_NAME: "Air Jordan 1 Retro High OG",
  PRODUCT_SIZE: "US 10",
  PRODUCT_PRICE: "$285.00",
  SHIPPING_COST: "$13.95",
  TAX_AMOUNT: "$25.00",
  TOTAL_AMOUNT: "$323.95",
  TRACKING_NUMBER: "1Z999AA1234567890",
  ESTIMATED_DELIVERY: "December 5, 2024",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Main Street",
  SHIPPING_ADDRESS_3: "New York, NY 10001",
  SHIPPING_ADDRESS_4: "United States",
  PAYMENT_METHOD: "Visa",
  CARD_ENDING: "1234",
  ORDER_STATUS: "ordered"
};


interface StockXReceiptPageProps {
  receiptData?: StockXReceiptProps;
  receiptId?: string;
}

const StockXReceiptPage: React.FC<StockXReceiptPageProps> = ({ 
  receiptData: serverReceiptData, 
  receiptId 
}) => {
  const [receiptData, setReceiptData] = useState<StockXReceiptProps>(
    serverReceiptData || defaultProps
  );

  useEffect(() => {
    // Fallback to localStorage if no server data and no receiptId
    if (!serverReceiptData && !receiptId) {
      const storedData = localStorage.getItem('stockxReceiptData');
      if (storedData) {
        try {
          setReceiptData(JSON.parse(storedData));
        } catch (e) {}
      }
    }
  }, [serverReceiptData, receiptId]);

  const isVerified = receiptData.ORDER_STATUS === 'verified';
  const title = isVerified ? "Your StockX order has been verified & shipped!" : "Your order has been placed";

  return (
    <>
      <Head>
        <title>StockX - {isVerified ? 'Order Verified & Shipped' : 'Order Confirmation'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
          background-color: #eae8e3;
          color: #000000;
          line-height: 1.6;
        }

        .email-container {
          max-width: 640px;
          margin: 0 auto;
          background-color: #eae8e3;
        }

        .preheader {
          font-size: 0px;
          margin: 0px;
          line-height: 0px;
          color: #a0a0a0;
          text-align: center;
          padding: 20px 0;
        }

        .header {
          background-color: #000000;
          padding: 30px 40px;
          text-align: center;
        }

        .header img {
          max-width: 120px;
          height: auto;
        }

        .content {
          background-color: #ffffff;
          padding: 40px;
        }

        .order-title {
          font-size: 28px;
          font-weight: 700;
          color: #000;
          margin-bottom: 10px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .order-subtitle {
          font-size: 16px;
          color: #666;
          text-align: center;
          margin-bottom: 30px;
        }

        .status-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        .status-ordered {
          background-color: #f39c12;
          color: #ffffff;
        }

        .status-verified {
          background-color: #00c896;
          color: #ffffff;
        }

        .order-details {
          background-color: #f8f8f8;
          padding: 25px;
          margin-bottom: 30px;
          border-left: 5px solid #00c896;
        }

        .order-details h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .order-details p {
          margin: 8px 0;
          font-size: 14px;
          color: #444;
        }

        .product-showcase {
          display: flex;
          margin-bottom: 30px;
          padding: 25px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          border: 1px solid #eee;
        }

        .product-image {
          width: 150px;
          height: 150px;
          object-fit: cover;
          margin-right: 25px;
          border-radius: 8px;
        }

        .product-info {
          flex: 1;
        }

        .product-info h4 {
          font-size: 20px;
          font-weight: 600;
          color: #000;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .product-info .size {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
        }

        .product-info .price {
          font-size: 24px;
          font-weight: 700;
          color: #00c896;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 25px 0;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .pricing-table td {
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        .pricing-table .label {
          text-align: left;
          color: #666;
          font-weight: 500;
        }

        .pricing-table .value {
          text-align: right;
          font-weight: 600;
          color: #333;
        }

        .total-row {
          background-color: #000;
          color: white !important;
          font-size: 16px;
          font-weight: 700;
        }

        .total-row td {
          color: white !important;
          border-bottom: none !important;
        }

        .shipping-info {
          background-color: #f8f8f8;
          padding: 25px;
          margin: 30px 0;
          border-left: 5px solid #00c896;
        }

        .shipping-info h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #000;
          text-transform: uppercase;
        }

        .shipping-info p {
          margin: 5px 0;
          font-size: 14px;
          color: #444;
        }

        .payment-info {
          background-color: #f8f8f8;
          padding: 25px;
          margin: 30px 0;
          border-left: 5px solid #00c896;
        }

        .payment-info h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #000;
          text-transform: uppercase;
        }

        .payment-info p {
          margin: 5px 0;
          font-size: 14px;
          color: #444;
        }

        .tracking-section {
          background: linear-gradient(135deg, #00c896 0%, #00a085 100%);
          color: #fff;
          padding: 25px;
          margin: 30px 0;
          border-radius: 8px;
          text-align: center;
        }

        .tracking-section h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .tracking-number {
          font-size: 16px;
          font-weight: 700;
          background: rgba(255,255,255,0.2);
          padding: 10px 20px;
          border-radius: 20px;
          display: inline-block;
          margin: 10px 0;
        }

        .footer {
          text-align: center;
          padding: 30px;
          background-color: #000;
          color: #fff;
        }

        .footer p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .stockx-logo {
          color: #fff;
          font-size: 24px;
          font-weight: 900;
          letter-spacing: 2px;
        }
      `}</style>

      <div className="email-container">
        {/* Preheader */}
        <div className="preheader">
          {title}
          <br />
          {/* Hidden text spacer */}
          &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204;
        </div>

        {/* Header */}
        <div className="header">
          <div className="stockx-logo">STOCKX</div>
        </div>
        
        <div className="content">
          <div className="text-center mb-6">
            <span className={`status-badge ${isVerified ? 'status-verified' : 'status-ordered'}`}>
              {isVerified ? 'Verified & Shipped' : 'Order Placed'}
            </span>
          </div>

          <h1 className="order-title">
            {isVerified ? 'Your order has been verified & shipped!' : 'Order Confirmed'}
          </h1>
          <p className="order-subtitle">
            {isVerified ? 'Your authentic item is on its way' : 'Thank you for your StockX order'}
          </p>
          
          <div className="order-details">
            <h3>Order Information</h3>
            <p><strong>Order Number:</strong> {receiptData.ORDER_NUMBER}</p>
            <p><strong>Order Date:</strong> {receiptData.ORDER_DATE}</p>
            <p><strong>Customer:</strong> {receiptData.CUSTOMER_NAME}</p>
            <p><strong>Email:</strong> {receiptData.CUSTOMER_EMAIL}</p>
          </div>

          <div className="product-showcase">
            <img src={receiptData.PRODUCT_IMAGE} alt={receiptData.PRODUCT_NAME} className="product-image" />
            <div className="product-info">
              <h4>{receiptData.PRODUCT_NAME}</h4>
              <p className="size"><strong>Size:</strong> {receiptData.PRODUCT_SIZE}</p>
              <p className="price">{receiptData.PRODUCT_PRICE}</p>
            </div>
          </div>

          <table className="pricing-table">
            <tbody>
              <tr>
                <td className="label">Product Price:</td>
                <td className="value">{receiptData.PRODUCT_PRICE}</td>
              </tr>
              <tr>
                <td className="label">Shipping:</td>
                <td className="value">{receiptData.SHIPPING_COST}</td>
              </tr>
              <tr>
                <td className="label">Processing Fee:</td>
                <td className="value">{receiptData.TAX_AMOUNT}</td>
              </tr>
              <tr className="total-row">
                <td><strong>Total:</strong></td>
                <td><strong>{receiptData.TOTAL_AMOUNT}</strong></td>
              </tr>
            </tbody>
          </table>

          {isVerified && (
            <div className="tracking-section">
              <h4>Track Your Package</h4>
              <p>Your order is now on its way!</p>
              <div className="tracking-number">{receiptData.TRACKING_NUMBER}</div>
              <p>Estimated Delivery: {receiptData.ESTIMATED_DELIVERY}</p>
            </div>
          )}

          <div className="shipping-info">
            <h4>Shipping Address</h4>
            <p>{receiptData.SHIPPING_ADDRESS_1}</p>
            <p>{receiptData.SHIPPING_ADDRESS_2}</p>
            <p>{receiptData.SHIPPING_ADDRESS_3}</p>
            <p>{receiptData.SHIPPING_ADDRESS_4}</p>
          </div>

          <div className="payment-info">
            <h4>Payment Information</h4>
            <p><strong>Payment Method:</strong> {receiptData.PAYMENT_METHOD} ending in {receiptData.CARD_ENDING}</p>
          </div>

          {!isVerified && (
            <div className="order-details">
              <h3>What's Next?</h3>
              <p>• Your order is being processed</p>
              <p>• We'll authenticate your item at our verification center</p>
              <p>• You'll receive a shipping notification once verified</p>
              <p>• Track your order status at stockx.com</p>
            </div>
          )}
        </div>

        <div className="footer">
          <p>© 2024 StockX. All rights reserved.</p>
          <p>Authenticity guaranteed by our expert verification team.</p>
        </div>
      </div>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (id && typeof id === 'string') {
    try {
      const receipt = await getReceiptData(id);
      
      if (receipt && receipt.receipt_type === 'stockx') {
        return {
          props: {
            receiptData: receipt.receipt_data,
            receiptId: id,
          },
        };
      }
    } catch (error) {
      console.error('Error fetching receipt data:', error);
    }
  }

  return {
    props: {
      receiptData: null,
      receiptId: null,
    },
  };
};



export default StockXReceiptPage;