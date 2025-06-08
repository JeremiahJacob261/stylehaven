import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface TrapstarReceiptProps {
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

const defaultProps: TrapstarReceiptProps = {
  ORDER_NUMBER: "TS123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "/trapstar/trapstar_files/product-image.jpg",
  PRODUCT_NAME: "Trapstar Hoodie",
  PRODUCT_SIZE: "Large",
  PRODUCT_COLOR: "Black",
  PRODUCT_PRICE: "£120.00",
  QUANTITY: "1",
  SUBTOTAL: "£120.00",
  SHIPPING_COST: "£5.00",
  TAX_AMOUNT: "£20.00",
  TOTAL_AMOUNT: "£125.00",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Main Street",
  SHIPPING_ADDRESS_3: "London W1K 5AB",
  SHIPPING_ADDRESS_4: "United Kingdom",
  PAYMENT_METHOD: "Visa",
  CARD_ENDING: "1234"
};

const TrapstarReceiptPage: React.FC = () => {
  const [receiptData, setReceiptData] = useState<TrapstarReceiptProps>(defaultProps);

  useEffect(() => {
    const storedData = localStorage.getItem('trapstarReceiptData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setReceiptData(parsedData);
      } catch (error) {
        console.error('Error parsing Trapstar receipt data:', error);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Trapstar - Order Confirmation</title>
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
          background-color: #000;
          color: #fff;
          line-height: 1.4;
        }

        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #000;
          border: 2px solid #ff0000;
        }

        .header {
          background: linear-gradient(45deg, #000, #333);
          padding: 40px;
          text-align: center;
          border-bottom: 3px solid #ff0000;
        }

        .header .logo {
          color: #fff;
          font-size: 42px;
          font-weight: 900;
          letter-spacing: 6px;
          text-transform: uppercase;
          text-shadow: 2px 2px 4px rgba(255, 0, 0, 0.5);
        }

        .content {
          padding: 40px;
          background-color: #111;
        }

        .order-title {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 3px;
        }

        .order-subtitle {
          font-size: 16px;
          color: #ccc;
          text-align: center;
          margin-bottom: 30px;
          font-style: italic;
        }

        .order-details {
          background: linear-gradient(135deg, #222, #111);
          padding: 25px;
          margin-bottom: 30px;
          border-left: 5px solid #ff0000;
          border-radius: 5px;
        }

        .order-details h3 {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .order-details p {
          margin: 8px 0;
          font-size: 14px;
          color: #ccc;
        }

        .product-section {
          display: flex;
          margin-bottom: 30px;
          padding: 25px;
          background: linear-gradient(135deg, #222, #111);
          border: 2px solid #ff0000;
          border-radius: 8px;
        }

        .product-image {
          width: 140px;
          height: 140px;
          object-fit: cover;
          margin-right: 25px;
          border: 2px solid #ff0000;
          border-radius: 5px;
        }

        .product-info {
          flex: 1;
        }

        .product-info h4 {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .product-info p {
          margin: 8px 0;
          font-size: 14px;
          color: #ccc;
        }

        .product-info .price {
          font-size: 20px;
          font-weight: 700;
          color: #ff0000;
          margin-top: 15px;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 25px 0;
          background-color: #222;
          border: 2px solid #ff0000;
          border-radius: 8px;
          overflow: hidden;
        }

        .pricing-table td {
          padding: 15px 20px;
          border-bottom: 1px solid #333;
          font-size: 14px;
        }

        .pricing-table .label {
          text-align: left;
          color: #ccc;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .pricing-table .value {
          text-align: right;
          font-weight: 700;
          color: #fff;
        }

        .total-row {
          background: linear-gradient(135deg, #ff0000, #cc0000);
          color: white !important;
          font-size: 16px;
          font-weight: 700;
        }

        .total-row td {
          color: white !important;
          border-bottom: none !important;
        }

        .address-section {
          background: linear-gradient(135deg, #222, #111);
          padding: 25px;
          margin: 30px 0;
          border-left: 5px solid #ff0000;
          border-radius: 5px;
        }

        .address-section h4 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .address-section p {
          margin: 5px 0;
          font-size: 14px;
          color: #ccc;
        }

        .payment-info {
          background: linear-gradient(135deg, #222, #111);
          padding: 25px;
          margin: 30px 0;
          border-left: 5px solid #ff0000;
          border-radius: 5px;
        }

        .payment-info h4 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .payment-info p {
          margin: 5px 0;
          font-size: 14px;
          color: #ccc;
        }

        .footer {
          text-align: center;
          padding: 30px;
          background: linear-gradient(45deg, #000, #333);
          border-top: 3px solid #ff0000;
          color: #fff;
        }

        .footer p {
          margin: 0;
          font-size: 12px;
          opacity: 0.8;
        }

        .trapstar-note {
          background: linear-gradient(135deg, #ff0000, #cc0000);
          color: #fff;
          padding: 25px;
          margin: 25px 0;
          text-align: center;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          border-radius: 5px;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
        }
      `}</style>

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
    </>
  );
};

export default TrapstarReceiptPage;