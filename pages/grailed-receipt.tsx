import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface GrailedReceiptProps {
  ORDER_ID: string;
  ORDER_DATE: string;
  CUSTOMER_NAME: string;
  CUSTOMER_EMAIL: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  BRAND: string;
  SIZE: string;
  SOLD_PRICE: string;
  TAX_AMOUNT: string;
  TOTAL_AMOUNT: string;
  SHIPPING_NAME: string;
  SHIPPING_ADDRESS: string;
  SHIPPING_CITY: string;
  SHIPPING_COUNTRY: string;
  SELLER_LOCATION: string;
  SELLER_NAME: string;
}

const defaultProps: GrailedReceiptProps = {
  ORDER_ID: "GR123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "/grailed/grailed_files/product-image.jpg",
  PRODUCT_NAME: "Vintage Nike Sneakers",
  BRAND: "NIKE",
  SIZE: "US 10",
  SOLD_PRICE: "€1000.00",
  TAX_AMOUNT: "€10.00",
  TOTAL_AMOUNT: "€1010.00",
  SHIPPING_NAME: "John Doe",
  SHIPPING_ADDRESS: "123 Main Street",
  SHIPPING_CITY: "London",
  SHIPPING_COUNTRY: "United Kingdom",
  SELLER_LOCATION: "New York",
  SELLER_NAME: "Seller123"
};

const GrailedReceiptPage: React.FC = () => {
  const [receiptData, setReceiptData] = useState<GrailedReceiptProps>(defaultProps);

  useEffect(() => {
    const storedData = localStorage.getItem('grailedReceiptData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setReceiptData(parsedData);
      } catch (error) {
        console.error('Error parsing Grailed receipt data:', error);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Grailed - Purchase Confirmation</title>
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
          background-color: #f5f5f5;
          color: #333;
          line-height: 1.6;
        }

        .email-container {
          max-width: 650px;
          margin: 0 auto;
          background-color: #ffffff;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .header {
          background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
          padding: 40px;
          text-align: center;
        }

        .header img {
          max-width: 160px;
          height: auto;
          filter: brightness(0) invert(1);
        }

        .content {
          padding: 40px;
        }

        .purchase-title {
          font-size: 32px;
          font-weight: 700;
          color: #000;
          margin-bottom: 10px;
          text-align: center;
        }

        .purchase-subtitle {
          font-size: 16px;
          color: #666;
          text-align: center;
          margin-bottom: 30px;
        }

        .order-summary {
          background: linear-gradient(135deg, #f8f9ff 0%, #e6e9ff 100%);
          padding: 25px;
          margin-bottom: 30px;
          border-radius: 12px;
          border-left: 5px solid #6b73ff;
        }

        .order-summary h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .order-summary p {
          margin: 8px 0;
          font-size: 14px;
          color: #444;
        }

        .item-showcase {
          display: flex;
          margin-bottom: 30px;
          padding: 25px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          border: 1px solid #eee;
        }

        .item-image {
          width: 150px;
          height: 150px;
          object-fit: cover;
          margin-right: 25px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .item-details {
          flex: 1;
        }

        .item-details h4 {
          font-size: 22px;
          font-weight: 600;
          color: #000;
          margin-bottom: 8px;
        }

        .item-details .brand {
          font-size: 16px;
          color: #6b73ff;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .item-details .size {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
        }

        .item-details .price {
          font-size: 24px;
          font-weight: 700;
          color: #000;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
          margin: 25px 0;
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .pricing-table td {
          padding: 18px 25px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 15px;
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
          background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
          color: white !important;
          font-size: 18px;
          font-weight: 700;
        }

        .total-row td {
          color: white !important;
          border-bottom: none !important;
        }

        .info-section {
          display: flex;
          justify-content: space-between;
          margin: 30px 0;
          gap: 20px;
        }

        .info-block {
          flex: 1;
          background: linear-gradient(135deg, #f8f9ff 0%, #e6e9ff 100%);
          padding: 25px;
          border-radius: 12px;
          border-left: 4px solid #6b73ff;
        }

        .info-block h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #000;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .info-block p {
          margin: 5px 0;
          font-size: 14px;
          color: #444;
        }

        .seller-info {
          background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
          padding: 20px;
          margin: 30px 0;
          border-radius: 12px;
          border-left: 4px solid #fdcb6e;
        }

        .seller-info h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #000;
        }

        .seller-info p {
          margin: 5px 0;
          font-size: 14px;
          color: #444;
        }

        .footer {
          text-align: center;
          padding: 30px;
          background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
          color: #fff;
        }

        .footer p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .grailed-note {
          background: #f8f9fa;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          border-left: 4px solid #6b73ff;
          font-style: italic;
          color: #666;
          text-align: center;
        }
      `}</style>

      <div className="email-container">
        <div className="header">
          <img src="/grailed/grailed_files/logo-no-whitespace.jpg" alt="Grailed" />
        </div>
        
        <div className="content">
          <h1 className="purchase-title">Purchase Confirmed!</h1>
          <p className="purchase-subtitle">Your Grailed order has been processed successfully</p>
          
          <div className="order-summary">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {receiptData.ORDER_ID}</p>
            <p><strong>Order Date:</strong> {receiptData.ORDER_DATE}</p>
            <p><strong>Buyer:</strong> {receiptData.CUSTOMER_NAME}</p>
            <p><strong>Email:</strong> {receiptData.CUSTOMER_EMAIL}</p>
          </div>

          <div className="item-showcase">
            <img src={receiptData.PRODUCT_IMAGE} alt={receiptData.PRODUCT_NAME} className="item-image" />
            <div className="item-details">
              <h4>{receiptData.PRODUCT_NAME}</h4>
              <p className="brand">{receiptData.BRAND}</p>
              <p className="size"><strong>Size:</strong> {receiptData.SIZE}</p>
              <p className="price">{receiptData.SOLD_PRICE}</p>
            </div>
          </div>

          <table className="pricing-table">
            <tbody>
              <tr>
                <td className="label">Item Price:</td>
                <td className="value">{receiptData.SOLD_PRICE}</td>
              </tr>
              <tr>
                <td className="label">Tax:</td>
                <td className="value">{receiptData.TAX_AMOUNT}</td>
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
            <p><strong>Location:</strong> {receiptData.SELLER_LOCATION}</p>
          </div>

          <div className="info-section">
            <div className="info-block">
              <h4>Shipping Address</h4>
              <p>{receiptData.SHIPPING_NAME}</p>
              <p>{receiptData.SHIPPING_ADDRESS}</p>
              <p>{receiptData.SHIPPING_CITY}</p>
              <p>{receiptData.SHIPPING_COUNTRY}</p>
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
    </>
  );
};

export default GrailedReceiptPage;