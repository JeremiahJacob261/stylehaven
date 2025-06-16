"use client";

import { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { getReceiptData } from '@/lib/receipt-data';
interface NikeReceiptProps {
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
  TRACKING_NUMBER: string;
  ESTIMATED_DELIVERY: string;
  SHIPPING_ADDRESS_1: string;
  SHIPPING_ADDRESS_2: string;
  SHIPPING_ADDRESS_3: string;
  SHIPPING_ADDRESS_4: string;
  PAYMENT_METHOD: string;
  CARD_ENDING: string;
}

const defaultProps: NikeReceiptProps = {
  ORDER_NUMBER: "NK123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/nike/nike_files/product-image.jpg",
  PRODUCT_NAME: "Air Force 1 '07",
  PRODUCT_SIZE: "10",
  PRODUCT_COLOR: "White/White",
  PRODUCT_PRICE: "$110.00",
  QUANTITY: "1",
  SUBTOTAL: "$110.00",
  SHIPPING_COST: "Free",
  TAX_AMOUNT: "$9.90",
  TOTAL_AMOUNT: "$119.90",
  TRACKING_NUMBER: "1Z999AA1234567890",
  ESTIMATED_DELIVERY: "December 5, 2024",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Main Street",
  SHIPPING_ADDRESS_3: "Portland, OR 97201",
  SHIPPING_ADDRESS_4: "United States",
  PAYMENT_METHOD: "Visa",
  CARD_ENDING: "1234"
};

interface NikeReceiptPageProps {
  receiptData?: NikeReceiptProps;
  receiptId?: string;
}

const NikeReceiptPage: React.FC<NikeReceiptPageProps> = ({ 
  receiptData: serverReceiptData, 
  receiptId 
}) => {
  const [receiptData, setReceiptData] = useState<NikeReceiptProps>(
    serverReceiptData || defaultProps
  );

  useEffect(() => {
    if (!serverReceiptData && !receiptId) {
      const storedData = localStorage.getItem('nikeReceiptData');
      if (storedData) {
        try {
          setReceiptData(JSON.parse(storedData));
        } catch (e) {}
      }
    }
  }, [serverReceiptData, receiptId]);


  if (!receiptData) {
    return <div>Loading...</div>;
  }

  return (
    <html>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=windows-1252" />
        <style type="text/css">{`
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
        `}</style>
      </head>
      <body>
        <center>
          <div align="center" style={{textAlign:'center',width:'100%',height:'100%',margin:'0px',padding:'0px'}}>
            <div align="center" style={{textAlign:'center',display:'none',fontSize:'1px',lineHeight:'1px',maxHeight:'0px',maxWidth:'0px',opacity:0,overflow:'hidden',color:'rgb(51,51,51)'}}>
              Get your order summary, estimated delivery date and more. &#8204; &#8204; &#8204; &#8204; &#8204;
              &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204;
              &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204; &#8204;
            </div>
            <div className="m_-2774923715066548899maindiv" align="center" width="100%" height="100%" style={{textAlign:'center',fontSize:'0px'}}>
              <table className="m_-2774923715066548899maintable" width="100%" align="center" cellSpacing="0" cellPadding="0" border={0} style={{padding:'0px',fontSize:'0px'}} role="presentation">
                <tbody>
                  <tr>
                    <td className="m_-2774923715066548899sidebar" style={{fontSize:'0px',lineHeight:'1px',overflow:'hidden!important'}}> </td>
                    <td className="m_-2774923715066548899outershell" width="642" valign="top" align="center" style={{width:'642px',border:'1px solid rgb(229,229,229)',maxWidth:'642px!important',minWidth:'320px!important'}}>
                      <table className="m_-2774923715066548899innershell" bgcolor="#FFFFFF" align="center" width="100%" valign="top" cellPadding="0" cellSpacing="0" border={0} style={{border:'medium',width:'100%',padding:'0px',borderCollapse:'collapse',minWidth:'320px!important',maxWidth:'640px!important'}} role="presentation">
                        <tbody>
                          <tr>
                            <td className="m_-2774923715066548899container" align="center">
                              <table align="center" width="100%" cellSpacing="0" cellPadding="0" border={0} style={{width:'100%'}}>
                                <tbody>
                                  <tr>
                                    <td align="center" style={{borderBottomWidth:'1px',borderBottomStyle:'solid',borderBottomColor:'rgb(229,229,229)'}}>
                                      <table width="100%" style={{borderSpacing:'0px'}} role="presentation">
                                        <tbody>
                                          <tr>
                                            <td bgcolor="#F7F7F7" align="center" style={{padding:'0px'}}>
                                              <table align="center" width="94%" valign="top" cellPadding="0" cellSpacing="0" border={0} style={{margin:'0px auto',maxWidth:'100%',minWidth:'320px',border:'medium',borderCollapse:'collapse'}} role="presentation">
                                                <tbody>
                                                  <tr>
                                                    <td align="left" valign="middle" style={{padding:'20px',fontSize:'0px'}}>
                                                      <table width="100%" role="presentation">
                                                        <tbody>
                                                          <tr>
                                                            <td valign="top" align="left" style={{fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',fontWeight:'bold',lineHeight:'26px',padding:'0px',color:'rgb(17,17,17)'}}>
                                                              Shipping to: {receiptData.WHOLE_NAME}
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td valign="top" align="left" style={{fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'26px',color:'rgb(102,102,102)'}}>
                                                              <p style={{fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'26px',margin:'0px',color:'rgb(102,102,102)'}}>
                                                                <span className="m_-2774923715066548899address" style={{fontFamily:'Helvetica,Arial,sans-serif'}}>{receiptData.ADDRESS1}, {receiptData.ADDRESS2}, {receiptData.ADDRESS3}</span>
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
                                          <tr>
                                            <td bgcolor="#ffffff" align="center" style={{borderTopWidth:'1px',borderTopStyle:'solid',padding:'0px',borderTopColor:'rgb(229,229,229)'}}>
                                              <div style={{lineHeight:'0px',padding:'0px',width:'0px',height:'0px',display:'none!important'}}>
                                              </div>
                                              <table width="100%" role="presentation">
                                                <tbody>
                                                  <tr>
                                                    <td style={{textAlign:'center',fontSize:'14px',padding:'50px 0px 20px'}} align="center">
                                                      <table style={{borderSpacing:'0px',minWidth:'275px',width:'65%',margin:'0px auto'}} role="presentation">
                                                        <tbody>
                                                          <tr>
                                                            <td style={{padding:'0px 0px 30px',textAlign:'center'}} align="left">
                                                              <a href="#" target="_blank">
                                                                <img style={{border: '0px'}} src="https://stylehaven-five.vercel.app/nike/nike_files/Swoosh2x.png" width="57" alt="logo" />
                                                              </a>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td style={{padding:'0px 0px 15px',textAlign:'center'}} align="left">
                                                              <h1 style={{fontSize:'28px',lineHeight:'34px',fontFamily:'Helvetica,Arial,sans-serif',margin:'0px',color:'rgb(17,17,17)'}}>
                                                                <span style={{fontSize:'28px',lineHeight:'34px',fontFamily:'"Nike TG",Helvetica,Arial,sans-serif',color:'rgb(17,17,17)'}}>Thanks, {receiptData.FIRSTNAME}! We're On It.</span>
                                                              </h1>
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td style={{padding:'0px 0px 20px',textAlign:'center',lineHeight:'26px',fontFamily:'Helvetica,Arial,sans-serif',color:'rgb(109,109,109)'}} align="left">
                                                              <span style={{fontFamily:'Helvetica,Arial,sans-serif'}}>
                                                                Your order's in. We're working to get it packed up and out the door. We may send your order in more than one shipment, and if we do, we'll send a shipping confirmation email as each shipment goes out.
                                                              </span>
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
                                          <tr>
                                            <td bgcolor="#ffffff" align="center" style={{padding:'0px'}}>
                                              <table align="center" width="100%" border={0} cellSpacing="0" cellPadding="0" style={{padding:'0px'}}>
                                                <tbody>
                                                  <tr>
                                                    <td bgcolor="#ffffff" align="center" style={{borderTopWidth:'1px',borderTopStyle:'solid',padding:'0px',borderTopColor:'rgb(229,229,229)'}}>
                                                      <table align="center" width="94%" valign="top" cellPadding="0" cellSpacing="0" border={0} style={{margin:'0px auto',maxWidth:'100%',minWidth:'320px',border:'medium',borderCollapse:'collapse'}} role="presentation">
                                                        <tbody>
                                                          <tr>
                                                            <td style={{textAlign:'center',fontSize:'14px',padding:'20px'}}>
                                                              <table width="100%" role="presentation">
                                                                <tbody>
                                                                  <tr>
                                                                    <td style={{padding:'0px',textAlign:'left',margin:'0px'}} align="left">
                                                                      <span style={{fontSize:'14px',fontFamily:'Helvetica,Arial,sans-serif',lineHeight:'24px',color:'rgb(1,127,7)'}}>Estimated Delivery Date {receiptData.DELIVERY_DATE}</span>
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
                                                  <tr>
                                                    <td bgcolor="" align="center" style={{padding:'0px 0px 40px'}}>
                                                      <div className="m_-2774923715066548899ghostdiv" style={{width:'300px',border:'medium',display:'inline-table',fontSize:'0px',verticalAlign:'top',padding:'0px!important'}}>
                                                        <table className="m_-2774923715066548899container" align="center" width="100%" bgcolor="#FFFFFF" valign="top" border={0} cellPadding="0" cellSpacing="0" style={{fontSize:'16px',margin:'0px',padding:'0px',lineHeight:'1.5',borderCollapse:'collapse',textAlign:'center',color:'white'}} role="presentation">
                                                          <tbody>
                                                            <tr>
                                                              <td>
                                                                <table style={{marginBottom:'10px!important'}}>
                                                                  <tbody>
                                                                    <tr>
                                                                      <td align="center" valign="top" style={{padding:'0px 10px',textAlign:'center',backgroundColor:'rgb(246,244,248)'}}>
                                                                        <img border={0} width="280" height="280" style={{objectFit: 'cover', objectPosition: 'center top', width: '280px', height: '280px', border: 'medium', borderCollapse: 'collapse', display: 'block', padding: '0px', backgroundColor: 'rgb(246, 244, 248)'}} src={receiptData.PRODUCT_IMAGE} alt="" />
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                      <div className="m_-2774923715066548899ghostdiv" style={{width:'280px',border:'medium',display:'inline-table',fontSize:'0px',verticalAlign:'top',padding:'0px!important'}}>
                                                        <table width="100%" bgcolor="#FFFFFF" align="left" valign="top" cellPadding="0" cellSpacing="0" style={{fontSize:'16px',margin:'0px',padding:'0px',lineHeight:'1.5'}} role="presentation">
                                                          <tbody>
                                                            <tr>
                                                              <td style={{padding:'0px 10px'}}>
                                                                <table width="100%" border={0} cellSpacing="0" cellPadding="0" role="presentation">
                                                                  <tbody>
                                                                    <tr>
                                                                      <td valign="top" align="left" style={{fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',color:'rgb(17,17,17)'}}>{receiptData.PRODUCT_NAME}</td>
                                                                      <td valign="top">
                                                                        <table width="100%" border={0} cellSpacing="0" cellPadding="0" role="presentation">
                                                                          <tbody>
                                                                            <tr>
                                                                              <td valign="top" align="right" width="75" style={{whiteSpace:'nowrap',wordBreak:'break-all',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',textAlign:'right',border:'medium',color:'rgb(17,17,17)'}}>{receiptData.PRICE}</td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td valign="top" align="left" style={{padding:'0px 10px',width:'200px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'22px',color:'rgb(109,109,109)'}}>{receiptData.SIZE}</td>
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
                                          <tr>
                                            <td bgcolor="#ffffff" align="center" style={{borderTopWidth:'1px',borderTopStyle:'solid',padding:'0px',borderTopColor:'rgb(229,229,229)'}}>
                                              <table width="94%" style={{margin:'0px auto',minWidth:'320px'}} role="presentation">
                                                <tbody>
                                                  <tr>
                                                    <td align="left" style={{padding:'20px 0px'}}>
                                                      <div className="m_-2774923715066548899ghostdiv" style={{border:'medium',display:'inline-table',fontSize:'0px',verticalAlign:'top',maxWidth:'213px!important',padding:'0px!important'}}>
                                                        <table className="m_-2774923715066548899container" width="233" align="left" valign="top" border={0} cellPadding="0" cellSpacing="0" style={{fontSize:'14px',margin:'0px',padding:'0px',lineHeight:'17px',borderCollapse:'collapse',maxWidth:'213px!important',minWidth:'213px!important',color:'white'}} role="presentation">
                                                          <tbody>
                                                            <tr>
                                                              <td valign="top" align="left" style={{padding:'20px 0px 0px 20px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',fontWeight:'bold',lineHeight:'26px',color:'rgb(17,17,17)'}}>
                                                                Order Number
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td valign="top" align="left" style={{padding:'0px 0px 0px 20px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'26px',color:'rgb(102,102,102)'}}>
                                                                #{receiptData.ORDER_NUMBER}
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                      <div className="m_-2774923715066548899ghostdiv" style={{width:'100%',border:'medium',display:'inline-table',fontSize:'0px',verticalAlign:'top',maxWidth:'363px!important',padding:'0px!important'}}>
                                                        <table className="m_-2774923715066548899container" width="100%" align="left" valign="top" border={0} cellPadding="0" cellSpacing="0" style={{maxWidth:'363px',fontSize:'14px',margin:'0px',padding:'0px',lineHeight:'17px',borderCollapse:'collapse',minWidth:'320px!important',color:'white'}} role="presentation">
                                                          <tbody>
                                                            <tr>
                                                              <td valign="top" width="150" align="left" style={{width:'150px',padding:'20px 0px 0px 20px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',fontWeight:'bold',lineHeight:'26px',color:'rgb(17,17,17)'}}>
                                                                Order Date
                                                              </td>
                                                              <td style={{fontSize:'0px',maxWidth:'40px'}}> </td>
                                                              <td valign="top" width="150" align="left" style={{width:'150px',padding:'20px 0px 0px 20px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',fontWeight:'bold',lineHeight:'26px',color:'rgb(17,17,17)'}}></td>
                                                            </tr>
                                                            <tr>
                                                              <td valign="top" width="150" align="left" style={{padding:'0px 0px 20px 20px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'26px',color:'rgb(102,102,102)'}}>{receiptData.ORDER_DATE}</td>
                                                              <td style={{fontSize:'0px',maxWidth:'40px'}}> </td>
                                                              <td valign="top" width="150" align="left" style={{padding:'0px 0px 20px 20px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'26px',color:'rgb(102,102,102)'}}></td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                      <div className="m_-2774923715066548899ghostdiv" style={{width:'100%',border:'medium',display:'inline-table',fontSize:'0px',verticalAlign:'top',maxWidth:'100%!important',padding:'0px!important'}}>
                                                        <table className="m_-2774923715066548899container" width="100%" align="center" valign="top" border={0} cellPadding="0" cellSpacing="0" style={{maxWidth:'100%',fontSize:'14px',margin:'0px',padding:'0px',lineHeight:'17px',borderCollapse:'collapse',minWidth:'320px!important',color:'white'}} role="presentation">
                                                          <tbody>
                                                            <tr>
                                                              <td align="center" style={{padding:'20px 0px'}}>
                                                                <div style={{lineHeight:'0px',padding:'0px',width:'0px',height:'0px',display:'none!important'}}>
                                                                </div>
                                                                <table className="m_-2774923715066548899button" width="225" align="center" style={{margin:'0px auto',height:'40px',width:'225px',border:'1px solid rgb(141,141,141)',borderRadius:'2px',display:'inline-table'}} role="presentation">
                                                                  <tbody>
                                                                    <tr>
                                                                      <td align="center" height="40" style={{textAlign:'center',height:'40px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'20px',color:'rgb(0,0,0)'}}>
                                                                        &#8204;<a href="#" style={{minWidth:'140px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'15px',textAlign:'center',textDecoration:'none',padding:'10px 40px',border:'1px hidden rgb(255,255,255)',display:'inline-block',color:'rgb(0,0,0)'}} target="_blank">
                                                                          <span style={{fontSize:'14px',lineHeight:'15px',fontFamily:'"Nike TG",Helvetica,Arial,sans-serif',color:'rgb(0,0,0)'}}>
                                                                            Order Status
                                                                          </span>
                                                                        </a>
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
                                          <tr>
                                            <td bgcolor="#ffffff" align="center" style={{borderTopWidth:'1px',borderTopStyle:'solid',padding:'0px',borderTopColor:'rgb(229,229,229)'}}>
                                              <table align="center" width="94%" valign="top" cellPadding="0" cellSpacing="0" border={0} style={{margin:'0px auto',maxWidth:'100%',minWidth:'320px',border:'medium',borderCollapse:'collapse'}} role="presentation">
                                                <tbody>
                                                  <tr>
                                                    <td align="left" valign="middle" style={{padding:'0px 20px',fontSize:'0px'}}>
                                                      <table width="100%" role="presentation">
                                                        <tbody>
                                                          <tr>
                                                            <td align="center" style={{fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',padding:'40px 0px',color:'rgb(109,109,109)'}}>
                                                              <table width="100%" align="center" border={0} cellSpacing="0" cellPadding="0" style={{padding:'0px',margin:'0px',borderCollapse:'collapse',fontFamily:'Helvetica,Arial,sans-serif'}} role="presentation">
                                                                <tbody style={{fontFamily:'Helvetica,Arial,sans-serif'}}>
                                                                  <tr style={{fontFamily:'Helvetica,Arial,sans-serif'}}>
                                                                    <td width="60%" align="left" style={{padding:'10px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',color:'rgb(109,109,109)'}}>Payment</td>
                                                                    <td width="40%" align="right" style={{padding:'10px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',color:'rgb(109,109,109)'}}>**** **** **** {receiptData.CARD_END}</td>
                                                                  </tr>
                                                                  <tr style={{fontFamily:'Helvetica,Arial,sans-serif'}}>
                                                                    <td width="60%" align="left" style={{padding:'10px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',color:'rgb(109,109,109)'}}>Subtotal</td>
                                                                    <td width="40%" align="right" style={{padding:'10px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',color:'rgb(109,109,109)'}}>{receiptData.PRICE}</td>
                                                                  </tr>
                                                                  <tr style={{fontFamily:'Helvetica,Arial,sans-serif'}}>
                                                                    <td width="60%" align="left" style={{padding:'10px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',color:'rgb(109,109,109)'}}>Shipping &amp; Handling</td>
                                                                    <td width="40%" align="right" style={{padding:'10px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',color:'rgb(109,109,109)'}}>{receiptData.CURRENCY}0.00</td>
                                                                  </tr>
                                                                  <tr style={{fontFamily:'Helvetica,Arial,sans-serif'}}>
                                                                    <td width="60%" align="left" style={{padding:'10px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',color:'rgb(109,109,109)'}}>Estimated Tax</td>
                                                                    <td width="40%" align="right" style={{padding:'10px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'14px',lineHeight:'24px',color:'rgb(109,109,109)'}}>{receiptData.CURRENCY}10.46</td>
                                                                  </tr>
                                                                  <tr style={{fontFamily:'Helvetica,Arial,sans-serif'}}>
                                                                    <td width="60%" align="left" style={{padding:'10px 0px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'18px',lineHeight:'30px',color:'rgb(17,17,17)'}}>Total</td>
                                                                    <td width="40%" align="right" style={{padding:'10px 0px 0px',fontFamily:'Helvetica,Arial,sans-serif',fontSize:'18px',lineHeight:'30px',color:'rgb(17,17,17)'}}>{receiptData.TOTAL}</td>
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
                                  {/* Footer sections continue with same structure but omitted for brevity */}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className="m_-2774923715066548899sidebar" style={{fontSize:'0px',lineHeight:'1px',overflow:'hidden!important'}}> </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </center>
      </body>
    </html>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (id && typeof id === 'string') {
    try {
      const receipt = await getReceiptData(id);
      
      if (receipt && receipt.receipt_type === 'nike') {
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

export default NikeReceiptPage;