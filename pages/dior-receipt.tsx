"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface DiorReceiptProps {
  ORDER_NUMBER: string;
  ORDER_DATE: string;
  CUSTOMER_NAME: string;
  CUSTOMER_EMAIL: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  PRODUCT_REFERENCE: string;
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

const defaultProps: DiorReceiptProps = {
  ORDER_NUMBER: "469216300",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "./dior_files/PRODUCT_IMAGE",
  PRODUCT_NAME: "B23 High-Top Sneaker",
  PRODUCT_REFERENCE: "3SN272ZIR_H069",
  PRODUCT_PRICE: "€ 1,200.00",
  QUANTITY: "1",
  SUBTOTAL: "€ 1,200.00",
  SHIPPING_COST: "Free",
  TAX_AMOUNT: "€ 200.00",
  TOTAL_AMOUNT: "€ 1,200.00",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Luxury Avenue",
  SHIPPING_ADDRESS_3: "Paris 75001",
  SHIPPING_ADDRESS_4: "France",
  BILLING_ADDRESS_1: "John Doe",
  BILLING_ADDRESS_2: "123 Luxury Avenue",
  BILLING_ADDRESS_3: "Paris 75001",
  BILLING_ADDRESS_4: "France",
  PAYMENT_METHOD: "Visa",
  CARD_ENDING: "1234"
};

const DiorReceiptPage: React.FC = () => {
  const [receiptData, setReceiptData] = useState<DiorReceiptProps>(defaultProps);

  useEffect(() => {
    const storedData = localStorage.getItem('diorReceiptData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setReceiptData(parsedData);
      } catch (error) {
        console.error('Error parsing Dior receipt data:', error);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dior - Order Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background-color: #f8f8f8;
          color: #333;
          line-height: 1.6;
        }

        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .header {
          background-color: #000000;
          padding: 30px 40px;
          text-align: center;
        }

        .header img {
          max-width: 200px;
          height: auto;
        }

        .content {
          padding: 40px;
        }

        .order-title {
          font-size: 28px;
          font-weight: 300;
          color: #000;
          margin-bottom: 10px;
          text-align: center;
        }

        .order-subtitle {
          font-size: 16px;
          color: #666;
          text-align: center;
          margin-bottom: 30px;
        }

        .order-number {
          background-color: #f5f5f5;
          padding: 20px;
          border-left: 4px solid #000;
          margin-bottom: 20px;
        }

        .order-number p {
          margin: 0;
          font-size: 18px;
          font-weight: 500;
        }

        .order-details {
          margin-bottom: 30px;
        }

        .order-details h3 {
          font-size: 22px;
          font-weight: 400;
          color: #000;
          margin-bottom: 15px;
        }

        .order-details p {
          margin: 5px 0;
          font-size: 14px;
          color: #666;
        }

        .product-section {
          display: flex;
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #eee;
        }

        .product-image {
          width: 120px;
          height: 120px;
          object-fit: cover;
          margin-right: 20px;
        }

        .product-info {
          flex: 1;
        }

        .product-info h4 {
          font-size: 18px;
          font-weight: 500;
          color: #000;
          margin-bottom: 10px;
        }

        .product-info p {
          margin: 5px 0;
          font-size: 14px;
          color: #666;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        .pricing-table td {
          padding: 10px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        .pricing-table .label {
          text-align: left;
          color: #666;
        }

        .pricing-table .value {
          text-align: right;
          font-weight: 500;
        }

        .total-row {
          font-size: 16px;
          font-weight: 600;
          border-top: 2px solid #000 !important;
        }

        .address-section {
          display: flex;
          justify-content: space-between;
          margin: 30px 0;
        }

        .address-block {
          width: 48%;
        }

        .address-block h4 {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 10px;
          color: #000;
        }

        .address-block p {
          margin: 3px 0;
          font-size: 14px;
          color: #666;
        }

        .footer {
          text-align: center;
          padding: 20px;
          background-color: #f5f5f5;
          margin-top: 30px;
        }

        .footer p {
          margin: 0;
          font-size: 12px;
          color: #999;
        }
      `}</style>

      <div className="email-container">
        <div className="header">
          <img src="/dior/dior_files/dior-logo.png" alt="DIOR" />
        </div>
        
        <div className="content">
          <h1 className="order-title">Order Confirmation</h1>
          <p className="order-subtitle">Thank you for your order, {receiptData.CUSTOMER_NAME}</p>
          
          <div className="order-number">
            <p><strong>Order Number:</strong> {receiptData.ORDER_NUMBER}</p>
            <p><strong>Order Date:</strong> {receiptData.ORDER_DATE}</p>
          </div>

          <div className="order-details">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {receiptData.CUSTOMER_NAME}</p>
            <p><strong>Email:</strong> {receiptData.CUSTOMER_EMAIL}</p>
          </div>

          <div className="product-section">
            <img src={receiptData.PRODUCT_IMAGE} alt={receiptData.PRODUCT_NAME} className="product-image" />
            <div className="product-info">
              <h4>{receiptData.PRODUCT_NAME}</h4>
              <p><strong>Reference:</strong> {receiptData.PRODUCT_REFERENCE}</p>
              <p><strong>Quantity:</strong> {receiptData.QUANTITY}</p>
              <p><strong>Price:</strong> {receiptData.PRODUCT_PRICE}</p>
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

          <div className="order-details">
            <h3>Payment Information</h3>
            <p><strong>Payment Method:</strong> {receiptData.PAYMENT_METHOD} ending in {receiptData.CARD_ENDING}</p>
          </div>
        </div>

        <div className="footer">
          <p>&copy; 2024 Christian Dior Couture. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default DiorReceiptPage;