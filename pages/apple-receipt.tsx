"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getReceiptData } from '@/lib/receipt-data';

interface AppleReceiptProps {
  ORDER_NUMBER: string;
  ORDER_DATE: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  PRODUCT_PRICE: string;
  SHIPPING_COST: string;
  ORDER_TOTAL: string;
  ADDRESS_LINE_1: string;
  ADDRESS_LINE_2: string;
  ADDRESS_LINE_3: string;
  ADDRESS_LINE_4: string;
  ADDRESS_LINE_5: string;
  BILLING_NAME: string;
  BILLING_EMAIL: string;
  BILLING_ADDRESS_1: string;
  BILLING_ADDRESS_2: string;
  BILLING_ADDRESS_3: string;
  BILLING_ADDRESS_4: string;
}

const defaultProps: AppleReceiptProps = {
  ORDER_NUMBER: "W1234567890",
  ORDER_DATE: "30 November 2024",
  PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/apple/apple_files/product-image.png",
  PRODUCT_NAME: "iPhone 15 Pro Max 256GB Natural Titanium",
  PRODUCT_PRICE: "£1,199.00",
  SHIPPING_COST: "Free",
  ORDER_TOTAL: "£1,199.00",
  ADDRESS_LINE_1: "John Smith",
  ADDRESS_LINE_2: "123 Main Street",
  ADDRESS_LINE_3: "London",
  ADDRESS_LINE_4: "SW1A 1AA",
  ADDRESS_LINE_5: "United Kingdom",
  BILLING_NAME: "John Smith",
  BILLING_EMAIL: "john.smith@example.com",
  BILLING_ADDRESS_1: "John Smith",
  BILLING_ADDRESS_2: "123 Main Street",
  BILLING_ADDRESS_3: "London",
  BILLING_ADDRESS_4: "SW1A 1AA United Kingdom"
};

interface AppleReceiptPageProps {
  receiptData?: AppleReceiptProps;
  receiptId?: string;
}

const AppleReceiptPage: React.FC<AppleReceiptPageProps> = ({ 
  receiptData: serverReceiptData, 
  receiptId 
}) => {
  const [receiptData, setReceiptData] = useState<AppleReceiptProps>(
    serverReceiptData || defaultProps
  );

  useEffect(() => {
    // Fallback to localStorage if no server data and no receiptId
    if (!serverReceiptData && !receiptId) {
      const storedData = localStorage.getItem('appleReceiptData');
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
        <title>{`Apple - Order ${receiptData.ORDER_NUMBER}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        {/* Add a small indicator if data is from Supabase */}
        
        
        <center>
          <table style={{ paddingBottom: '0px', marginBottom: '0px', margin: '0px' }} cellSpacing="0" cellPadding="0" border={0} width="100%" align="center">
            <tbody>
              <tr>
                <td align="center">
                  <table cellSpacing="0" cellPadding="0" border={0} width="660" align="center" className="main-table">
                    <tbody>
                      <tr>
                        <td style={{ paddingTop: '32px' }} align="left" valign="top" className="apple-logo-td">
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingTop: '32px' }} align="left" valign="top" className="apple-logo-td">
                          <img 
                            alt="Apple" 
                            width="auto" 
                            height="25" 
                            border={0} 
                            style={{ outline: 'none', display: 'block' }} 
                            className="header-logo-img" 
                            src="https://stylehaven-five.vercel.app/apple/apple_files/apple_icon_2x.png"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingTop: '75px', paddingBottom: '51px' }} align="left" valign="top" className="greeting-td">
                          <h1 style={{ 
                            fontFamily: '"SF UI Display Medium",system,-apple-system,-webkit-system-font,"SFNSText","Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif', 
                            fontWeight: 'normal', 
                            color: '#333333', 
                            lineHeight: '47px', 
                            fontSize: '34px', 
                            marginTop: '0px', 
                            marginLeft: '0px', 
                            marginRight: '0px', 
                            marginBottom: '2px', 
                            borderBottom: '0px' 
                          }} className="heading-email">
                            Thank you for your order.
                          </h1>
                          <p style={{ 
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                            fontSize: '17px', 
                            lineHeight: '24px', 
                            color: '#333333', 
                            paddingTop: '13px', 
                            marginTop: 0, 
                            marginLeft: 0, 
                            marginRight: 0, 
                            marginBottom: 0 
                          }} className="sub-heading">
                            One or more of your items will be delivered by a courier service. <br />
                            Someone must be present to receive these items.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingBottom: '14px' }} className="order-num-td">
                          <div style={{ 
                            color: '#333333', 
                            fontWeight: 'normal', 
                            fontSize: '14px', 
                            lineHeight: '21px', 
                            marginTop: '0px', 
                            marginBottom: '0px' 
                          }} className="order-num">
                            <span style={{ 
                              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                              fontWeight: 600, 
                              letterSpacing: '0px' 
                            }}>
                              Order Number:
                            </span>
                            <span style={{ 
                              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                              color: '#0070C9' 
                            }}>
                              <a 
                                aria-label="Order Number" 
                                style={{ color: '#0070c9', fontWeight: 'normal' }} 
                                href="https://store.apple.com/xc/uk/vieworder/ASS" 
                                rel="noreferrer nofollow noopener" 
                                target="_blank"
                              >
                                {receiptData.ORDER_NUMBER}
                              </a>
                            </span>
                          </div>
                          <div style={{ 
                            color: '#333333', 
                            fontWeight: 'normal', 
                            fontSize: '14px', 
                            lineHeight: '21px', 
                            marginTop: '0px', 
                            marginBottom: '0px' 
                          }} className="order-num">
                            <span style={{ 
                              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                              fontWeight: 600, 
                              letterSpacing: '0px' 
                            }}>
                              Ordered on:
                            </span>
                            <span style={{ 
                              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                              fontWeight: 'normal' 
                            }}>
                              {receiptData.ORDER_DATE}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" height="1" style={{ backgroundColor: '#D6D6D6' }} valign="top" className="moe-line-col">
                          <div style={{ backgroundColor: '#D6D6D6', fontSize: '1px', height: '1px' }}></div>
                        </td>
                      </tr>
                      
                      {/* Items Section */}
                      <tr>
                        <td align="center" valign="top">
                          <table style={{ paddingTop: '43px' }} border={0} cellPadding="0" cellSpacing="0" width="100%" className="render-lineitems-table">
                            <tbody>
                              <tr>
                                <td>
                                  <table style={{ width: '29%' }} border={0} cellPadding="0" cellSpacing="0" align="left" className="section-heading-table" width="29%">
                                    <tbody>
                                      <tr>
                                        <td style={{ 
                                          fontFamily: '"SF UI Display Medium",system,-apple-system,-webkit-system-font,"SFNSText","Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif', 
                                          fontWeight: 500, 
                                          letterSpacing: '0px', 
                                          color: '#333333', 
                                          fontSize: '22px', 
                                          lineHeight: '27px', 
                                          marginTop: 0, 
                                          marginLeft: 0, 
                                          marginRight: 0, 
                                          marginBottom: 0 
                                        }} align="left" valign="top" className="section-items-heading-td">
                                          <h2 style={{ 
                                            fontFamily: '"SF UI Display Medium",system,-apple-system,-webkit-system-font,"SFNSText","Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif', 
                                            fontWeight: 500, 
                                            letterSpacing: '0px', 
                                            color: '#333333', 
                                            fontSize: '22px', 
                                            lineHeight: '27px', 
                                            marginTop: 0, 
                                            marginLeft: 0, 
                                            marginRight: 0, 
                                            marginBottom: 0 
                                          }} className="sectionHeading">
                                            Items to be Dispatched
                                          </h2>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table style={{ width: '66.5%' }} border={0} cellPadding="0" cellSpacing="0" align="right" width="66.5%" className="product-list-table">
                                    <tbody>
                                      <tr>
                                        <td align="left" valign="top" className="pad-lr">
                                          <div style={{ 
                                            paddingBottom: '3px', 
                                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                            fontWeight: 600, 
                                            letterSpacing: '0px', 
                                            fontSize: '17px', 
                                            lineHeight: '26px', 
                                            color: '#333333', 
                                            marginTop: '0px', 
                                            marginBottom: '0px' 
                                          }}>
                                            Shipment 1
                                          </div>
                                          <div style={{ 
                                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                            fontSize: '17px', 
                                            lineHeight: '26px', 
                                            color: '#333333' 
                                          }}>
                                            <span style={{ fontWeight: 600 }}>Delivery:</span> Today from Store, 2 p.m. - 4 p.m. by Scheduled Courier Delivery
                                          </div>
                                        </td>
                                      </tr>
                                      
                                      {/* Product Item */}
                                      <tr>
                                        <td align="left" valign="top">
                                          <table border={0} cellPadding="0" cellSpacing="0" align="left" width="100%">
                                            <tbody>
                                              <tr>
                                                <td align="left" valign="top" className="pad-lr">
                                                  <table style={{ width: '100%', minWidth: '100%' }} border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ height: '21px', fontSize: '21px', lineHeight: '21px', minWidth: '100%' }} align="left" height="21" valign="top" className="gap-30">
                                                          <img width="1" height="21" border={0} style={{ display: 'block', outline: 'none' }} alt="" className="gap-30" src="https://stylehaven-five.vercel.app/apple_files/spacer.gif" />
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{ minWidth: '100%' }} align="left" height="1" style={{ backgroundColor: '#D6D6D6' }} valign="top" className="moe-line-col">
                                                          <div style={{ backgroundColor: '#D6D6D6', fontSize: '1px', height: '1px' }}></div>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{ height: '28px', fontSize: '28px', lineHeight: '28px', minWidth: '100%' }} align="left" height="28" valign="top" className="gap-24">
                                                          <img width="1" height="28" border={0} style={{ display: 'block', outline: 'none' }} alt="" className="gap-24" src="https://stylehaven-five.vercel.app/apple_files/spacer.gif" />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table cellPadding="0" cellSpacing="0" border={0} align="left" width="100%" className="line-item-table">
                                            <tbody>
                                              <tr>
                                                <td style={{ paddingRight: '10px' }} valign="top" width="96" align="center" className="product-image-td">
                                                  <img 
                                                    style={{ outline: 'none', display: 'block' }} 
                                                    width="100px" 
                                                    alt="image" 
                                                    className="product-image-img" 
                                                    src={receiptData.PRODUCT_IMAGE}
                                                  />
                                                </td>
                                                <td align="left" valign="top">
                                                  <table cellPadding="0" cellSpacing="0" border={0} align="left" width="100%" className="item-details-table">
                                                    <tbody>
                                                      <tr>
                                                        <td style={{ 
                                                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                                          fontWeight: 600, 
                                                          letterSpacing: '0px', 
                                                          fontSize: '17px', 
                                                          lineHeight: '26px', 
                                                          color: '#333333', 
                                                          margin: 0 
                                                        }} valign="top" align="left" className="product-name-td">
                                                          {receiptData.PRODUCT_NAME}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{ 
                                                          paddingTop: '6px', 
                                                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                                          fontSize: '17px', 
                                                          lineHeight: '26px', 
                                                          color: '#333333' 
                                                        }} align="left" className="base-price-td">
                                                          {receiptData.PRODUCT_PRICE}
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{ paddingTop: '6px' }} className="qty-price-divider" width="100%">
                                                          <table style={{ height: '1px', fontSize: '1px', lineHeight: '1px', width: '100%' }} height="1" border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                                                            <tbody>
                                                              <tr>
                                                                <td align="left" height="1" style={{ backgroundColor: '#D6D6D6' }} valign="top" className="moe-line-col">
                                                                  <div style={{ backgroundColor: '#D6D6D6', fontSize: '1px', height: '1px' }}></div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{ paddingTop: '6px' }} className="qty-price-td">
                                                          <table cellSpacing="0" border={0} cellPadding="0" align="left" width="45%" className="product-quantity-table">
                                                            <tbody>
                                                              <tr>
                                                                <td style={{ 
                                                                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                                                  fontSize: '17px', 
                                                                  lineHeight: '26px', 
                                                                  color: '#333333' 
                                                                }} align="left" className="product-quantity">
                                                                  <nobr>Qty 1</nobr>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                          <table cellSpacing="0" border={0} cellPadding="0" align="right" width="50%" className="total-price-table">
                                                            <tbody>
                                                              <tr>
                                                                <td style={{ 
                                                                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                                                  fontWeight: 600, 
                                                                  letterSpacing: '0px', 
                                                                  fontSize: '17px', 
                                                                  lineHeight: '26px', 
                                                                  color: '#333333', 
                                                                  margin: 0 
                                                                }} align="right" className="total-price">
                                                                  {receiptData.PRODUCT_PRICE}
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
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          {/* Shipping Address Section */}
                          <table cellSpacing="0" border={0} cellPadding="0" width="100%" align="center">
                            <tbody>
                              <tr>
                                <td>
                                  <table style={{ width: '66.5%' }} border={0} cellPadding="0" cellSpacing="0" align="right" width="66.5%" className="section-details-table">
                                    <tbody>
                                      <tr>
                                        <td style={{ 
                                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                          fontSize: '17px', 
                                          lineHeight: '26px', 
                                          color: '#333333' 
                                        }} valign="top" align="left" className="section-details-td">
                                          <table style={{ width: '100%', minWidth: '100%' }} border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                                            <tbody>
                                              <tr>
                                                <td style={{ height: '30px', fontSize: '30px', lineHeight: '30px', minWidth: '100%' }} align="left" height="30" valign="top" className="gap-21">
                                                  <img width="1" height="30" border={0} style={{ display: 'block', outline: 'none' }} alt="" className="gap-21" src="https://stylehaven-five.vercel.app/apple_files/spacer.gif" />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style={{ minWidth: '100%' }} align="left" height="1" style={{ backgroundColor: '#D6D6D6' }} valign="top" className="moe-line-col">
                                                  <div style={{ backgroundColor: '#D6D6D6', fontSize: '1px', height: '1px' }}></div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style={{ height: '30px', fontSize: '30px', lineHeight: '30px', minWidth: '100%' }} align="left" height="30" valign="top" className="gap-32">
                                                  <img width="1" height="30" border={0} style={{ display: 'block', outline: 'none' }} alt="" className="gap-32" src="https://stylehaven-five.vercel.app/apple_files/spacer.gif" />
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <h3 style={{ 
                                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                            fontWeight: 600, 
                                            letterSpacing: '0px', 
                                            fontSize: '17px', 
                                            lineHeight: '26px', 
                                            color: '#333333', 
                                            marginTop: '0px', 
                                            marginBottom: '0px' 
                                          }} className="subsec-heading">
                                            Shipping Address:
                                          </h3>
                                          <div style={{ 
                                            width: '100%', 
                                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                            fontSize: '17px', 
                                            lineHeight: '26px', 
                                            color: '#333333' 
                                          }} className="gen-txt">{receiptData.ADDRESS_LINE_1}</div>
                                          <div style={{ 
                                            width: '100%', 
                                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                            fontSize: '17px', 
                                            lineHeight: '26px', 
                                            color: '#333333' 
                                          }} className="gen-txt">{receiptData.ADDRESS_LINE_2}</div>
                                          <div style={{ 
                                            width: '100%', 
                                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                            fontSize: '17px', 
                                            lineHeight: '26px', 
                                            color: '#333333' 
                                          }} className="gen-txt">{receiptData.ADDRESS_LINE_3}</div>
                                          <div style={{ 
                                            width: '100%', 
                                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                            fontSize: '17px', 
                                            lineHeight: '26px', 
                                            color: '#333333' 
                                          }} className="gen-txt">{receiptData.ADDRESS_LINE_4}</div>
                                          <div style={{ 
                                            width: '100%', 
                                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                            fontSize: '17px', 
                                            lineHeight: '26px', 
                                            color: '#333333' 
                                          }} className="gen-txt">{receiptData.ADDRESS_LINE_5}</div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          {/* Separator Line */}
                          <table style={{ width: '100%', minWidth: '100%' }} border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                            <tbody>
                              <tr>
                                <td style={{ height: '41px', fontSize: '41px', lineHeight: '41px', minWidth: '100%' }} align="left" height="41" valign="top" className="gap-40">
                                  <img width="1" height="41" border={0} style={{ display: 'block', outline: 'none' }} alt="" className="gap-40" src="https://stylehaven-five.vercel.app/apple_files/spacer.gif" />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ minWidth: '100%' }} align="left" height="1" style={{ backgroundColor: '#D6D6D6' }} valign="top" className="moe-line-col">
                                  <div style={{ backgroundColor: '#D6D6D6', fontSize: '1px', height: '1px' }}></div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ height: '1px', fontSize: '1px', lineHeight: '1px', minWidth: '100%' }} align="left" height="1" valign="top" className="gap-1">
                                  <img width="1" height="1" border={0} style={{ display: 'block', outline: 'none' }} alt="" className="gap-1" src="https://stylehaven-five.vercel.app/apple_files/spacer.gif" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      
                      {/* Billing and Payment Section */}
                      <tr>
                        <td style={{ paddingTop: '43px', paddingBottom: '32px' }} className="payment-section-td">
                          <table style={{ width: '29%' }} border={0} cellPadding="0" cellSpacing="0" align="left" className="section-heading-table" width="29%">
                            <tbody>
                              <tr>
                                <td style={{ 
                                  fontFamily: '"SF UI Display Medium",system,-apple-system,-webkit-system-font,"SFNSText","Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif', 
                                  fontWeight: 500, 
                                  letterSpacing: '0px', 
                                  color: '#333333', 
                                  fontSize: '22px', 
                                  lineHeight: '27px', 
                                  marginTop: 0, 
                                  marginLeft: 0, 
                                  marginRight: 0, 
                                  marginBottom: 0 
                                }} align="left" valign="top" className="section-items-heading-td">
                                  <h2 style={{ 
                                    fontFamily: '"SF UI Display Medium",system,-apple-system,-webkit-system-font,"SFNSText","Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif', 
                                    fontWeight: 500, 
                                    letterSpacing: '0px', 
                                    color: '#333333', 
                                    fontSize: '22px', 
                                    lineHeight: '27px', 
                                    marginTop: 0, 
                                    marginLeft: 0, 
                                    marginRight: 0, 
                                    marginBottom: 0 
                                  }} className="sectionHeading">
                                    Billing and Payment
                                  </h2>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table style={{ width: '66.5%' }} border={0} cellPadding="0" cellSpacing="0" align="right" width="66.5%" className="section-details-table">
                            <tbody>
                              <tr>
                                <td style={{ 
                                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                  fontSize: '17px', 
                                  lineHeight: '26px', 
                                  color: '#333333' 
                                }} valign="top" align="left" className="section-details-td">
                                  <h3 style={{ 
                                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                    fontWeight: 600, 
                                    letterSpacing: '0px', 
                                    fontSize: '17px', 
                                    lineHeight: '26px', 
                                    color: '#333333', 
                                    marginTop: '0px', 
                                    marginBottom: '0px' 
                                  }} className="subsec-heading">Bill To:</h3>
                                  <div style={{ 
                                    width: '100%', 
                                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                    fontSize: '17px', 
                                    lineHeight: '26px', 
                                    color: '#333333' 
                                  }} className="gen-txt">
                                    <div style={{ width: '100%' }}>{receiptData.BILLING_NAME}</div>
                                    <div style={{ width: '100%' }}></div>
                                    <div style={{ width: '100%', wordWrap: 'break-word' }}>
                                      <span className="moe-break-me">{receiptData.BILLING_EMAIL}</span>
                                    </div>
                                  </div>
                                  <h3 style={{ 
                                    paddingTop: '23px', 
                                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                    fontWeight: 600, 
                                    letterSpacing: '0px', 
                                    fontSize: '17px', 
                                    lineHeight: '26px', 
                                    color: '#333333', 
                                    marginTop: '0px', 
                                    marginBottom: '0px' 
                                  }} className="subsec-heading">Billing Address:</h3>
                                  <div style={{ 
                                    width: '100%', 
                                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                    fontSize: '17px', 
                                    lineHeight: '26px', 
                                    color: '#333333' 
                                  }} className="gen-txt">
                                    <div style={{ width: '100%' }}>{receiptData.BILLING_ADDRESS_1}</div>
                                    <div style={{ width: '100%' }}>{receiptData.BILLING_ADDRESS_2}</div>
                                    <div style={{ width: '100%' }}>{receiptData.BILLING_ADDRESS_3}</div>
                                    <div style={{ width: '100%' }}>{receiptData.BILLING_ADDRESS_4}</div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      
                      {/* Order Total Section */}
                      <tr>
                        <td style={{ paddingBottom: '42px' }} align="center" className="amts-section-td">
                          <table style={{ width: '66.5%' }} border={0} cellPadding="0" cellSpacing="0" align="right" width="66.5%" className="amt-row-table">
                            <tbody>
                              <tr>
                                <td align="center">
                                  <table style={{ width: '100%', minWidth: '100%' }} border={0} cellPadding="0" cellSpacing="0" align="center" width="100%">
                                    <tbody>
                                      <tr>
                                        <td style={{ height: '1px', fontSize: '1px', lineHeight: '1px', minWidth: '100%' }} align="left" height="1" valign="top" className="gap-1">
                                          <img width="1" height="1" border={0} style={{ display: 'block', outline: 'none' }} alt="" className="gap-1" src="https://stylehaven-five.vercel.app/apple_files/spacer.gif" />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ minWidth: '100%' }} align="left" height="1" style={{ backgroundColor: '#D6D6D6' }} valign="top" className="moe-line-col">
                                          <div style={{ backgroundColor: '#D6D6D6', fontSize: '1px', height: '1px' }}></div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ height: '18px', fontSize: '18px', lineHeight: '18px', minWidth: '100%' }} align="left" height="18" valign="top" className="gap-15">
                                          <img width="1" height="18" border={0} style={{ display: 'block', outline: 'none' }} alt="" className="gap-15" src="https://stylehaven-five.vercel.app/apple_files/spacer.gif" />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '100%', paddingTop: '4px' }} className="amt-row-td">
                                  <table border={0} cellPadding="0" cellSpacing="0" align="left" width="49%" className="amt-label-table">
                                    <tbody>
                                      <tr>
                                        <td style={{ 
                                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                          color: '#333333', 
                                          fontSize: '17px', 
                                          lineHeight: '24px' 
                                        }} valign="top" align="left" className="amt-label-td">
                                          Bag Subtotal
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table border={0} cellPadding="0" cellSpacing="0" align="right" width="49%" className="amt-value-table">
                                    <tbody>
                                      <tr>
                                        <td style={{ 
                                          whiteSpace: 'nowrap', 
                                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                          color: '#333333', 
                                          fontSize: '17px', 
                                          lineHeight: '24px' 
                                        }} valign="top" align="right" className="amt-value-td">
                                          <nobr>{receiptData.PRODUCT_PRICE}</nobr>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '100%', paddingTop: '4px' }} className="amt-row-td">
                                  <table border={0} cellPadding="0" cellSpacing="0" align="left" width="49%" className="amt-label-table">
                                    <tbody>
                                      <tr>
                                        <td style={{ 
                                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                          color: '#339900', 
                                          fontSize: '17px', 
                                          lineHeight: '24px' 
                                        }} valign="top" align="left" className="amt-label-td">
                                          Delivery
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table border={0} cellPadding="0" cellSpacing="0" align="right" width="49%" className="amt-value-table">
                                    <tbody>
                                      <tr>
                                        <td style={{ 
                                          whiteSpace: 'nowrap', 
                                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                          color: '#339900', 
                                          fontSize: '17px', 
                                          lineHeight: '24px' 
                                        }} valign="top" align="right" className="amt-value-td">
                                          <nobr>{receiptData.SHIPPING_COST}</nobr>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '100%' }} className="amt-row-td">
                                  <table style={{ marginTop: '11px' }} border={0} cellPadding="0" cellSpacing="0" align="right" width="100%" className="amt-divider-table">
                                    <tbody>
                                      <tr>
                                        <td style={{ backgroundColor: '#D6D6D6' }} height="1" valign="top" align="left" className="amt-divider"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '100%', paddingTop: '4px' }} className="amt-row-td">
                                  <table border={0} cellPadding="0" cellSpacing="0" align="left" width="49%" className="amt-label-table">
                                    <tbody>
                                      <tr>
                                        <td style={{ 
                                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                          color: '#333333', 
                                          fontSize: '17px', 
                                          lineHeight: '24px', 
                                          fontWeight: 600 
                                        }} valign="top" align="left" className="amt-label-td">
                                          Order Total
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table border={0} cellPadding="0" cellSpacing="0" align="right" width="49%" className="amt-value-table">
                                    <tbody>
                                      <tr>
                                        <td style={{ 
                                          whiteSpace: 'nowrap', 
                                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                          color: '#333333', 
                                          fontSize: '17px', 
                                          lineHeight: '24px', 
                                          fontWeight: 600 
                                        }} valign="top" align="right" className="amt-value-td">
                                          <nobr>{receiptData.ORDER_TOTAL}</nobr>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ 
                                  paddingTop: '16px', 
                                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif', 
                                  color: '#666666', 
                                  fontSize: '14px', 
                                  lineHeight: '21px' 
                                }} valign="top" align="left" className="note-td">
                                  Your invoice will be sent via email 2–3 business days after receipt of your order.
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
        </center>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (id && typeof id === 'string') {
    try {
      const receipt = await getReceiptData(id);
      
      if (receipt && receipt.receipt_type === 'apple') {
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

export default AppleReceiptPage;