"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getReceiptData } from '@/lib/receipt-data';

interface GrailedReceiptProps {
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
  SELLER_NAME: string;
  SELLER_USERNAME: string;
  SHIPPING_COST: string;
  GRAILED_FEE: string;
  TOTAL_AMOUNT: string;
  SHIPPING_ADDRESS_1: string;
  SHIPPING_ADDRESS_2: string;
  SHIPPING_ADDRESS_3: string;
  SHIPPING_ADDRESS_4: string;
  PAYMENT_METHOD: string;
  CARD_ENDING: string;
}

const defaultProps: GrailedReceiptProps = {
  ORDER_NUMBER: "GR123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/grailed/grailed_files/product-image.jpg",
  PRODUCT_NAME: "Vintage Band T-Shirt",
  PRODUCT_BRAND: "Fear of God",
  PRODUCT_COLOR: "Black",
  PRODUCT_SIZE: "M",
  PRODUCT_PRICE: "$350",
  SELLER_NAME: "VintageCollector",
  SELLER_USERNAME: "@vintagecollector",
  SHIPPING_COST: "$15",
  GRAILED_FEE: "$35",
  TOTAL_AMOUNT: "$400",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Vintage Street",
  SHIPPING_ADDRESS_3: "New York, NY 10001",
  SHIPPING_ADDRESS_4: "United States",
  PAYMENT_METHOD: "PayPal",
  CARD_ENDING: "3456"
};

interface GrailedReceiptPageProps {
  receiptData?: GrailedReceiptProps;
  receiptId?: string;
}

const GrailedReceiptPage: React.FC<GrailedReceiptPageProps> = ({ 
  receiptData: serverReceiptData, 
  receiptId 
}) => {
  const [receiptData, setReceiptData] = useState<GrailedReceiptProps>(
    serverReceiptData || defaultProps
  );

  useEffect(() => {
    if (!serverReceiptData && !receiptId) {
      const storedData = localStorage.getItem('grailedReceiptData');
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
        <title>{`Grailed - Order ${receiptData.ORDER_NUMBER}`}</title>
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
            <img src="https://stylehaven-five.vercel.app/grailed/grailed_files/logo-no-whitespace.jpg" alt="Grailed" />
          </div>
          
          <div className="content">
            <h1 className="purchase-title">Purchase Confirmed!</h1>
            <p className="purchase-subtitle">Your Grailed order has been processed successfully</p>
            
            <div className="order-summary">
              <h3>Order Details</h3>
              <p><strong>Order ID:</strong> {receiptData.ORDER_NUMBER}</p>
              <p><strong>Order Date:</strong> {receiptData.ORDER_DATE}</p>
              <p><strong>Buyer:</strong> {receiptData.CUSTOMER_NAME}</p>
              <p><strong>Email:</strong> {receiptData.CUSTOMER_EMAIL}</p>
            </div>

            <div className="item-showcase">
              <img src={receiptData.PRODUCT_IMAGE} alt={receiptData.PRODUCT_NAME} className="item-image" />
              <div className="item-details">
                <h4>{receiptData.PRODUCT_NAME}</h4>
                <p className="brand">{receiptData.PRODUCT_BRAND}</p>
                <p className="size"><strong>Size:</strong> {receiptData.PRODUCT_SIZE}</p>
                <p className="price">{receiptData.PRODUCT_PRICE}</p>
              </div>
            </div>

            <table className="pricing-table">
              <tbody>
                <tr>
                  <td className="label">Item Price:</td>
                  <td className="value">{receiptData.PRODUCT_PRICE}</td>
                </tr>
                <tr>
                  <td className="label">Tax:</td>
                  <td className="value">{receiptData.GRAILED_FEE}</td>
                </tr>
                <tr className="total-row">
                  <td className="label"><strong>Total Paid:</strong></td>
                  <td className="value"><strong>{receiptData.TOTAL_AMOUNT}</strong></td>
                </tr>
              </tbody>
            </table>

            <div className="seller-info">
              <h4>Seller Information</h4>
              <p><strong>Seller:</strong> {receiptData.SELLER_NAME}</p>
              <p><strong>Username:</strong> {receiptData.SELLER_USERNAME}</p>
            </div>

            <div className="info-section">
              <div className="info-block">
                <h4>Shipping Address</h4>
                <p>{receiptData.SHIPPING_ADDRESS_1}</p>
                <p>{receiptData.SHIPPING_ADDRESS_2}</p>
                <p>{receiptData.SHIPPING_ADDRESS_3}</p>
                <p>{receiptData.SHIPPING_ADDRESS_4}</p>
              </div>
            </div>

            <div className="grailed-note">
              <p>Thanks for using Grailed! Your item will be shipped by the seller once payment is confirmed.</p>
            </div>
          </div>

          <div className="footer">
            <p>© 2024 Grailed, Inc. All rights reserved.</p>
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
      
      if (receipt && receipt.receipt_type === 'grailed') {
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

export default GrailedReceiptPage;