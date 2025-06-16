"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getReceiptData } from '@/lib/receipt-data';

interface BalenciagaReceiptProps {
  FIRSTNAME: string;
  ORDER_NUMBER: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  PRODUCT_PRICE: string;
  PRODUCT_COLOUR: string;
  ADDRESS1: string;
  ADDRESS2: string;
  ADDRESS3: string;
  ADDRESS4: string;
  BILLING1: string;
  BILLING2: string;
  BILLING3: string;
  BILLING4: string;
}

const defaultProps: BalenciagaReceiptProps = {
  FIRSTNAME: "John",
  ORDER_NUMBER: "BAL123456789",
  PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/balenciaga/balenciaga_files/product-image.jpg",
  PRODUCT_NAME: "Triple S Sneakers",
  PRODUCT_PRICE: "€ 1,050",
  PRODUCT_COLOUR: "White/Black",
  ADDRESS1: "John Smith",
  ADDRESS2: "123 Fashion Street",
  ADDRESS3: "London W1K 5AB",
  ADDRESS4: "United Kingdom",
  BILLING1: "John Smith",
  BILLING2: "123 Fashion Street", 
  BILLING3: "London W1K 5AB",
  BILLING4: "United Kingdom"
};

interface BalenciagaReceiptPageProps {
  receiptData?: BalenciagaReceiptProps;
  receiptId?: string;
}

const BalenciagaReceiptPage: React.FC<BalenciagaReceiptPageProps> = ({ 
  receiptData: serverReceiptData, 
  receiptId 
}) => {
  const [receiptData, setReceiptData] = useState<BalenciagaReceiptProps>(
    serverReceiptData || defaultProps
  );


  useEffect(() => {
    // Fallback to localStorage if no server data and no receiptId
    if (!serverReceiptData && !receiptId) {
      const storedData = localStorage.getItem('balenciagaReceiptData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setReceiptData(parsedData);
        } catch (error) {
          console.error('Error parsing receipt data:', error);
        }
      }
    }
  }, [serverReceiptData, receiptId]);


  return (
    <>
      <Head>
        <title>{`Balenciaga - Order ${receiptData.ORDER_NUMBER}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div style={{ margin: 0, padding: 0, fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <div dir="ltr">
          <img src="./balenciaga/balenciaga_files/open.aspx" width="1" height="1" alt="" style={{ display: 'none' }} />
          <span style={{ display: 'none !important', opacity: 0, color: 'transparent', height: 0, width: 0, fontSize: '1px', lineHeight: 0, overflow: 'hidden' }}></span>
          
          <table style={{ minWidth: '601px' }} border={0} cellPadding="0" cellSpacing="0" align="center" width="100%" bgcolor="#ffffff">
            <tbody>
              <tr>
                <td style={{ minWidth: '601px' }} border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                  <table border={0} cellPadding="0" cellSpacing="0" align="center">
                    <tbody>
                      <tr>
                        <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                          <img style={{ margin: '0px', padding: '0px', display: 'block', height: '45px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="45" border={0} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <table style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000' }} border={0} cellPadding="0" cellSpacing="0" align="center">
                    <tbody>
                      <tr>
                        <td align="center">
                          <table style={{ borderTop: '1px solid #000' }} border={0} cellPadding="0" cellSpacing="0" align="center">
                            <tbody>
                              <tr>
                                <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                  <img style={{ margin: '0px', padding: '0px', display: 'block', height: '14px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="14" border={0} />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          {/* Balenciaga Logo */}
                          <table border={0} cellPadding="0" cellSpacing="0" align="center">
                            <tbody>
                              <tr>
                                <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }} align="center">
                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center" bgcolor="#ffffff">
                                    <tbody>
                                      <tr>
                                        <td style={{ padding: '0px', verticalAlign: 'top', width: '598px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', lineHeight: '18px', color: '#000000' }} align="center">
                                          <a href="#" target="_blank">
                                            <img style={{ fontSize: 0, margin: '0px', padding: '0px', display: 'block' }} src="./balenciaga/balenciaga_files/73c19a3b-e950-4a7b-92a3-3b6c9767e6c7.png" width="137" height="16" border={0} />
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          <table style={{ borderBottom: '1px solid #000' }} border={0} cellPadding="0" cellSpacing="0" align="center">
                            <tbody>
                              <tr>
                                <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                  <img style={{ margin: '0px', padding: '0px', display: 'block', height: '14px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="14" border={0} />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          {/* Main Content */}
                          <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center">
                            <tbody>
                              <tr>
                                <td align="center">
                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                    <tbody>
                                      <tr>
                                        <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                          <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                            <tbody>
                                              <tr>
                                                <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '440px' }}>
                                                  
                                                  {/* Spacer */}
                                                  <table border={0} cellPadding="0" cellSpacing="0" align="center">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                                          <img style={{ margin: '0px', padding: '0px', display: 'block', height: '80px' }} src="https://stylehaven-five.vercel.app/balenciaga/balenciaga_files/73c19a3b-e950-4a7b-92a3-3b6c9767e6c7.png" width="250" height="80" border={0} />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  {/* Welcome Message */}
                                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', width: '440px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', verticalAlign: 'top' }} align="center">
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginTop: '10px', marginBottom: '10px' }}>
                                                            <strong>ORDER REGISTRATION</strong>
                                                            <br />
                                                            <br />
                                                            Dear {receiptData.FIRSTNAME}, <br />
                                                            Thank you for your order with Balenciaga.
                                                          </p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  <table border={0} cellPadding="0" cellSpacing="0" align="center">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                                          <img style={{ margin: '0px', padding: '0px', display: 'block', height: '80px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="80" border={0} />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  
                                  {/* Order Confirmation Section */}
                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0, borderTop: '1px solid #000' }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                    <tbody>
                                      <tr>
                                        <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                          <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                            <tbody>
                                              <tr>
                                                <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '440px' }}>
                                                  <table border={0} cellPadding="0" cellSpacing="0" align="center">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                                          <img style={{ margin: '0px', padding: '0px', display: 'block', height: '40px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="40" border={0} />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="left" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', width: '440px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', verticalAlign: 'top' }} align="center">
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginTop: '10px', marginBottom: '10px' }}>
                                                            We are pleased to confirm that your order {receiptData.ORDER_NUMBER} has been registered and will be processed accordingly. <br />
                                                            You can follow the status of your order on our website, either in our dedicated Client Service area or by accessing the <a href="#" style={{ color: '#000000', textDecoration: 'underline' }} target="_blank">My Account</a> section if you already have an account.
                                                          </p>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{ padding: '0px', width: '440px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', verticalAlign: 'top' }} align="center">
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginTop: '10px', marginBottom: '10px' }}>
                                                            We will confirm the shipment of your order by email. <br />
                                                            <br />
                                                            If you are a registered client, you may cancel your order via your account within 30 minutes after placing it.
                                                          </p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  
                                  {/* Product Details Section */}
                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0, borderTop: '1px solid #000' }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                    <tbody>
                                      <tr>
                                        <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                          <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                            <tbody>
                                              <tr>
                                                <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ width: '200px', backgroundColor: '#ffffff', verticalAlign: 'middle' }} align="center">
                                                          <img src={receiptData.PRODUCT_IMAGE} width="200" alt="Product" />
                                                        </td>
                                                        <td>
                                                          <table border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                                                            <tbody>
                                                              <tr>
                                                                <td style={{ fontFamily: 'Arial,Helvetica,sans-serif', width: '290px', verticalAlign: 'top' }} align="left">
                                                                  <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'left', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '5px', marginTop: '10px', marginBottom: '10px', textTransform: 'uppercase' }}>
                                                                    <strong>{receiptData.PRODUCT_NAME}</strong>
                                                                    <br />
                                                                    {receiptData.PRODUCT_PRICE}
                                                                  </p>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style={{ fontFamily: 'Arial,Helvetica,sans-serif', width: '290px', verticalAlign: 'top' }} align="left">
                                                                  <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'left', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '5px', marginTop: '10px', marginBottom: '5px' }}>
                                                                    Colour:&nbsp;{receiptData.PRODUCT_COLOUR} <br />
                                                                    Quantity:&nbsp;1
                                                                  </p>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  
                                  {/* Order Summary */}
                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0, borderTop: '1px solid #000' }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                    <tbody>
                                      <tr>
                                        <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                          <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                            <tbody>
                                              <tr>
                                                <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '580px' }}>
                                                  <table border={0} cellPadding="0" cellSpacing="0" align="center">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                                          <img style={{ margin: '0px', padding: '0px', display: 'block', height: '40px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="40" border={0} />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="left" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', width: '440px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'left', lineHeight: '20px', color: '#000000', verticalAlign: 'top' }} align="left">
                                                          <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                                                            <tbody>
                                                              <tr>
                                                                <td style={{ width: '170px' }} align="center">
                                                                  <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'left', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}>
                                                                    Subtotal:
                                                                  </p>
                                                                </td>
                                                                <td style={{ width: '250px', verticalAlign: 'top' }} align="left">
                                                                  <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'right', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}>
                                                                    {receiptData.PRODUCT_PRICE}
                                                                  </p>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style={{ width: '170px' }} align="center">
                                                                  <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'left', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}>
                                                                    Shipping fees:
                                                                  </p>
                                                                </td>
                                                                <td style={{ width: '250px', verticalAlign: 'top' }} align="left">
                                                                  <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'right', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}>
                                                                    € 0
                                                                  </p>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td style={{ width: '170px' }} align="center">
                                                                  <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'left', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}>
                                                                    <strong>TOTAL (incl. VAT):</strong>
                                                                  </p>
                                                                </td>
                                                                <td style={{ width: '250px', verticalAlign: 'top' }} align="left">
                                                                  <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'right', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}>
                                                                    <strong>{receiptData.PRODUCT_PRICE}</strong>
                                                                  </p>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  
                                  {/* Address Information */}
                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0, borderTop: '1px solid #000' }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                    <tbody>
                                      <tr>
                                        <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                          <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                            <tbody>
                                              <tr>
                                                <td align="center" style={{ padding: '0px', verticalAlign: 'top', width: '440px' }}>
                                                  
                                                  {/* Shipping Address */}
                                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="left" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', width: '440px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', verticalAlign: 'top' }} align="left">
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#666666', marginLeft: '10px', marginRight: '10px', marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0 }}>
                                                            <b>Shipping Address</b>
                                                          </p>
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0 }}>
                                                            {receiptData.ADDRESS1}<br />
                                                            {receiptData.ADDRESS2}<br />
                                                            {receiptData.ADDRESS3}<br />
                                                            {receiptData.ADDRESS4}<br />
                                                          </p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  <table border={0} cellPadding="0" cellSpacing="0" align="left">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                                          <img style={{ margin: '0px', padding: '0px', display: 'block', height: '20px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="20" border={0} />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  {/* Billing Address */}
                                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="left" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', width: '440px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', verticalAlign: 'top' }} align="left">
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#666666', marginLeft: '10px', marginRight: '10px', marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0 }}>
                                                            <b>Billing Address</b>
                                                          </p>
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0 }}>
                                                            {receiptData.BILLING1}<br />
                                                            {receiptData.BILLING2}<br />
                                                            {receiptData.BILLING3}<br />
                                                            {receiptData.BILLING4}<br />
                                                          </p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  <table border={0} cellPadding="0" cellSpacing="0" align="left">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                                          <img style={{ margin: '0px', padding: '0px', display: 'block', height: '20px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="20" border={0} />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  {/* Payment Method */}
                                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="left" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', width: '440px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', verticalAlign: 'top' }} align="left">
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#666666', marginLeft: '10px', marginRight: '10px', marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0 }}>
                                                            <b>Payment method</b>
                                                          </p>
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0 }}>
                                                            Credit card
                                                          </p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  <table border={0} cellPadding="0" cellSpacing="0" align="left">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                                          <img style={{ margin: '0px', padding: '0px', display: 'block', height: '20px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="20" border={0} />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  
                                                  {/* Shipping Method */}
                                                  <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="left" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ padding: '0px', width: '440px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', verticalAlign: 'top' }} align="left">
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#666666', marginLeft: '10px', marginRight: '10px', marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0 }}>
                                                            <b>Shipping method</b>
                                                          </p>
                                                          <p style={{ fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', textAlign: 'center', lineHeight: '20px', color: '#000000', marginLeft: '10px', marginRight: '10px', marginBottom: 0, marginTop: 0, paddingBottom: 0, paddingTop: 0 }}>
                                                            STANDARD
                                                          </p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  
                                  {/* Footer */}
                                  <br />
                                  <table style={{ borderTop: '1px solid #000' }} border={0} cellPadding="0" cellSpacing="0" align="center">
                                    <tbody>
                                      <tr>
                                        <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                          <img style={{ margin: '0px', padding: '0px', display: 'block', height: '15px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="15" border={0} />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          {/* Contact Information */}
                          <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center">
                            <tbody>
                              <tr>
                                <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }}>
                                  <img style={{ margin: '0px', padding: '0px', display: 'block', height: '24px' }} src="./balenciaga/balenciaga_files/51a78701-58a5-4e28-b13f-fdcd57ed0b3a.gif" width="1" height="24" border={0} />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" width="440" cellSpacing="0" align="center" bgcolor="#FFFFFF">
                            <tbody>
                              <tr>
                                <td style={{ padding: '0px', verticalAlign: 'top', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', lineHeight: '16px', color: '#000000' }} align="center">
                                  Should you need any further information, please call us at <a href="tel:+44%2020%2033%2018%2060%2027" style={{ marginRight: '0px', textDecoration: 'underline', color: '#000000' }} target="_blank">+44 20 33 18 60 27</a> or <a href="#" style={{ textDecoration: 'underline', color: '#000000' }} target="_blank">email us</a>. <br />
                                  By contacting Client Service, you agree that your data will be transferred outside your country. <br />
                                  <br />
                                  Balenciaga Client Service
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          {/* Copyright */}
                          <div>
                            <table style={{ borderCollapse: 'collapse', borderSpacing: 0, borderTop: '1px solid #000' }} border={0} cellPadding="0" cellSpacing="0" align="center">
                              <tbody>
                                <tr>
                                  <td style={{ padding: '0px', verticalAlign: 'top', width: '599px' }} align="center">
                                    <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }} border={0} cellPadding="0" cellSpacing="0" align="center" bgcolor="#ffffff">
                                      <tbody>
                                        <tr>
                                          <td style={{ padding: '0px', verticalAlign: 'center', width: '599px', fontFamily: 'Arial,Helvetica,sans-serif', fontSize: '14px', lineHeight: '20px', color: '#181212' }} align="center">
                                            © 2023 Balenciaga
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
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
      
      if (receipt && receipt.receipt_type === 'balenciaga') {
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

  // Return empty props if no valid receipt found
  return {
    props: {
      receiptData: null,
      receiptId: null,
    },
  };
};

export default BalenciagaReceiptPage;