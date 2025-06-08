import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface LVReceiptProps {
  FIRSTNAME: string;
  ORDER_NUMBER: string;
  ORDER_DATE: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  REFERENCE: string;
  PRODUCT_PRICE: string;
  CURRENCY: string;
  PHONE_NUMBER: string;
  SHIPPING_ADDRESS1: string;
  SHIPPING_ADDRESS2: string;
  SHIPPING_ADDRESS3: string;
  SHIPPING_ADDRESS4: string;
  BILLING_ADDRESS1: string;
  BILLING_ADDRESS2: string;
  BILLING_ADDRESS3: string;
  BILLING_ADDRESS4: string;
  COUNTRY: string;
}

const defaultProps: LVReceiptProps = {
  FIRSTNAME: "John",
  ORDER_NUMBER: "LV123456789",
  ORDER_DATE: "December 1, 2024",
  PRODUCT_IMAGE: "/lv/lv_files/PRODUCT_IMAGE",
  PRODUCT_NAME: "Neverfull MM Monogram Canvas",
  REFERENCE: "M40156",
  PRODUCT_PRICE: "€1,350.00",
  CURRENCY: "€",
  PHONE_NUMBER: "+44 20 1234 5678",
  SHIPPING_ADDRESS1: "John Doe",
  SHIPPING_ADDRESS2: "123 Luxury Avenue",
  SHIPPING_ADDRESS3: "London W1K 5AB",
  SHIPPING_ADDRESS4: "United Kingdom",
  BILLING_ADDRESS1: "John Doe",
  BILLING_ADDRESS2: "123 Luxury Avenue",
  BILLING_ADDRESS3: "London W1K 5AB",
  BILLING_ADDRESS4: "United Kingdom",
  COUNTRY: "uk"
};

const LVReceiptPage: React.FC = () => {
  const [receiptData, setReceiptData] = useState<LVReceiptProps>(defaultProps);

  useEffect(() => {
    const storedData = localStorage.getItem('lvReceiptData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setReceiptData(parsedData);
      } catch (error) {
        console.error('Error parsing LV receipt data:', error);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Louis Vuitton - Order Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Georgia', 'Times New Roman', serif;
          background-color: #faf9f7;
          color: #2c2c2c;
          line-height: 1.6;
        }

        .email-container {
          max-width: 700px;
          margin: 0 auto;
          background-color: #ffffff;
          box-shadow: 0 0 30px rgba(0,0,0,0.15);
        }

        .header {
          background: linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #8b4513 100%);
          padding: 50px 40px;
          text-align: center;
          position: relative;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          opacity: 0.1;
        }

        .header img {
          max-width: 200px;
          height: auto;
          filter: brightness(0) invert(1);
          position: relative;
          z-index: 1;
        }

        .content {
          padding: 50px;
        }

        .greeting {
          font-size: 28px;
          font-weight: 400;
          color: #8b4513;
          margin-bottom: 15px;
          text-align: center;
          font-style: italic;
        }

        .order-confirmation {
          font-size: 18px;
          color: #666;
          text-align: center;
          margin-bottom: 40px;
          font-style: italic;
        }

        .order-details {
          background: linear-gradient(135deg, #f8f6f3 0%, #f0ede8 100%);
          padding: 30px;
          margin-bottom: 40px;
          border-radius: 8px;
          border: 2px solid #d4af37;
          position: relative;
        }

        .order-details::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, #d4af37, #ffd700, #d4af37);
          border-radius: 8px;
          z-index: -1;
        }

        .order-details h3 {
          font-size: 20px;
          font-weight: 600;
          color: #8b4513;
          margin-bottom: 20px;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .order-details p {
          margin: 10px 0;
          font-size: 15px;
          color: #444;
        }

        .product-presentation {
          display: flex;
          margin-bottom: 40px;
          padding: 30px;
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border-radius: 8px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border: 1px solid #e0e0e0;
        }

        .product-image {
          width: 180px;
          height: 180px;
          object-fit: cover;
          margin-right: 30px;
          border-radius: 8px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          border: 2px solid #d4af37;
        }

        .product-details {
          flex: 1;
        }

        .product-details h4 {
          font-size: 24px;
          font-weight: 600;
          color: #8b4513;
          margin-bottom: 12px;
          font-family: 'Georgia', serif;
        }

        .product-details .reference {
          font-size: 14px;
          color: #888;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .product-details .price {
          font-size: 28px;
          font-weight: 700;
          color: #8b4513;
          font-family: 'Georgia', serif;
        }

        .luxury-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 40px 0;
        }

        .addresses-section {
          display: flex;
          justify-content: space-between;
          margin: 40px 0;
          gap: 25px;
        }

        .address-block {
          flex: 1;
          background: linear-gradient(135deg, #f8f6f3 0%, #f0ede8 100%);
          padding: 25px;
          border-radius: 8px;
          border-left: 4px solid #d4af37;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .address-block h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #8b4513;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .address-block p {
          margin: 8px 0;
          font-size: 14px;
          color: #444;
          line-height: 1.5;
        }

        .contact-info {
          background: linear-gradient(135deg, #e8f4f8 0%, #d1ecf1 100%);
          padding: 25px;
          margin: 30px 0;
          border-radius: 8px;
          border-left: 4px solid #5bc0de;
          text-align: center;
        }

        .contact-info h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #8b4513;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .contact-info p {
          margin: 5px 0;
          font-size: 14px;
          color: #444;
        }

        .footer {
          text-align: center;
          padding: 40px;
          background: linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #8b4513 100%);
          color: #fff;
          position: relative;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          opacity: 0.1;
        }

        .footer p {
          margin: 0;
          font-size: 12px;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }

        .lv-signature {
          background: #f8f6f3;
          padding: 25px;
          margin: 30px 0;
          border-radius: 8px;
          text-align: center;
          border: 2px solid #d4af37;
          font-style: italic;
          color: #8b4513;
        }

        .price-display {
          background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%);
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          border: 2px solid #d4af37;
          text-align: center;
        }

        .price-display .currency {
          font-size: 18px;
          color: #8b4513;
          font-weight: 600;
        }
      `}</style>

      <div className="email-container">
        <div className="header">
          <img src="/lv/lv_files/lv_logo.png" alt="Louis Vuitton" />
        </div>
        
        <div className="content">
          <h1 className="greeting">Dear {receiptData.FIRSTNAME},</h1>
          <p className="order-confirmation">Thank you for your Louis Vuitton order</p>
          
          <div className="order-details">
            <h3>Order Confirmation</h3>
            <p><strong>Order Number:</strong> {receiptData.ORDER_NUMBER}</p>
            <p><strong>Order Date:</strong> {receiptData.ORDER_DATE}</p>
            <p><strong>Country:</strong> {receiptData.COUNTRY.toUpperCase()}</p>
          </div>

          <div className="product-presentation">
            <img src={receiptData.PRODUCT_IMAGE} alt={receiptData.PRODUCT_NAME} className="product-image" />
            <div className="product-details">
              <h4>{receiptData.PRODUCT_NAME}</h4>
              <p className="reference">Ref: {receiptData.REFERENCE}</p>
              <div className="price-display">
                <p className="price">{receiptData.PRODUCT_PRICE}</p>
                <p className="currency">Currency: {receiptData.CURRENCY}</p>
              </div>
            </div>
          </div>

          <div className="luxury-divider"></div>

          <div className="contact-info">
            <h4>Contact Information</h4>
            <p><strong>Phone:</strong> {receiptData.PHONE_NUMBER}</p>
          </div>

          <div className="addresses-section">
            <div className="address-block">
              <h4>Shipping Address</h4>
              <p>{receiptData.SHIPPING_ADDRESS1}</p>
              <p>{receiptData.SHIPPING_ADDRESS2}</p>
              <p>{receiptData.SHIPPING_ADDRESS3}</p>
              <p>{receiptData.SHIPPING_ADDRESS4}</p>
            </div>
            
            <div className="address-block">
              <h4>Billing Address</h4>
              <p>{receiptData.BILLING_ADDRESS1}</p>
              <p>{receiptData.BILLING_ADDRESS2}</p>
              <p>{receiptData.BILLING_ADDRESS3}</p>
              <p>{receiptData.BILLING_ADDRESS4}</p>
            </div>
          </div>

          <div className="lv-signature">
            <p>Your Louis Vuitton purchase represents our commitment to exceptional craftsmanship and timeless elegance.</p>
          </div>
        </div>

        <div className="footer">
          <p>© 2024 Louis Vuitton Malletier. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default LVReceiptPage;