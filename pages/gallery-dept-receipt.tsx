import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface GalleryDeptReceiptProps {
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
}

const defaultProps: GalleryDeptReceiptProps = {
  ORDER_NUMBER: "GD123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "/gallery_dept/gallery_dept_files/product-image.jpg",
  PRODUCT_NAME: "Gallery Dept. T-Shirt",
  PRODUCT_SIZE: "M",
  PRODUCT_PRICE: "$75.00",
  SHIPPING_COST: "$10.00",
  TAX_AMOUNT: "$6.25",
  TOTAL_AMOUNT: "$91.25",
  TRACKING_NUMBER: "1Z999AA1234567890",
  ESTIMATED_DELIVERY: "December 5, 2024",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Main Street",
  SHIPPING_ADDRESS_3: "New York, NY 10001",
  SHIPPING_ADDRESS_4: "United States"
};

const GalleryDeptReceiptPage: React.FC = () => {
  const [receiptData, setReceiptData] = useState<GalleryDeptReceiptProps>(defaultProps);

  useEffect(() => {
    const storedData = localStorage.getItem('galleryDeptReceiptData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setReceiptData(parsedData);
      } catch (error) {
        console.error('Error parsing Gallery Dept receipt data:', error);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Gallery Dept - Order Confirmation</title>
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
          background-color: #f0f0f0;
          color: #333;
          line-height: 1.6;
        }

        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .header {
          background: linear-gradient(135deg, #000 0%, #333 100%);
          padding: 40px;
          text-align: center;
        }

        .header img {
          max-width: 180px;
          height: auto;
          filter: brightness(0) invert(1);
        }

        .content {
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

        .order-details {
          background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          padding: 25px;
          margin-bottom: 30px;
          border-radius: 8px;
          border-left: 5px solid #000;
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
          background: linear-gradient(135deg, #fff 0%, #f5f5f5 100%);
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .product-image {
          width: 140px;
          height: 140px;
          object-fit: cover;
          margin-right: 25px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
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
          font-size: 18px;
          font-weight: 700;
          color: #000;
        }

        .pricing-breakdown {
          width: 100%;
          border-collapse: collapse;
          margin: 25px 0;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .pricing-breakdown td {
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        .pricing-breakdown .label {
          text-align: left;
          color: #666;
          font-weight: 500;
        }

        .pricing-breakdown .value {
          text-align: right;
          font-weight: 600;
          color: #333;
        }

        .total-row {
          background: linear-gradient(135deg, #000 0%, #333 100%);
          color: white !important;
          font-size: 16px;
          font-weight: 700;
        }

        .total-row td {
          color: white !important;
          border-bottom: none !important;
        }

        .shipping-info {
          background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
          padding: 25px;
          margin: 30px 0;
          border-radius: 8px;
          border-left: 5px solid #000;
        }

        .shipping-info h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #000;
          text-transform: uppercase;
        }

        .shipping-info p {
          margin: 8px 0;
          font-size: 14px;
          color: #444;
        }

        .address-section {
          background: linear-gradient(135deg, #fff 0%, #f5f5f5 100%);
          padding: 25px;
          margin: 30px 0;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .address-section h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #000;
          text-transform: uppercase;
        }

        .address-section p {
          margin: 5px 0;
          font-size: 14px;
          color: #444;
        }

        .footer {
          text-align: center;
          padding: 30px;
          background: linear-gradient(135deg, #000 0%, #333 100%);
          color: #ccc;
        }

        .footer p {
          margin: 0;
          font-size: 12px;
        }
      `}</style>

      <div className="email-container">
        <div className="header">
          <img src="/gallery_dept/gallery_dept_files/gallery-dept-logo.png" alt="Gallery Dept" />
        </div>
        
        <div className="content">
          <h1 className="order-title">Order Confirmed</h1>
          <p className="order-subtitle">Your Gallery Dept order is being prepared</p>
          
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

          <table className="pricing-breakdown">
            <tbody>
              <tr>
                <td className="label">Item Price:</td>
                <td className="value">{receiptData.PRODUCT_PRICE}</td>
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

          <div className="shipping-info">
            <h4>Shipping Information</h4>
            <p><strong>Tracking Number:</strong> {receiptData.TRACKING_NUMBER}</p>
            <p><strong>Estimated Delivery:</strong> {receiptData.ESTIMATED_DELIVERY}</p>
          </div>

          <div className="address-section">
            <h4>Shipping Address</h4>
            <p>{receiptData.SHIPPING_ADDRESS_1}</p>
            <p>{receiptData.SHIPPING_ADDRESS_2}</p>
            <p>{receiptData.SHIPPING_ADDRESS_3}</p>
            <p>{receiptData.SHIPPING_ADDRESS_4}</p>
          </div>
        </div>

        <div className="footer">
          <p>© 2024 Gallery Dept. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default GalleryDeptReceiptPage;