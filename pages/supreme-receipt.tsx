import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface SupremeReceiptProps {
  ORDER_NUMBER: string;
  ORDER_DATE: string;
  CUSTOMER_NAME: string;
  CUSTOMER_EMAIL: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  PRODUCT_SIZE: string;
  PRODUCT_COLOR: string;
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
  PAYMENT_METHOD: string;
  CARD_ENDING: string;
}

const defaultProps: SupremeReceiptProps = {
  ORDER_NUMBER: "SUP123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "/supreme/supreme_files/product-image.jpg",
  PRODUCT_NAME: "Supreme Box Logo Hoodie",
  PRODUCT_SIZE: "Large",
  PRODUCT_COLOR: "Red",
  PRODUCT_PRICE: "$158.00",
  QUANTITY: "1",
  SUBTOTAL: "$158.00",
  SHIPPING_COST: "$10.00",
  TAX_AMOUNT: "$15.80",
  TOTAL_AMOUNT: "$183.80",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Main Street",
  SHIPPING_ADDRESS_3: "New York, NY 10001",
  SHIPPING_ADDRESS_4: "United States",
  PAYMENT_METHOD: "Visa",
  CARD_ENDING: "1234"
};

const SupremeReceiptPage: React.FC = () => {
  const [receiptData, setReceiptData] = useState<SupremeReceiptProps>(defaultProps);

  useEffect(() => {
    const storedData = localStorage.getItem('supremeReceiptData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setReceiptData(parsedData);
      } catch (error) {
        console.error('Error parsing Supreme receipt data:', error);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Supreme - Order Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #ffffff;
          color: #000;
          line-height: 1.4;
        }

        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }

        .header {
          background-color: #ff0000;
          padding: 30px 40px;
          text-align: center;
        }

        .header .logo {
          color: #ffffff;
          font-size: 36px;
          font-weight: 900;
          letter-spacing: 8px;
          text-transform: uppercase;
        }

        .content {
          padding: 40px;
        }

        .order-title {
          font-size: 24px;
          font-weight: 700;
          color: #000;
          margin-bottom: 10px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .order-subtitle {
          font-size: 14px;
          color: #666;
          text-align: center;
          margin-bottom: 30px;
        }

        .order-details {
          background-color: #f8f8f8;
          padding: 20px;
          margin-bottom: 30px;
          border-left: 4px solid #ff0000;
        }

        .order-details h3 {
          font-size: 16px;
          font-weight: 700;
          color: #000;
          margin-bottom: 15px;
          text-transform: uppercase;
        }

        .order-details p {
          margin: 5px 0;
          font-size: 14px;
          color: #333;
        }

        .product-section {
          display: flex;
          margin-bottom: 30px;
          padding: 20px;
          border: 2px solid #ff0000;
          background-color: #fff;
        }

        .product-image {
          width: 120px;
          height: 120px;
          object-fit: cover;
          margin-right: 20px;
          border: 1px solid #ddd;
        }

        .product-info {
          flex: 1;
        }

        .product-info h4 {
          font-size: 18px;
          font-weight: 700;
          color: #000;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .product-info p {
          margin: 5px 0;
          font-size: 14px;
          color: #333;
        }

        .product-info .price {
          font-size: 18px;
          font-weight: 700;
          color: #ff0000;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          border: 2px solid #ff0000;
        }

        .pricing-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #ddd;
          font-size: 14px;
        }

        .pricing-table .label {
          text-align: left;
          color: #333;
          font-weight: 600;
          text-transform: uppercase;
        }

        .pricing-table .value {
          text-align: right;
          font-weight: 700;
          color: #000;
        }

        .total-row {
          background-color: #ff0000;
          color: white !important;
          font-size: 16px;
          font-weight: 700;
        }

        .total-row td {
          color: white !important;
          border-bottom: none !important;
        }

        .address-section {
          background-color: #f8f8f8;
          padding: 20px;
          margin: 30px 0;
          border-left: 4px solid #ff0000;
        }

        .address-section h4 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #000;
          text-transform: uppercase;
        }

        .address-section p {
          margin: 3px 0;
          font-size: 14px;
          color: #333;
        }

        .payment-info {
          background-color: #f8f8f8;
          padding: 20px;
          margin: 30px 0;
          border-left: 4px solid #ff0000;
        }

        .payment-info h4 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #000;
          text-transform: uppercase;
        }

        .payment-info p {
          margin: 3px 0;
          font-size: 14px;
          color: #333;
        }

        .footer {
          text-align: center;
          padding: 30px;
          background-color: #ff0000;
          color: #fff;
        }

        .footer p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .supreme-note {
          background-color: #000;
          color: #fff;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      `}</style>

      <div className="email-container">
        <div className="header">
          <div className="logo">SUPREME</div>
        </div>
        
        <div className="content">
          <h1 className="order-title">Order Confirmed</h1>
          <p className="order-subtitle">Thank you for your Supreme order</p>
          
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

          <div className="supreme-note">
            <p>Thank you for supporting Supreme</p>
          </div>
        </div>

        <div className="footer">
          <p>© 2024 Supreme New York. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default SupremeReceiptPage;