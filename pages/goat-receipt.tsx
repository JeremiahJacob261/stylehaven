import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface GoatReceiptProps {
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

const defaultProps: GoatReceiptProps = {
  ORDER_NUMBER: "GOAT123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "/goat/goat_files/product-image.jpg",
  PRODUCT_NAME: "Air Jordan 1 Mid SE 'Elephant Toe'",
  PRODUCT_SIZE: "US 10",
  PRODUCT_PRICE: "$150.00",
  SHIPPING_COST: "$13.95",
  TAX_AMOUNT: "$11.23",
  TOTAL_AMOUNT: "$175.18",
  TRACKING_NUMBER: "1Z999AA1234567890",
  ESTIMATED_DELIVERY: "December 5, 2024",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Main Street",
  SHIPPING_ADDRESS_3: "New York, NY 10001",
  SHIPPING_ADDRESS_4: "United States"
};

const GoatReceiptPage: React.FC = () => {
  const [receiptData, setReceiptData] = useState<GoatReceiptProps>(defaultProps);

  useEffect(() => {
    const storedData = localStorage.getItem('goatReceiptData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setReceiptData(parsedData);
      } catch (error) {
        console.error('Error parsing GOAT receipt data:', error);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>GOAT - Order Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div style={{display: 'none', fontSize: '0px', color: '#000000', lineHeight: '1px', maxHeight: '0px', maxWidth: '0px', overflow: 'hidden'}}>
        You ordered the {receiptData.PRODUCT_NAME}
      </div>
      
      <table width="100%" align="center" border={0} cellPadding={0} cellSpacing={0} style={{maxWidth: '600px', border: '1px solid #000000'}}>
        <tbody>
          <tr>
            <td align="center" width="100%">
              <table align="center" width="100%" border={0} cellPadding={0} cellSpacing={0} bgcolor="#ffffff">
                <tbody>
                  <tr>
                    <td width="100%" style={{padding: '10px 0px'}}></td>
                  </tr>
                  <tr>
                    <td align="center" width="100%">
                      <table align="center" border={0} cellPadding={0} cellSpacing={0} width="100%">
                        <tbody>
                          <tr>
                            <td align="left" width="50%" style={{paddingLeft: '40px', fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '3px', fontSize: '50px'}}>
                              <img src="/goat/goat_files/GOATLogo2022.png" width="120" height="27" border={0} style={{maxWidth: '120px', color: '#000000', display: 'block'}} alt="GOAT" />
                            </td>
                            <td align="right" width="50%" style={{paddingRight: '40px'}}>
                              <a href="#" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', letterSpacing: '2.3px', fontSize: '10px', lineHeight: '24px', fontWeight: '500', textTransform: 'uppercase', textDecoration: 'underline', color: '#000000'}}>
                                shop
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style={{padding: '40px'}}>
                      <h1 style={{fontSize: '28px', fontWeight: '300', color: '#000', textAlign: 'center', marginBottom: '20px'}}>
                        Order Confirmed
                      </h1>
                      
                      <div style={{backgroundColor: '#f5f5f5', padding: '20px', marginBottom: '30px'}}>
                        <p style={{margin: '0', fontSize: '16px'}}><strong>Order #{receiptData.ORDER_NUMBER}</strong></p>
                        <p style={{margin: '5px 0 0 0', fontSize: '14px', color: '#666'}}>Placed on {receiptData.ORDER_DATE}</p>
                      </div>
                      
                      <div style={{display: 'flex', marginBottom: '30px', border: '1px solid #eee', padding: '20px'}}>
                        <img src={receiptData.PRODUCT_IMAGE} alt={receiptData.PRODUCT_NAME} style={{width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px'}} />
                        <div style={{flex: '1'}}>
                          <h3 style={{fontSize: '18px', fontWeight: '500', marginBottom: '10px'}}>{receiptData.PRODUCT_NAME}</h3>
                          <p style={{margin: '5px 0', fontSize: '14px', color: '#666'}}>Size: {receiptData.PRODUCT_SIZE}</p>
                          <p style={{margin: '5px 0', fontSize: '16px', fontWeight: '500'}}>{receiptData.PRODUCT_PRICE}</p>
                        </div>
                      </div>
                      
                      <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '30px'}}>
                        <tr>
                          <td style={{padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px'}}>Subtotal</td>
                          <td style={{padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px', textAlign: 'right'}}>{receiptData.PRODUCT_PRICE}</td>
                        </tr>
                        <tr>
                          <td style={{padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px'}}>Shipping</td>
                          <td style={{padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px', textAlign: 'right'}}>{receiptData.SHIPPING_COST}</td>
                        </tr>
                        <tr>
                          <td style={{padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px'}}>Tax</td>
                          <td style={{padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px', textAlign: 'right'}}>{receiptData.TAX_AMOUNT}</td>
                        </tr>
                        <tr>
                          <td style={{padding: '12px 0', borderTop: '2px solid #000', fontSize: '16px', fontWeight: '600'}}>Total</td>
                          <td style={{padding: '12px 0', borderTop: '2px solid #000', fontSize: '16px', fontWeight: '600', textAlign: 'right'}}>{receiptData.TOTAL_AMOUNT}</td>
                        </tr>
                      </table>
                      
                      <div style={{backgroundColor: '#f8f8f8', padding: '20px', marginBottom: '20px'}}>
                        <h4 style={{fontSize: '16px', fontWeight: '500', marginBottom: '10px'}}>Shipping Information</h4>
                        <p style={{margin: '3px 0', fontSize: '14px'}}>{receiptData.SHIPPING_ADDRESS_1}</p>
                        <p style={{margin: '3px 0', fontSize: '14px'}}>{receiptData.SHIPPING_ADDRESS_2}</p>
                        <p style={{margin: '3px 0', fontSize: '14px'}}>{receiptData.SHIPPING_ADDRESS_3}</p>
                        <p style={{margin: '3px 0', fontSize: '14px'}}>{receiptData.SHIPPING_ADDRESS_4}</p>
                        <p style={{margin: '10px 0 0 0', fontSize: '14px'}}><strong>Tracking:</strong> {receiptData.TRACKING_NUMBER}</p>
                        <p style={{margin: '3px 0', fontSize: '14px'}}><strong>Est. Delivery:</strong> {receiptData.ESTIMATED_DELIVERY}</p>
                      </div>
                      
                      <div style={{textAlign: 'center', padding: '20px', backgroundColor: '#000', color: '#fff'}}>
                        <p style={{margin: '0', fontSize: '14px'}}>Thank you for shopping with GOAT!</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GoatReceiptPage;