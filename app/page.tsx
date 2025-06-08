"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppleReceiptForm } from "@/components/receipts/AppleReceiptForm";
import { BalenciagaReceiptForm } from "@/components/receipts/BalenciagaReceiptForm";
import { BapeReceiptForm } from "@/components/receipts/BapeReceiptForm";
import { DiorReceiptForm } from "@/components/receipts/DiorReceiptForm";
import { NikeReceiptForm } from "@/components/receipts/NikeReceiptForm";
import { GoatReceiptForm } from "@/components/receipts/GoatReceiptForm";
import  FarfetchReceiptForm  from "@/components/receipts/FarfetchReceiptForm";
import GalleryDeptReceiptForm from "@/components/receipts/GalleryDeptReceiptForm";
import { GrailedReceiptForm } from "@/components/receipts/GrailedReceiptForm";
import { LVReceiptForm } from "@/components/receipts/LVReceiptForm";
import { MonclerReceiptForm } from "@/components/receipts/MonclerReceiptForm";
import { NorthFaceReceiptForm } from "@/components/receipts/NorthFaceReceiptForm";
import { 
  AppleReceiptData, 
  BalenciagaReceiptData, 
  BapeReceiptData, 
  DiorReceiptData, 
  NikeReceiptData,
  GoatReceiptData,
  FarfetchReceiptData,
  GalleryDeptReceiptData,
  GrailedReceiptData,
  LVReceiptData,
  MonclerReceiptData,
  NorthFaceReceiptData,
  ReceiptType 
} from "@/types/receipt-types";

export default function Home() {
  const router = useRouter();
  const [selectedReceiptType, setSelectedReceiptType] = useState<ReceiptType>('apple');
  
  const [appleReceiptData, setAppleReceiptData] = useState<AppleReceiptData>({
    ORDER_NUMBER: "W1234567890",
    ORDER_DATE: "30 November 2024",
    PRODUCT_IMAGE: "/apple/apple_files/product-image.png",
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
  });

  const [balenciagaReceiptData, setBalenciagaReceiptData] = useState<BalenciagaReceiptData>({
    FIRSTNAME: "John",
    ORDER_NUMBER: "BAL123456789",
    PRODUCT_IMAGE: "/balenciaga/balenciaga_files/product-image.jpg",
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
  });

  const [bapeReceiptData, setBapeReceiptData] = useState<BapeReceiptData>({
    ORDER_NUMBER: "BAPEUK0012345",
    PRODUCT_IMAGE: "/bape/Thank you for your purchase!_files/IMAGE",
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
    CARD_ENDING: "1234",
  });

  const [diorReceiptData, setDiorReceiptData] = useState<DiorReceiptData>({
    ORDER_NUMBER: "469216300",
    ORDER_DATE: "December 1, 2024",
    CUSTOMER_NAME: "John Doe",
    CUSTOMER_EMAIL: "john.doe@example.com",
    PRODUCT_IMAGE: "./dior/dior_files/PRODUCT_IMAGE",
    PRODUCT_NAME: "B23 High-Top Sneaker",
    PRODUCT_REFERENCE: "3SN272ZIR_H069",
    PRODUCT_PRICE: "€ 1,200.00",
    QUANTITY: "1",
    SUBTOTAL: "€ 1,200.00",
    SHIPPING_COST: "Free",
    TAX_AMOUNT: "€ 200.00",
    TOTAL_AMOUNT: "€ 1,200.00",
    SHIPPING_ADDRESS_1: "John Doe",
    SHIPPING_ADDRESS_2: "123 Luxury Avenue",
    SHIPPING_ADDRESS_3: "Paris 75001",
    SHIPPING_ADDRESS_4: "France",
    BILLING_ADDRESS_1: "John Doe",
    BILLING_ADDRESS_2: "123 Luxury Avenue",
    BILLING_ADDRESS_3: "Paris 75001",
    BILLING_ADDRESS_4: "France",
    PAYMENT_METHOD: "Visa",
    CARD_ENDING: "1234"
  });

  const [nikeReceiptData, setNikeReceiptData] = useState<NikeReceiptData>({
    WHOLE_NAME: "John Smith",
    ADDRESS1: "123 Main Street",
    ADDRESS2: "London",
    ADDRESS3: "SW1A 1AA, United Kingdom",
    FIRSTNAME: "John",
    DELIVERY_DATE: "Monday, December 2, 2024",
    PRODUCT_IMAGE: "/nike/nike_files/product-image.jpg",
    PRODUCT_NAME: "Air Max 270 React",
    PRICE: "£120.00",
    SIZE: "UK 9",
    ORDER_NUMBER: "N123456789",
    ORDER_DATE: "November 30, 2024",
    CARD_END: "1234",
    CURRENCY: "£",
    TOTAL: "£120.00"
  });

  const [goatReceiptData, setGoatReceiptData] = useState<GoatReceiptData>({
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
  });

  const [farfetchReceiptData, setFarfetchReceiptData] = useState<FarfetchReceiptData>({
    FIRSTNAME: "John",
    ORDERNUMBER: "FF123456789",
    DELIVERY: "December 5, 2024",
    PRODUCT_IMAGE: "/farfetch/farfetch_files/PRODUCT_IMAGE",
    BRAND: "Balenciaga",
    FULLNAME: "Triple S Sneakers",
    PRODUCT_PRICE: "€ 1,050",
    SHIPPING_COST: "Free",
    TAX_AMOUNT: "€ 200.00",
    TOTAL_AMOUNT: "€ 1,050.00",
    SHIPPING_ADDRESS_1: "John Doe",
    SHIPPING_ADDRESS_2: "123 Luxury Avenue",
    SHIPPING_ADDRESS_3: "Paris 75001",
    SHIPPING_ADDRESS_4: "France",
    BILLING_ADDRESS_1: "John Doe",
    BILLING_ADDRESS_2: "123 Luxury Avenue",
    BILLING_ADDRESS_3: "Paris 75001",
    BILLING_ADDRESS_4: "France",
    PAYMENT_METHOD: "Visa",
    CARD_ENDING: "1234"
  });

  const [galleryDeptReceiptData, setGalleryDeptReceiptData] = useState<GalleryDeptReceiptData>({
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
  });

  const [grailedReceiptData, setGrailedReceiptData] = useState<GrailedReceiptData>({
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
  });

  const [lvReceiptData, setLVReceiptData] = useState<LVReceiptData>({
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
  });

  const [monclerReceiptData, setMonclerReceiptData] = useState<MonclerReceiptData>({
    FIRST_NAME: "John",
    ORDER_NUMBER: "MCL123456789",
    DATE: "December 1, 2024",
    PRODUCT_IMAGE: "/moncler/moncler_files/product-image.jpg",
    PRODUCT_NAME: "Maya Down Jacket",
    PRODUCT_PRICE: "€1,395.00",
    SIZE: "L",
    COLOR: "Black",
    QUANTITY: "1",
    SUBTOTAL: "€1,395.00",
    SHIPPING_COST: "Free",
    TAX_AMOUNT: "€232.50",
    TOTAL_AMOUNT: "€1,395.00",
    SHIPPING_ADDRESS_1: "John Doe",
    SHIPPING_ADDRESS_2: "123 Luxury Avenue",
    SHIPPING_ADDRESS_3: "Paris 75001",
    SHIPPING_ADDRESS_4: "France",
    BILLING_ADDRESS_1: "John Doe",
    BILLING_ADDRESS_2: "123 Luxury Avenue",
    BILLING_ADDRESS_3: "Paris 75001",
    BILLING_ADDRESS_4: "France",
    PAYMENT_METHOD: "Visa",
    CARD_ENDING: "1234"
  });

  const [northFaceReceiptData, setNorthFaceReceiptData] = useState<NorthFaceReceiptData>({
    CUSTOMER_NAME: "Paul Harris",
    ORDER_NUMBER: "73442336",
    ORDER_DATE: "15/9/2023",
    PRODUCT_IMAGE: "/northface/northface_files/product-image.jpg",
    PRODUCT_NAME: "Men's 1996 Retro Nuptse Jacket",
    PRODUCT_COLOR: "Lunar Slate-TNF Black",
    PRODUCT_SIZE: "L",
    PRODUCT_PRICE: "£300.00",
    QUANTITY: "1",
    SUBTOTAL: "£300.00",
    SHIPPING_COST: "£0.00",
    TOTAL_AMOUNT: "£300.00",
    SHIPPING_ADDRESS_1: "Paul Harris",
    SHIPPING_ADDRESS_2: "56465 Block Rue North Felicitamouth",
    SHIPPING_ADDRESS_3: "JC2 2SR, Great Britain",
    SHIPPING_ADDRESS_4: "",
    PAYMENT_METHOD: "Credit Card",
    SHIPPING_METHOD: "DHL - Standard delivery"
  });

  // Input change handlers
  const handleAppleInputChange = (field: keyof AppleReceiptData, value: string) => {
    setAppleReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleBalenciagaInputChange = (field: keyof BalenciagaReceiptData, value: string) => {
    setBalenciagaReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleBapeInputChange = (field: keyof BapeReceiptData, value: string) => {
    setBapeReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleDiorInputChange = (field: keyof DiorReceiptData, value: string) => {
    setDiorReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleNikeInputChange = (field: keyof NikeReceiptData, value: string) => {
    setNikeReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoatInputChange = (field: keyof GoatReceiptData, value: string) => {
    setGoatReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleFarfetchInputChange = (field: keyof FarfetchReceiptData, value: string) => {
    setFarfetchReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleGalleryDeptInputChange = (field: keyof GalleryDeptReceiptData, value: string) => {
    setGalleryDeptReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleGrailedInputChange = (field: keyof GrailedReceiptData, value: string) => {
  setGrailedReceiptData(prev => ({ ...prev, [field]: value }));
};

const handleLVInputChange = (field: keyof LVReceiptData, value: string) => {
  setLVReceiptData(prev => ({ ...prev, [field]: value }));
};

  const handleMonclerInputChange = (field: keyof MonclerReceiptData, value: string) => {
    setMonclerReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleNorthFaceInputChange = (field: keyof NorthFaceReceiptData, value: string) => {
    setNorthFaceReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const calculateAppleTotal = () => {
    const price = parseFloat(appleReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, ''));
    const shipping = appleReceiptData.SHIPPING_COST.toLowerCase() === 'free' ? 0 : parseFloat(appleReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ''));
    const total = price + shipping;
    return `£${total.toFixed(2)}`;
  };

  const updateAppleTotal = () => {
    const newTotal = calculateAppleTotal();
    setAppleReceiptData(prev => ({ ...prev, ORDER_TOTAL: newTotal }));
  };

  const generateReceipt = () => {
    if (selectedReceiptType === 'apple') {
      localStorage.setItem('appleReceiptData', JSON.stringify(appleReceiptData));
      router.push('/apple-receipt');
    } else if (selectedReceiptType === 'balenciaga') {
      localStorage.setItem('balenciagaReceiptData', JSON.stringify(balenciagaReceiptData));
      router.push('/balenciaga-receipt');
    } else if (selectedReceiptType === 'bape') {
      localStorage.setItem('bapeReceiptData', JSON.stringify(bapeReceiptData));
      router.push('/bape-receipt');
    } else if (selectedReceiptType === 'dior') {
      localStorage.setItem('diorReceiptData', JSON.stringify(diorReceiptData));
      router.push('/dior-receipt');
    } else if (selectedReceiptType === 'nike') {
      localStorage.setItem('nikeReceiptData', JSON.stringify(nikeReceiptData));
      router.push('/nike-receipt');
    } else if (selectedReceiptType === 'goat') {
      localStorage.setItem('goatReceiptData', JSON.stringify(goatReceiptData));
      router.push('/goat-receipt');
    } else if (selectedReceiptType === 'farfetch') {
      localStorage.setItem('farfetchReceiptData', JSON.stringify(farfetchReceiptData));
      router.push('/farfetch-receipt');
    } else if (selectedReceiptType === 'gallery_dept') {
      localStorage.setItem('galleryDeptReceiptData', JSON.stringify(galleryDeptReceiptData));
      router.push('/gallery-dept-receipt');
    } else if (selectedReceiptType === 'grailed') {
      localStorage.setItem('grailedReceiptData', JSON.stringify(grailedReceiptData));
      router.push('/grailed-receipt');
    } else if (selectedReceiptType === 'lv') {
      localStorage.setItem('lvReceiptData', JSON.stringify(lvReceiptData));
      router.push('/lv-receipt');
    } else if (selectedReceiptType === 'moncler') {
      localStorage.setItem('monclerReceiptData', JSON.stringify(monclerReceiptData));
      router.push('/moncler-receipt');
    } else if (selectedReceiptType === 'northface') {
      localStorage.setItem('northfaceReceiptData', JSON.stringify(northFaceReceiptData));
      router.push('/northface-receipt');
    }
  };

  // Get the appropriate icon for each brand (using actual logos from their folders)
  const getBrandIcon = (brand: ReceiptType) => {
    switch (brand) {
      case 'apple':
        return (
          <img src="/apple/apple_files/apple_icon_2x.png" alt="Apple" className="w-12 h-12 object-contain" />
        );
      case 'balenciaga':
        return (
          <img src="/balenciaga/balenciaga_files/balenciaga-logo.png" alt="Balenciaga" className="w-12 h-12 object-contain" />
        );
      case 'bape':
        return (
          <img src="/bape/bape_files/bape-logo.png" alt="BAPE" className="w-12 h-12 object-contain" />
        );
      case 'dior':
        return (
          <img src="/dior/dior_files/cart.png" alt="Dior" className="w-12 h-12 object-contain" />
        );
      case 'nike':
        return (
          <img src="/nike/nike_files/Swoosh2x.png" alt="Nike" className="w-12 h-12 object-contain" />
        );
      case 'goat':
        return (
          <img src="/goat/goat_files/GOATLogo2022.png" alt="GOAT" className="w-12 h-12 object-contain" />
        );
      case 'farfetch':
        return (
          <img src="/farfetch/farfetch_files/farfetch-logo.png" alt="Farfetch" className="w-12 h-12 object-contain" />
        );
      case 'gallery_dept':
        return (
          <img src="/gallery_dept/gallery_dept_files/gallery-dept-logo.png" alt="Gallery Dept" className="w-12 h-12 object-contain" />
        );
      case 'grailed':
        return (
          <img src="/grailed/grailed_files/logo-no-whitespace.jpg" alt="Grailed" className="w-12 h-12 object-contain" />
        );
      case 'lv':
        return (
          <img src="/lv/lv_files/lv_logo.png" alt="Louis Vuitton" className="w-12 h-12 object-contain" />
        );
      case 'moncler':
        return (
          <img src="/moncler/moncler_files/moncler-logo.png" alt="Moncler" className="w-12 h-12 object-contain" />
        );
      case 'northface':
        return (
          <img src="/northface/northface_files/northface-logo.png" alt="The North Face" className="w-12 h-12 object-contain" />
        );
      default:
        return (
          <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        );
    }
  };

  const renderReceiptForm = () => {
    switch (selectedReceiptType) {
      case 'apple':
        return (
          <AppleReceiptForm 
            data={appleReceiptData} 
            onInputChange={handleAppleInputChange} 
          />
        );
      case 'balenciaga':
        return (
          <BalenciagaReceiptForm 
            data={balenciagaReceiptData} 
            onInputChange={handleBalenciagaInputChange} 
          />
        );
      case 'bape':
        return (
          <BapeReceiptForm 
            data={bapeReceiptData} 
            onInputChange={handleBapeInputChange} 
          />
        );
      case 'dior':
        return (
          <DiorReceiptForm 
            data={diorReceiptData} 
            onInputChange={handleDiorInputChange} 
          />
        );
      case 'nike':
        return (
          <NikeReceiptForm 
            data={nikeReceiptData} 
            onInputChange={handleNikeInputChange} 
          />
        );
      case 'goat':
        return (
          <GoatReceiptForm 
            data={goatReceiptData} 
            onInputChange={handleGoatInputChange} 
          />
        );
      case 'farfetch':
        return (
          <FarfetchReceiptForm 
            data={farfetchReceiptData} 
            onInputChange={handleFarfetchInputChange} 
          />
        );
      case 'gallery_dept':
        return (
          <GalleryDeptReceiptForm 
            data={galleryDeptReceiptData} 
            onInputChange={handleGalleryDeptInputChange} 
          />
        );
      case 'grailed':
        return (
          <GrailedReceiptForm 
            data={grailedReceiptData} 
            onInputChange={handleGrailedInputChange} 
          />
        );
      case 'lv':
        return (
          <LVReceiptForm 
            data={lvReceiptData} 
            onInputChange={handleLVInputChange} 
          />
        );
      case 'moncler':
        return (
          <MonclerReceiptForm 
            data={monclerReceiptData} 
            onInputChange={handleMonclerInputChange} 
          />
        );
      case 'northface':
        return (
          <NorthFaceReceiptForm 
            data={northFaceReceiptData} 
            onInputChange={handleNorthFaceInputChange} 
          />
        );
      default:
        return <div>Select a receipt type</div>;
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">StyleHaaven Receipt Generator</h1>
          <p className="text-lg text-gray-600">Create authentic-looking receipts with custom details</p>
        </div>

        {/* Receipt Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-md">
            <div className="flex space-x-1 sm:space-x-2">
              {(['apple', 'balenciaga', 'bape', 'dior', 'nike', 'goat', 'farfetch', 'gallery_dept', 'grailed', 'lv', 'moncler', 'northface'] as ReceiptType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedReceiptType(type)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-md font-medium transition-all text-xs sm:text-sm ${
                    selectedReceiptType === type
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="capitalize">{type === 'northface' ? 'North Face' : type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {selectedReceiptType === 'northface' ? 'North Face' : selectedReceiptType.charAt(0).toUpperCase() + selectedReceiptType.slice(1)} Receipt Details
            </h2>
            
            {renderReceiptForm()}
          </div>

          {/* Preview/Action Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  {getBrandIcon(selectedReceiptType)}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {selectedReceiptType === 'northface' ? 'North Face' : selectedReceiptType.charAt(0).toUpperCase() + selectedReceiptType.slice(1)} Receipt
                </h3>
                <p className="text-gray-600 mb-6">
                  Generate a {selectedReceiptType === 'northface' ? 'North Face' : selectedReceiptType} order confirmation.
                </p>
                
                <Button
                  onClick={generateReceipt}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate {selectedReceiptType === 'northface' ? 'North Face' : selectedReceiptType.charAt(0).toUpperCase() + selectedReceiptType.slice(1)} Receipt
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {selectedReceiptType === 'apple' && (
                  <Button
                    onClick={updateAppleTotal}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 01-2-2V5a2 2 0 012-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calculate Total
                  </Button>
                )}
                {selectedReceiptType === 'dior' && (
                  <Button
                    onClick={() => {
                      setDiorReceiptData(prev => ({ ...prev, SUBTOTAL: prev.PRODUCT_PRICE, TOTAL_AMOUNT: prev.PRODUCT_PRICE }));
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 01-2-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Sync Pricing
                  </Button>
                )}
                {selectedReceiptType === 'bape' && (
                  <Button
                    onClick={() => {
                      const price = parseFloat(bapeReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, ''));
                      const shipping = parseFloat(bapeReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ''));
                      const total = price + shipping;
                      setBapeReceiptData(prev => ({ ...prev, ORDER_TOTAL_CURRENCY: `£${total.toFixed(2)} GBP` }));
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calculate Total
                  </Button>
                )}
                {selectedReceiptType === 'goat' && (
                  <Button
                    onClick={() => {
                      const price = parseFloat(goatReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, ''));
                      const shipping = parseFloat(goatReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ''));
                      const tax = parseFloat(goatReceiptData.TAX_AMOUNT.replace(/[£$,€]/g, ''));
                      const total = price + shipping + tax;
                      setGoatReceiptData(prev => ({ ...prev, TOTAL_AMOUNT: `$${total.toFixed(2)}` }));
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calculate Total
                  </Button>
                )}
                {selectedReceiptType === 'farfetch' && (
                  <Button
                    onClick={() => {
                      setFarfetchReceiptData(prev => ({ ...prev, TOTAL_AMOUNT: prev.PRODUCT_PRICE }));
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Sync Pricing
                  </Button>
                )}
                {selectedReceiptType === 'gallery_dept' && (
                  <Button
                    onClick={() => {
                      const price = parseFloat(galleryDeptReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, ''));
                      const shipping = parseFloat(galleryDeptReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ''));
                      const tax = parseFloat(galleryDeptReceiptData.TAX_AMOUNT.replace(/[£$,€]/g, ''));
                      const total = price + shipping + tax;
                      setGalleryDeptReceiptData(prev => ({ ...prev, TOTAL_AMOUNT: `$${total.toFixed(2)}` }));
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calculate Total
                  </Button>
                )}
                {selectedReceiptType === 'grailed' && (
                  <Button
                    onClick={() => {
                      const soldPrice = parseFloat(grailedReceiptData.SOLD_PRICE.replace(/[£$,€]/g, ''));
                      const tax = parseFloat(grailedReceiptData.TAX_AMOUNT.replace(/[£$,€]/g, ''));
                      const total = soldPrice + tax;
                      setGrailedReceiptData(prev => ({ ...prev, TOTAL_AMOUNT: `€${total.toFixed(2)}` }));
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calculate Total
                  </Button>
                )}
                {selectedReceiptType === 'lv' && (
                  <Button
                    onClick={() => {
                      setLVReceiptData(prev => ({ ...prev, PRODUCT_PRICE: prev.PRODUCT_PRICE }));
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Sync Pricing
                  </Button>
                )}
                {selectedReceiptType === 'moncler' && (
                  <Button
                    onClick={() => {
                      setMonclerReceiptData(prev => ({ ...prev, SUBTOTAL: prev.PRODUCT_PRICE, TOTAL_AMOUNT: prev.PRODUCT_PRICE }));
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 01-2-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Sync Pricing
                  </Button>
                )}
                {selectedReceiptType === 'northface' && (
                  <Button
                    onClick={() => {
                      setNorthFaceReceiptData(prev => ({ ...prev, SUBTOTAL: prev.PRODUCT_PRICE, TOTAL_AMOUNT: prev.PRODUCT_PRICE }));
                    }}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 01-2-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Sync Pricing
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}
