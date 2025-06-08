import React, { useState, useEffect } from "react";
import Head from "next/head";

interface StussyReceiptProps {
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

const defaultProps: StussyReceiptProps = {
  ORDER_NUMBER: "STU123456789",
  ORDER_DATE: "December 1, 2024",
  CUSTOMER_NAME: "John Doe",
  CUSTOMER_EMAIL: "john.doe@example.com",
  PRODUCT_IMAGE: "/stussy/stussy_files/product-image.jpg",
  PRODUCT_NAME: "Stussy 8 Ball Tee",
  PRODUCT_SIZE: "L",
  PRODUCT_COLOR: "Black",
  PRODUCT_PRICE: "$50.00",
  QUANTITY: "1",
  SUBTOTAL: "$50.00",
  SHIPPING_COST: "$10.00",
  TAX_AMOUNT: "$5.00",
  TOTAL_AMOUNT: "$65.00",
  SHIPPING_ADDRESS_1: "John Doe",
  SHIPPING_ADDRESS_2: "123 Main Street",
  SHIPPING_ADDRESS_3: "Los Angeles, CA 90001",
  SHIPPING_ADDRESS_4: "United States",
  PAYMENT_METHOD: "Visa",
  CARD_ENDING: "1234"
};

const StussyReceiptPage: React.FC = () => {
  const [receiptData, setReceiptData] = useState<StussyReceiptProps>(defaultProps);

  useEffect(() => {
    const storedData = localStorage.getItem('stussyReceiptData');
    if (storedData) {
      try {
        setReceiptData(JSON.parse(storedData));
      } catch (e) {}
    }
  }, []);

  return (
    <>
      <Head>
        <title>Stussy - Order Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="email-container" style={{maxWidth:600,margin:"0 auto",background:"#fff",fontFamily:"Helvetica Neue,Helvetica,Arial,sans-serif"}}>
        <div style={{background:"#000",padding:"30px 0",textAlign:"center"}}>
          <span style={{color:"#fff",fontSize:36,fontWeight:900,letterSpacing:8,textTransform:"uppercase"}}>STÜSSY</span>
        </div>
        <div style={{padding:40}}>
          <h1 style={{fontSize:24,fontWeight:700,color:"#000",marginBottom:10,textAlign:"center",textTransform:"uppercase",letterSpacing:2}}>Order Confirmed</h1>
          <p style={{fontSize:14,color:"#666",textAlign:"center",marginBottom:30}}>Thank you for your Stussy order</p>
          <div style={{background:"#f8f8f8",padding:20,marginBottom:30,borderLeft:"4px solid #000"}}>
            <h3 style={{fontSize:16,fontWeight:700,color:"#000",marginBottom:15,textTransform:"uppercase"}}>Order Information</h3>
            <p><strong>Order Number:</strong> {receiptData.ORDER_NUMBER}</p>
            <p><strong>Order Date:</strong> {receiptData.ORDER_DATE}</p>
            <p><strong>Customer:</strong> {receiptData.CUSTOMER_NAME}</p>
            <p><strong>Email:</strong> {receiptData.CUSTOMER_EMAIL}</p>
          </div>
          <div style={{display:"flex",marginBottom:30,padding:20,border:"2px solid #000",background:"#fff"}}>
            <img src={receiptData.PRODUCT_IMAGE} alt={receiptData.PRODUCT_NAME} style={{width:120,height:120,objectFit:"cover",marginRight:20,border:"1px solid #ddd"}} />
            <div style={{flex:1}}>
              <h4 style={{fontSize:18,fontWeight:700,color:"#000",marginBottom:10,textTransform:"uppercase"}}>{receiptData.PRODUCT_NAME}</h4>
              <p><strong>Size:</strong> {receiptData.PRODUCT_SIZE}</p>
              <p><strong>Color:</strong> {receiptData.PRODUCT_COLOR}</p>
              <p><strong>Quantity:</strong> {receiptData.QUANTITY}</p>
              <p style={{fontSize:18,fontWeight:700,color:"#000"}}>{receiptData.PRODUCT_PRICE}</p>
            </div>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",margin:"20px 0",border:"2px solid #000"}}>
            <tbody>
              <tr>
                <td style={{padding:"12px 15px",borderBottom:"1px solid #ddd",fontSize:14,textAlign:"left",color:"#333",fontWeight:600,textTransform:"uppercase"}}>Subtotal:</td>
                <td style={{padding:"12px 15px",borderBottom:"1px solid #ddd",fontSize:14,textAlign:"right",fontWeight:700,color:"#000"}}>{receiptData.SUBTOTAL}</td>
              </tr>
              <tr>
                <td style={{padding:"12px 15px",borderBottom:"1px solid #ddd",fontSize:14,textAlign:"left",color:"#333",fontWeight:600,textTransform:"uppercase"}}>Shipping:</td>
                <td style={{padding:"12px 15px",borderBottom:"1px solid #ddd",fontSize:14,textAlign:"right",fontWeight:700,color:"#000"}}>{receiptData.SHIPPING_COST}</td>
              </tr>
              <tr>
                <td style={{padding:"12px 15px",borderBottom:"1px solid #ddd",fontSize:14,textAlign:"left",color:"#333",fontWeight:600,textTransform:"uppercase"}}>Tax:</td>
                <td style={{padding:"12px 15px",borderBottom:"1px solid #ddd",fontSize:14,textAlign:"right",fontWeight:700,color:"#000"}}>{receiptData.TAX_AMOUNT}</td>
              </tr>
              <tr style={{background:"#000",color:"#fff",fontSize:16,fontWeight:700}}>
                <td style={{padding:"12px 15px",borderBottom:"none",color:"#fff"}}><strong>Total:</strong></td>
                <td style={{padding:"12px 15px",borderBottom:"none",color:"#fff"}}><strong>{receiptData.TOTAL_AMOUNT}</strong></td>
              </tr>
            </tbody>
          </table>
          <div style={{background:"#f8f8f8",padding:20,margin:"30px 0",borderLeft:"4px solid #000"}}>
            <h4 style={{fontSize:16,fontWeight:700,marginBottom:10,color:"#000",textTransform:"uppercase"}}>Shipping Address</h4>
            <p>{receiptData.SHIPPING_ADDRESS_1}</p>
            <p>{receiptData.SHIPPING_ADDRESS_2}</p>
            <p>{receiptData.SHIPPING_ADDRESS_3}</p>
            <p>{receiptData.SHIPPING_ADDRESS_4}</p>
          </div>
          <div style={{background:"#f8f8f8",padding:20,margin:"30px 0",borderLeft:"4px solid #000"}}>
            <h4 style={{fontSize:16,fontWeight:700,marginBottom:10,color:"#000",textTransform:"uppercase"}}>Payment Information</h4>
            <p><strong>Payment Method:</strong> {receiptData.PAYMENT_METHOD} ending in {receiptData.CARD_ENDING}</p>
          </div>
          <div style={{background:"#000",color:"#fff",padding:20,margin:"20px 0",textAlign:"center",fontWeight:700,textTransform:"uppercase",letterSpacing:2}}>Thank you for supporting Stussy</div>
        </div>
        <div style={{textAlign:"center",padding:30,background:"#000",color:"#fff"}}>
          <p style={{margin:0,fontSize:12,opacity:0.9}}>© 2024 Stussy. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default StussyReceiptPage;