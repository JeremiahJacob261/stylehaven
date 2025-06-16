"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getReceiptData } from '@/lib/receipt-data';

interface TrapstarReceiptProps {
  ORDER_NUMBER: string;
  ORDER_DATE: string;
  CUSTOMER_NAME: string;
  CUSTOMER_EMAIL: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  PRODUCT_COLOR: string;
  PRODUCT_SIZE: string;
  PRODUCT_PRICE: string;
  QUANTITY: string;
  SUBTOTAL: string;
  SHIPPING_COST: string;
  TAX_AMOUNT: string;
  TOTAL_AMOUNT: string;
  SHIPPING_ADDRESS_1: string;
  SHIPPING_ADDRESS_2: string;
  SHIPPING_ADDRESS_3: string;
  SHIPPING_ADDRESS_4: string;
  BILLING_ADDRESS_1: string;
  BILLING_ADDRESS_2: string;
  BILLING_ADDRESS_3: string;
  BILLING_ADDRESS_4: string;
  PAYMENT_METHOD: string;
  CARD_ENDING: string;
}

const defaultProps: TrapstarReceiptProps = {
  ORDER_NUMBER: "TRP123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "/trapstar/trapstar_files/product-image.jpg",
  PRODUCT_NAME: "Irongate T-Shirt",
  PRODUCT_COLOR: "Black",
  PRODUCT_SIZE: "L",
  PRODUCT_PRICE: "£65",
  QUANTITY: "1",
  SUBTOTAL: "£65",
  SHIPPING_COST: "£5",
  TAX_AMOUNT: "£14",
  TOTAL_AMOUNT: "£84",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Urban Street",
  SHIPPING_ADDRESS_3: "London, E1 6AN",
  SHIPPING_ADDRESS_4: "United Kingdom",
  BILLING_ADDRESS_1: "John Doe",
  BILLING_ADDRESS_2: "123 Urban Street",
  BILLING_ADDRESS_3: "London, E1 6AN",
  BILLING_ADDRESS_4: "United Kingdom",
  PAYMENT_METHOD: "Visa",
  CARD_ENDING: "6789"
};

interface TrapstarReceiptPageProps {
  receiptData?: TrapstarReceiptProps;
  receiptId?: string;
}

const TrapstarReceiptPage: React.FC<TrapstarReceiptPageProps> = ({ 
  receiptData: serverReceiptData, 
  receiptId 
}) => {
  const [receiptData, setReceiptData] = useState<TrapstarReceiptProps>(
    serverReceiptData || defaultProps
  );

  useEffect(() => {
    if (!serverReceiptData && !receiptId) {
      const storedData = localStorage.getItem('trapstarReceiptData');
      if (storedData) {
        try {
          setReceiptData(JSON.parse(storedData));
        } catch (e) {}
      }
    }
  }, [serverReceiptData, receiptId]);

  return (
    <>
      <Head>
        <title>{`Trapstar - Order ${receiptData.ORDER_NUMBER}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div>
        {receiptId && (
          <div style={{ 
            position: 'fixed', 
            top: 10, 
            right: 10, 
            background: '#4CAF50', 
            color: 'white', 
            padding: '5px 10px', 
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 1000
          }}>
            Loaded from database
          </div>
        )}
        
        <div className="email-container">
          <div className="header">
            <div className="logo">TRAPSTAR</div>
          </div>
          
          <div className="content">
            <h1 className="order-title">Order Confirmed</h1>
            <p className="order-subtitle">Your Trapstar order is being processed</p>
            
            <div className="order-details">
              <h3>Order Information</h3>
              <p><strong>Order Number:</strong> {receiptData.ORDER_NUMBER}</p>
              <p><strong>Order Date:</strong> {receiptData.ORDER_DATE}</p>
              <p><strong>Customer:</strong> {receiptData.CUSTOMER_NAME}</p>
              <p><strong>Email:</strong> {receiptData.CUSTOMER_EMAIL}</p>
            </div>

            <div className="product-section">
              <img src={receiptData.PRODUCT_IMAGE} alt={receiptData.PRODUCT_NAME} className="product-image" />
              <div className="product-info">
                <h4>{receiptData.PRODUCT_NAME}</h4>
                <p><strong>Size:</strong> {receiptData.PRODUCT_SIZE}</p>
                <p><strong>Color:</strong> {receiptData.PRODUCT_COLOR}</p>
                <p><strong>Quantity:</strong> {receiptData.QUANTITY}</p>
                <p className="price">{receiptData.PRODUCT_PRICE}</p>
              </div>
            </div>

            <table className="pricing-table">
              <tbody>
                <tr>
                  <td className="label">Subtotal:</td>
                  <td className="value">{receiptData.SUBTOTAL}</td>
                </tr>
                <tr>
                  <td className="label">Shipping:</td>
                  <td className="value">{receiptData.SHIPPING_COST}</td>
                </tr>
                <tr>
                  <td className="label">Tax:</td>
                  <td className="value">{receiptData.TAX_AMOUNT}</td>
                </tr>
                <tr className="total-row">
                  <td className="label"><strong>Total:</strong></td>
                  <td className="value"><strong>{receiptData.TOTAL_AMOUNT}</strong></td>
                </tr>
              </tbody>
            </table>

            <div className="address-section">
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

            <div className="trapstar-note">
              <p>It's A Secret</p>
            </div>
          </div>

          <div className="footer">
            <p>© 2024 Trapstar London. All rights reserved.</p>
          </div>
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
      
      if (receipt && receipt.receipt_type === 'trapstar') {
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

export default TrapstarReceiptPage;