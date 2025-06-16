"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getReceiptData } from '@/lib/receipt-data';

interface FarfetchReceiptProps {
  ORDER_NUMBER: string;
  ORDER_DATE: string;
  CUSTOMER_NAME: string;
  CUSTOMER_EMAIL: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  PRODUCT_BRAND: string;
  PRODUCT_COLOR: string;
  PRODUCT_SIZE: string;
  PRODUCT_PRICE: string;
  QUANTITY: string;
  SUBTOTAL: string;
  DELIVERY:string;
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

const defaultProps: FarfetchReceiptProps = {
  ORDER_NUMBER: "FF123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "/farfetch/farfetch_files/product-image.jpg",
  PRODUCT_NAME: "Oversized Logo T-Shirt",
  PRODUCT_BRAND: "Off-White",
  PRODUCT_COLOR: "Black",
  PRODUCT_SIZE: "M",
  PRODUCT_PRICE: "€ 395",
  QUANTITY: "1",
  SUBTOTAL: "€ 395",
  DELIVERY: "Expected delivery by December 5, 2024",
  SHIPPING_COST: "€ 20",
  TAX_AMOUNT: "€ 79",
  TOTAL_AMOUNT: "€ 494",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Fashion Street",
  SHIPPING_ADDRESS_3: "London, W1K 5AB",
  SHIPPING_ADDRESS_4: "United Kingdom",
  BILLING_ADDRESS_1: "John Doe",
  BILLING_ADDRESS_2: "123 Fashion Street",
  BILLING_ADDRESS_3: "London, W1K 5AB",
  BILLING_ADDRESS_4: "United Kingdom",
  PAYMENT_METHOD: "Mastercard",
  CARD_ENDING: "8901"
};

interface FarfetchReceiptPageProps {
  receiptData?: FarfetchReceiptProps;
  receiptId?: string;
}

const FarfetchReceiptPage: React.FC<FarfetchReceiptPageProps> = ({ 
  receiptData: serverReceiptData, 
  receiptId 
}) => {
  const [receiptData, setReceiptData] = useState<FarfetchReceiptProps>(
    serverReceiptData || defaultProps
  );

  useEffect(() => {
    if (!serverReceiptData && !receiptId) {
      const storedData = localStorage.getItem('farfetchReceiptData');
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
        <title>{`Farfetch - Order ${receiptData.ORDER_NUMBER}`}</title>
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
            <img src="/farfetch/farfetch_files/farfetch-logo.png" alt="Farfetch" />
          </div>
          
          <div className="content">
            <h1 className="greeting">Hello {receiptData.CUSTOMER_NAME},</h1>
            <p>Thank you for your order! We're preparing your items for shipment.</p>
            
            <div className="order-info">
              <h3>Order Details</h3>
              <p><strong>Order Number:</strong> {receiptData.ORDER_NUMBER}</p>
              <p><strong>Order Date:</strong> {receiptData.ORDER_DATE}</p>
              <p><strong>Expected Delivery:</strong> {receiptData.DELIVERY}</p>
            </div>

            <div className="product-section">
              <img src={receiptData.PRODUCT_IMAGE} alt={receiptData.PRODUCT_NAME} className="product-image" />
              <div className="product-details">
                <h4>{receiptData.PRODUCT_NAME}</h4>
                <p className="brand">{receiptData.PRODUCT_BRAND}</p>
                <p className="price">{receiptData.PRODUCT_PRICE}</p>
              </div>
            </div>

            <table className="summary-table">
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

            <div className="addresses">
              <div className="address-block">
                <h4>Shipping Address</h4>
                <p>{receiptData.SHIPPING_ADDRESS_1}</p>
                <p>{receiptData.SHIPPING_ADDRESS_2}</p>
                <p>{receiptData.SHIPPING_ADDRESS_3}</p>
                <p>{receiptData.SHIPPING_ADDRESS_4}</p>
              </div>
              
              <div className="address-block">
                <h4>Billing Address</h4>
                <p>{receiptData.BILLING_ADDRESS_1}</p>
                <p>{receiptData.BILLING_ADDRESS_2}</p>
                <p>{receiptData.BILLING_ADDRESS_3}</p>
                <p>{receiptData.BILLING_ADDRESS_4}</p>
              </div>
            </div>

            <div className="order-info">
              <h3>Payment Information</h3>
              <p><strong>Payment Method:</strong> {receiptData.PAYMENT_METHOD} ending in {receiptData.CARD_ENDING}</p>
            </div>
          </div>

          <div className="footer">
            <p>© 2024 Farfetch UK Limited. All rights reserved.</p>
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
      
      if (receipt && receipt.receipt_type === 'farfetch') {
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

export default FarfetchReceiptPage;