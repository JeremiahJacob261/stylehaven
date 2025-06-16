"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getReceiptData } from '@/lib/receipt-data';
interface BapeReceiptProps {
  ORDER_NUMBER: string;
  PRODUCT_IMAGE: string;
  PRODUCT_NAME: string;
  PRODUCT_STYLE_SIZE: string;
  PRODUCT_PRICE: string;
  SUBTOTAL: string;
  SHIPPING_COST: string;
  TAXES_INCLUDED: string;
  ORDER_TOTAL_CURRENCY: string;
  ADDRESS1: string;
  ADDRESS2: string;
  ADDRESS3: string;
  ADDRESS4: string;
  BILLING1: string;
  BILLING2: string;
  BILLING3: string;
  BILLING4: string;
  CARD_ENDING: string;
}

const defaultProps: BapeReceiptProps = {
  ORDER_NUMBER: "BAPEUK0012345",
  PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/bape/Thank you for your purchase!_files/IMAGE",
  PRODUCT_NAME: "ABC CAMO COLLEGE TEE",
  PRODUCT_STYLE_SIZE: "BLACK / M",
  PRODUCT_PRICE: "£95.00",
  SUBTOTAL: "£95.00",
  SHIPPING_COST: "£10.00",
  TAXES_INCLUDED: "£17.50",
  ORDER_TOTAL_CURRENCY: "£105.00 GBP",
  ADDRESS1: "Ape Enthusiast",
  ADDRESS2: "1 Camo Street",
  ADDRESS3: "London",
  ADDRESS4: "WC2H 7L",
  BILLING1: "Ape Enthusiast",
  BILLING2: "1 Camo Street",
  BILLING3: "London",
  BILLING4: "WC2H 7L",
  CARD_ENDING: "1234"
};

interface BapeReceiptPageProps {
  receiptData?: BapeReceiptProps;
  receiptId?: string;
}

const BapeReceiptPage: React.FC<BapeReceiptPageProps> = ({ 
  receiptData: serverReceiptData, 
  receiptId 
}) => {
  const [receiptData, setReceiptData] = useState<BapeReceiptProps>(
    serverReceiptData || defaultProps
  );

  useEffect(() => {
    // Fallback to localStorage if no server data and no receiptId
    if (!serverReceiptData && !receiptId) {
      const storedData = localStorage.getItem('bapeReceiptData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setReceiptData(parsedData);
        } catch (error) {
          console.error('Error parsing BAPE receipt data:', error);
        }
      }
    }
  }, [serverReceiptData, receiptId]);

  return (
    <>
      <Head>
        <title>Thank you for your purchase!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          h4 {
            text-align: left;
          }

          @media screen {
            .headerLineTitle {
              width: 1.5in;
              display: inline-block;
              margin: 0in;
              margin-bottom: .0001pt;
              font-size: 11.0pt;
              font-family: "Calibri", "sans-serif";
              font-weight: bold;
            }

            .headerLineText {
              display: inline;
              margin: 0in;
              margin-bottom: .0001pt;
              font-size: 11.0pt;
              font-family: "Calibri", "sans-serif";
              font-weight: normal;
            }

            .pageHeader {
              font-size: 14.0pt;
              font-family: "Calibri", "sans-serif";
              font-weight: bold;
              visibility: hidden;
              display: none;
            }
          }

          @media print {
            .headerLineTitle {
              width: 1.5in;
              display: inline-block;
              margin: 0in;
              margin-bottom: .0001pt;
              font-size: 11.0pt;
              font-family: "Calibri", "sans-serif";
              font-weight: bold;
            }

            .headerLineText {
              display: inline;
              margin: 0in;
              margin-bottom: .0001pt;
              font-size: 11.0pt;
              font-family: "Calibri", "sans-serif";
              font-weight: normal;
            }

            .pageHeader {
              font-size: 14.0pt;
              font-family: "Calibri", "sans-serif";
              font-weight: bold;
              visibility: visible;
              display: block;
            }
          }

          body {
            margin: 0;
          }

          .body {
            height: 100% !important;
            width: 100% !important;
            border-spacing: 0;
            border-collapse: collapse;
          }

          .container {
            width: 560px;
            text-align: left;
            border-spacing: 0;
            border-collapse: collapse;
            margin: 0 auto;
          }

          .header {
            width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
            margin: 40px 0 20px;
          }

          .content {
            width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
          }

          .section {
            width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
          }

          .row {
            width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
          }

          .footer {
            width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
            border-top-width: 1px;
            border-top-color: #e5e5e5;
            border-top-style: solid;
          }

          td {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          }

          .header__cell {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          }

          .order-number__cell {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            text-transform: uppercase;
            font-size: 14px;
            color: #999;
          }

          .order-number__text {
            font-size: 16px;
          }

          .content__cell {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            padding-bottom: 40px;
            border-width: 0;
          }

          .section__cell {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            padding: 40px 0;
          }

          .footer__cell {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            padding: 35px 0;
          }

          h2 {
            font-weight: normal;
            font-size: 24px;
            margin: 0 0 10px;
          }

          h3 {
            font-weight: normal;
            font-size: 20px;
            margin: 0 0 25px;
          }

          h4 {
            font-weight: 500;
            font-size: 16px;
            color: #555;
            margin: 0 0 5px;
          }

          p {
            color: #777;
            line-height: 150%;
            font-size: 16px;
            margin: 0;
          }

          .button {
            border-spacing: 0;
            border-collapse: collapse;
            float: left;
            margin-right: 15px;
          }

          .button__cell {
            border-radius: 4px;
          }

          .button__text {
            font-size: 16px;
            text-decoration: none;
            display: block;
            color: #fff;
            padding: 20px 25px;
          }

          .link {
            border-spacing: 0;
            border-collapse: collapse;
            margin-top: 19px;
          }

          .link__cell {
            border-radius: 4px;
          }

          .order-list__product-image {
            margin-right: 15px;
            border-radius: 8px;
            border: 1px solid #e5e5e5;
          }

          .order-list__item-title {
            font-size: 16px;
            font-weight: 600;
            line-height: 1.4;
            color: #555;
          }

          .order-list__item-variant {
            font-size: 14px;
            color: #999;
          }

          .order-list__item-price {
            color: #555;
            line-height: 150%;
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 0 15px;
          }

          .subtotal-lines {
            width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
            margin-top: 15px;
            border-top-width: 1px;
            border-top-color: #e5e5e5;
            border-top-style: solid;
          }

          .subtotal-table {
            width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
            margin-top: 20px;
          }

          .subtotal-table--total {
            border-top-width: 2px;
            border-top-color: #e5e5e5;
            border-top-style: solid;
          }

          .subtotal-line__title {
            padding: 2px 0;
          }

          .subtotal-line__value {
            padding: 2px 0;
          }

          .subtotal-spacer {
            width: 40%;
          }

          .customer-info__item {
            padding-bottom: 40px;
            width: 50%;
          }

          .customer-info__item-credit {
            height: 24px;
            display: inline-block;
            margin-right: 10px;
            margin-top: 5px;
            margin-bottom: -6px;
          }

          .disclaimer__subtext {
            color: #999;
            line-height: 150%;
            font-size: 14px;
            margin: 0;
          }

          .spacer {
            min-width: 600px;
            height: 0;
          }

          .actions {
            width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
            margin-top: 20px;
          }

          .empty-line {
            line-height: 0em;
          }
        `}</style>
      </Head>
      
      <div style={{ margin: 0 }}>
        <table className="body">
          <tbody>
            <tr>
              <td>
                <table className="header row">
                  <tbody>
                    <tr>
                      <td className="header__cell">
                        <center>
                          <table className="container">
                            <tbody>
                              <tr>
                                <td>
                                  <table className="row">
                                    <tbody>
                                      <tr>
                                        <td className="shop-name__cell">
                                          <img 
                                            src="https://stylehaven-five.vercel.app/bape/Thank you for your purchase!_files/ukbapecomlogo01.png" 
                                            alt="uk.bape.com" 
                                            width="250" 
                                          />
                                        </td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td className="order-number__cell" align="right">
                                          <span className="order-number__text">
                                            Order #{receiptData.ORDER_NUMBER}
                                          </span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="row content">
                  <tbody>
                    <tr>
                      <td className="content__cell">
                        <center>
                          <table className="container">
                            <tbody>
                              <tr>
                                <td>
                                  <h2>Thank you for your purchase!</h2>
                                  <p>
                                    We're getting your order ready to be shipped. We will notify you when it has been sent.
                                  </p>
                                  <table className="row actions">
                                    <tbody>
                                      <tr>
                                        <td className="empty-line"> </td>
                                      </tr>
                                      <tr>
                                        <td className="actions__cell">
                                          <table className="button main-action-cell">
                                            <tbody>
                                              <tr>
                                                <td className="button__cell" align="center" style={{ backgroundColor: '#1990C6' }}>
                                                  <a href="https://uk.bape.com/" className="button__text">
                                                    View your order
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table className="link secondary-action-cell">
                                            <tbody>
                                              <tr>
                                                <td className="link__cell" align="center">
                                                  or <a href="https://uk.bape.com/" style={{ fontSize: '16px', textDecoration: 'none', color: '#1990C6' }}>Visit our store</a>
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
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="row section">
                  <tbody>
                    <tr>
                      <td className="section__cell">
                        <center>
                          <table className="container">
                            <tbody>
                              <tr>
                                <td>
                                  <h3>Order summary</h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table className="container">
                            <tbody>
                              <tr>
                                <td>
                                  <table className="row">
                                    <tbody>
                                      <tr className="order-list__item">
                                        <td className="order-list__item__cell">
                                          <table>
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <img 
                                                    src={receiptData.PRODUCT_IMAGE} 
                                                    align="left" 
                                                    width="60" 
                                                    height="60" 
                                                    className="order-list__product-image" 
                                                  />
                                                </td>
                                                <td className="order-list__product-description-cell" style={{ width: '100%' }}>
                                                  <span className="order-list__item-title">{receiptData.PRODUCT_NAME}</span><br />
                                                  <span className="order-list__item-variant">{receiptData.PRODUCT_STYLE_SIZE}</span><br />
                                                </td>
                                                <td className="order-list__price-cell" style={{ whiteSpace: 'nowrap' }}>
                                                  <p className="order-list__item-price" align="right">{receiptData.PRODUCT_PRICE}</p>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  
                                  <table className="row subtotal-lines">
                                    <tbody>
                                      <tr>
                                        <td className="subtotal-spacer"></td>
                                        <td>
                                          <table className="row subtotal-table">
                                            <tbody>
                                              <tr className="subtotal-line">
                                                <td className="subtotal-line__title">
                                                  <p>
                                                    <span>Subtotal</span>
                                                  </p>
                                                </td>
                                                <td className="subtotal-line__value" align="right">
                                                  <strong style={{ fontSize: '16px', color: '#555' }}>{receiptData.SUBTOTAL}</strong>
                                                </td>
                                              </tr>
                                              <tr className="subtotal-line">
                                                <td className="subtotal-line__title">
                                                  <p>
                                                    <span>Shipping</span>
                                                  </p>
                                                </td>
                                                <td className="subtotal-line__value" align="right">
                                                  <strong style={{ fontSize: '16px', color: '#555' }}>{receiptData.SHIPPING_COST}</strong>
                                                </td>
                                              </tr>
                                              <tr className="subtotal-line">
                                                <td className="subtotal-line__title">
                                                  <p>
                                                    <span>Taxes (included)</span>
                                                  </p>
                                                </td>
                                                <td className="subtotal-line__value" align="right">
                                                  <strong style={{ fontSize: '16px', color: '#555' }}>{receiptData.TAXES_INCLUDED}</strong>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          
                                          <table className="row subtotal-table subtotal-table--total">
                                            <tbody>
                                              <tr className="subtotal-line">
                                                <td className="subtotal-line__title" style={{ padding: '20px 0 0' }}>
                                                  <p>
                                                    <span>Total</span>
                                                  </p>
                                                </td>
                                                <td className="subtotal-line__value" style={{ padding: '20px 0 0' }} align="right">
                                                  <strong style={{ fontSize: '24px', color: '#555' }}>{receiptData.ORDER_TOTAL_CURRENCY}</strong>
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
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="row section">
                  <tbody>
                    <tr>
                      <td className="section__cell">
                        <center>
                          <table className="container">
                            <tbody>
                              <tr>
                                <td>
                                  <h3>Customer information</h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table className="container">
                            <tbody>
                              <tr>
                                <td>
                                  <table className="row">
                                    <tbody>
                                      <tr>
                                        <td className="customer-info__item" valign="top">
                                          <h4>Shipping address</h4>
                                          <p>
                                            {receiptData.ADDRESS1}<br />
                                            {receiptData.ADDRESS2}<br />
                                            {receiptData.ADDRESS3}<br />
                                            {receiptData.ADDRESS4}
                                          </p>
                                        </td>
                                        <td className="customer-info__item" valign="top">
                                          <h4>Billing address</h4>
                                          <p>
                                            {receiptData.BILLING1}<br />
                                            {receiptData.BILLING2}<br />
                                            {receiptData.BILLING3}<br />
                                            {receiptData.BILLING4}
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  
                                  <table className="row">
                                    <tbody>
                                      <tr>
                                        <td className="customer-info__item" valign="top">
                                          <h4>Payment</h4>
                                          <p className="customer-info__item-content">
                                            <img 
                                              src="https://stylehaven-five.vercel.app/bape/Thank you for your purchase!_files/mastercard-c8d6f1c2e7b63ab95f49954c724c675678d205478e3de8d6f3da384fc068589d.png" 
                                              className="customer-info__item-credit" 
                                              height="24" 
                                              alt="Mastercard" 
                                            />
                                            <span>ending with {receiptData.CARD_ENDING}</span><br />
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="customer-info__item" valign="top">
                                          <h4>Shipping method</h4>
                                          <p>Standard</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="row footer">
                  <tbody>
                    <tr>
                      <td className="footer__cell">
                        <center>
                          <table className="container">
                            <tbody>
                              <tr>
                                <td>
                                  <p className="disclaimer__subtext">
                                    If you have any questions, reply to this email or contact us at{' '}
                                    <a href="mailto:cs_uk@bape.com" style={{ fontSize: '14px', textDecoration: 'none', color: '#1990C6' }}>
                                      cs_uk@bape.com
                                    </a>
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <img 
                  src="https://stylehaven-five.vercel.app/bape/Thank you for your purchase!_files/spacer-1a26dfd5c56b21ac888f9f1610ef81191b571603cb207c6c0f564148473cab3c.png" 
                  className="spacer" 
                  height="1" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (id && typeof id === 'string') {
    try {
      const receipt = await getReceiptData(id);
      
      if (receipt && receipt.receipt_type === 'bape') {
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


export default BapeReceiptPage;