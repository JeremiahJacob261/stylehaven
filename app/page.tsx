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
import { SupremeReceiptForm } from "@/components/receipts/SupremeReceiptForm";
import { TrapstarReceiptForm } from "@/components/receipts/TrapstarReceiptForm";
import { StussyReceiptForm } from "@/components/receipts/StussyReceiptForm";
import { YzyGapReceiptForm } from "@/components/receipts/YzyGapReceiptForm";
import { StockXReceiptForm } from "@/components/receipts/StockXReceiptForm";
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
  SupremeReceiptData,
  TrapstarReceiptData,
  StussyReceiptData,
  YzyGapReceiptData,
  StockXReceiptData,
  ReceiptType 
} from "@/types/receipt-types";

export default function Home() {
  const router = useRouter();
  const [selectedReceiptType, setSelectedReceiptType] = useState<ReceiptType>('apple');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Receipt type options with labels and categories
  const receiptTypes = [
    { value: 'apple', label: 'Apple', category: 'Tech', icon: '🍎' },
    { value: 'nike', label: 'Nike', category: 'Sneakers', icon: '✓' },
    { value: 'goat', label: 'GOAT', category: 'Sneakers', icon: '🐐' },
    { value: 'stockx', label: 'StockX', category: 'Sneakers', icon: '📈' },
    { value: 'balenciaga', label: 'Balenciaga', category: 'Luxury', icon: '👑' },
    { value: 'dior', label: 'Dior', category: 'Luxury', icon: '💎' },
    { value: 'lv', label: 'Louis Vuitton', category: 'Luxury', icon: '🛍️' },
    { value: 'moncler', label: 'Moncler', category: 'Luxury', icon: '🧥' },
    { value: 'farfetch', label: 'Farfetch', category: 'Fashion', icon: '🌟' },
    { value: 'bape', label: 'BAPE', category: 'Streetwear', icon: '🦍' },
    { value: 'supreme', label: 'Supreme', category: 'Streetwear', icon: '🔴' },
    { value: 'trapstar', label: 'Trapstar', category: 'Streetwear', icon: '⭐' },
    { value: 'stussy', label: 'Stüssy', category: 'Streetwear', icon: '🌊' },
    { value: 'yzygap', label: 'YZY GAP', category: 'Streetwear', icon: '🎨' },
    { value: 'gallery_dept', label: 'Gallery Dept', category: 'Streetwear', icon: '🎭' },
    { value: 'northface', label: 'North Face', category: 'Outdoor', icon: '⛰️' },
    { value: 'grailed', label: 'Grailed', category: 'Marketplace', icon: '🔥' },
  ] as const;

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

  const [supremeReceiptData, setSupremeReceiptData] = useState<SupremeReceiptData>({
    ORDER_NUMBER: "SUP123456789",
    ORDER_DATE: "December 1, 2024",
    CUSTOMER_NAME: "John Doe",
    CUSTOMER_EMAIL: "john.doe@example.com",
    PRODUCT_IMAGE: "/supreme/supreme_files/product-image.jpg",
    PRODUCT_NAME: "Supreme Box Logo Hoodie",
    PRODUCT_SIZE: "Large",
    PRODUCT_COLOR: "Red",
    PRODUCT_PRICE: "$158.00",
    QUANTITY: "1",
    SUBTOTAL: "$158.00",
    SHIPPING_COST: "$10.00",
    TAX_AMOUNT: "$15.80",
    TOTAL_AMOUNT: "$183.80",
    SHIPPING_ADDRESS_1: "John Doe",
    SHIPPING_ADDRESS_2: "123 Main Street",
    SHIPPING_ADDRESS_3: "New York, NY 10001",
    SHIPPING_ADDRESS_4: "United States",
    PAYMENT_METHOD: "Visa",
    CARD_ENDING: "1234"
  });

  const [trapstarReceiptData, setTrapstarReceiptData] = useState<TrapstarReceiptData>({
    ORDER_NUMBER: "TS123456789",
    ORDER_DATE: "December 1, 2024",
    CUSTOMER_NAME: "John Doe",
    CUSTOMER_EMAIL: "john.doe@example.com",
    PRODUCT_IMAGE: "/trapstar/trapstar_files/product-image.jpg",
    PRODUCT_NAME: "Trapstar Hoodie",
    PRODUCT_SIZE: "Large",
    PRODUCT_COLOR: "Black",
    PRODUCT_PRICE: "£120.00",
    QUANTITY: "1",
    SUBTOTAL: "£120.00",
    SHIPPING_COST: "£5.00",
    TAX_AMOUNT: "£20.00",
    TOTAL_AMOUNT: "£125.00",
    SHIPPING_ADDRESS_1: "John Doe",
    SHIPPING_ADDRESS_2: "123 Main Street",
    SHIPPING_ADDRESS_3: "London W1K 5AB",
    SHIPPING_ADDRESS_4: "United Kingdom",
    PAYMENT_METHOD: "Visa",
    CARD_ENDING: "1234"
  });

  const [stussyReceiptData, setStussyReceiptData] = useState<StussyReceiptData>({
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
  });

  const [yzygapReceiptData, setYzyGapReceiptData] = useState<YzyGapReceiptData>({
    ORDER_NUMBER: "YZY123456789",
    ORDER_DATE: "December 1, 2024",
    CUSTOMER_NAME: "John Doe",
    CUSTOMER_EMAIL: "john.doe@example.com",
    PRODUCT_IMAGE: "/yzygap/yzygap_files/product-image.jpg",
    PRODUCT_NAME: "YZY GAP Hoodie",
    PRODUCT_SIZE: "M",
    PRODUCT_COLOR: "Blue",
    PRODUCT_PRICE: "$120.00",
    QUANTITY: "1",
    SUBTOTAL: "$120.00",
    SHIPPING_COST: "$15.00",
    TAX_AMOUNT: "$10.00",
    TOTAL_AMOUNT: "$145.00",
    SHIPPING_ADDRESS_1: "John Doe",
    SHIPPING_ADDRESS_2: "123 Main Street",
    SHIPPING_ADDRESS_3: "Chicago, IL 60601",
    SHIPPING_ADDRESS_4: "United States",
    PAYMENT_METHOD: "Mastercard",
    CARD_ENDING: "5678"
  });

  const [stockxReceiptData, setStockxReceiptData] = useState<StockXReceiptData>({
    ORDER_NUMBER: "STX123456789",
    ORDER_DATE: "December 1, 2024",
    CUSTOMER_NAME: "John Doe",
    CUSTOMER_EMAIL: "john.doe@example.com",
    PRODUCT_IMAGE: "/stockx/stockx_files/product-image.jpg",
    PRODUCT_NAME: "Air Jordan 1 Retro High OG",
    PRODUCT_SIZE: "US 10",
    PRODUCT_PRICE: "$285.00",
    SHIPPING_COST: "$13.95",
    TAX_AMOUNT: "$25.00",
    TOTAL_AMOUNT: "$323.95",
    TRACKING_NUMBER: "1Z999AA1234567890",
    ESTIMATED_DELIVERY: "December 5, 2024",
    SHIPPING_ADDRESS_1: "John Doe",
    SHIPPING_ADDRESS_2: "123 Main Street",
    SHIPPING_ADDRESS_3: "New York, NY 10001",
    SHIPPING_ADDRESS_4: "United States",
    PAYMENT_METHOD: "Visa",
    CARD_ENDING: "1234",
    ORDER_STATUS: "ordered"
  });

  // Utility functions for quick actions
  const generateOrderNumber = (prefix: string) => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDeliveryDate = (daysAhead: number = 3) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const generateTrackingNumber = () => {
    const prefix = '1Z999AA';
    const numbers = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    return `${prefix}${numbers}`;
  };

  const generateRandomCard = () => {
    return Math.floor(Math.random() * 9000 + 1000).toString();
  };

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

  const handleSupremeInputChange = (field: keyof SupremeReceiptData, value: string) => {
    setSupremeReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleTrapstarInputChange = (field: keyof TrapstarReceiptData, value: string) => {
    setTrapstarReceiptData(prev => ({ ...prev, [field]: value }));
  };

  const handleStussyInputChange = (field: keyof StussyReceiptData, value: string) => {
    setStussyReceiptData(prev => ({ ...prev, [field]: value }));
  };
const handleYzyGapInputChange = (field: keyof YzyGapReceiptData, value: string) => {
  setYzyGapReceiptData(prev => ({ ...prev, [field]: value }));
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
    } else if (selectedReceiptType === 'supreme') {
      localStorage.setItem('supremeReceiptData', JSON.stringify(supremeReceiptData));
      router.push('/supreme-receipt');
    } else if (selectedReceiptType === 'trapstar') {
      localStorage.setItem('trapstarReceiptData', JSON.stringify(trapstarReceiptData));
      router.push('/trapstar-receipt');
    } else if (selectedReceiptType === 'stussy') {
      localStorage.setItem('stussyReceiptData', JSON.stringify(stussyReceiptData));
      router.push('/stussy-receipt');
    } else if (selectedReceiptType === 'yzygap') {
      localStorage.setItem('yzygapReceiptData', JSON.stringify(yzygapReceiptData));
      router.push('/yzygap-receipt');
    } else if (selectedReceiptType === 'stockx') {
      localStorage.setItem('stockxReceiptData', JSON.stringify(stockxReceiptData));
      router.push('/stockx-receipt');
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
      case 'supreme':
        return (
          <div className="text-red-600 font-black text-lg">SUP</div>
        );
      case 'trapstar':
        return (
          <div className="text-red-500 font-black text-lg">TS</div>
        );
      default:
        return (
          <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        );
    }
  };

  const selectedReceiptInfo = receiptTypes.find(type => type.value === selectedReceiptType);

  const renderMobileDropdown = () => (
    <div className="relative w-full">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between shadow-sm hover:border-gray-400 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{selectedReceiptInfo?.icon}</span>
          <div>
            <div className="font-medium text-gray-900">{selectedReceiptInfo?.label}</div>
            <div className="text-xs text-gray-500">{selectedReceiptInfo?.category}</div>
          </div>
        </div>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {Object.entries(
            receiptTypes.reduce((acc, type) => {
              if (!acc[type.category]) acc[type.category] = [];
              acc[type.category].push(type);
              return acc;
            }, {} as Record<string, typeof receiptTypes>)
          ).map(([category, types]) => (
            <div key={category}>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                {category}
              </div>
              {types.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setSelectedReceiptType(type.value as ReceiptType);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                    selectedReceiptType === type.value ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  <span className="font-medium text-gray-900">{type.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderDesktopTabs = () => (
    <div className="bg-white rounded-lg p-2 shadow-md overflow-x-auto">
      <div className="flex space-x-1 min-w-max">
        {receiptTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedReceiptType(type.value as ReceiptType)}
            className={`px-3 py-2 sm:px-4 sm:py-3 rounded-md font-medium transition-all text-xs sm:text-sm whitespace-nowrap flex items-center space-x-2 ${
              selectedReceiptType === type.value
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="text-sm">{type.icon}</span>
            <span>{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Enhanced quick actions for different receipt types
  const getQuickActions = () => {
    const commonActions = [
      {
        label: "Use Today's Date",
        icon: "📅",
        action: () => {
          const today = getTodayDate();
          switch (selectedReceiptType) {
            case 'apple':
              setAppleReceiptData(prev => ({ ...prev, ORDER_DATE: today }));
              break;
            case 'nike':
              setNikeReceiptData(prev => ({ ...prev, ORDER_DATE: today }));
              break;
            case 'dior':
              setDiorReceiptData(prev => ({ ...prev, ORDER_DATE: today }));
              break;
            case 'goat':
              setGoatReceiptData(prev => ({ ...prev, ORDER_DATE: today }));
              break;
            case 'stockx':
              setStockxReceiptData(prev => ({ ...prev, ORDER_DATE: today }));
              break;
            // Add more cases as needed
          }
        }
      },
      {
        label: "Generate Order Number",
        icon: "🔢",
        action: () => {
          const prefixMap: Record<string, string> = {
            apple: 'W',
            nike: 'N',
            dior: '',
            goat: 'GOAT',
            stockx: 'STX',
            balenciaga: 'BAL',
            bape: 'BAPEUK',
            supreme: 'SUP',
            trapstar: 'TS',
            stussy: 'STU',
            yzygap: 'YZY',
            lv: 'LV',
            moncler: 'MCL',
            northface: '',
            farfetch: 'FF',
            gallery_dept: 'GD',
            grailed: 'GR'
          };
          
          const prefix = prefixMap[selectedReceiptType] || '';
          const orderNumber = generateOrderNumber(prefix);
          
          switch (selectedReceiptType) {
            case 'apple':
              setAppleReceiptData(prev => ({ ...prev, ORDER_NUMBER: orderNumber }));
              break;
            case 'nike':
              setNikeReceiptData(prev => ({ ...prev, ORDER_NUMBER: orderNumber }));
              break;
            case 'dior':
              setDiorReceiptData(prev => ({ ...prev, ORDER_NUMBER: orderNumber }));
              break;
            case 'goat':
              setGoatReceiptData(prev => ({ ...prev, ORDER_NUMBER: orderNumber }));
              break;
            case 'stockx':
              setStockxReceiptData(prev => ({ ...prev, ORDER_NUMBER: orderNumber }));
              break;
            // Add more cases
          }
        }
      },
      {
        label: "Generate Tracking",
        icon: "📦",
        action: () => {
          const tracking = generateTrackingNumber();
          switch (selectedReceiptType) {
            case 'goat':
              setGoatReceiptData(prev => ({ ...prev, TRACKING_NUMBER: tracking }));
              break;
            case 'stockx':
              setStockxReceiptData(prev => ({ ...prev, TRACKING_NUMBER: tracking }));
              break;
            case 'gallery_dept':
              setGalleryDeptReceiptData(prev => ({ ...prev, TRACKING_NUMBER: tracking }));
              break;
          }
        }
      },
      {
        label: "Set Delivery Date",
        icon: "🚚",
        action: () => {
          const deliveryDate = getDeliveryDate();
          switch (selectedReceiptType) {
            case 'nike':
              setNikeReceiptData(prev => ({ ...prev, DELIVERY_DATE: deliveryDate }));
              break;
            case 'goat':
              setGoatReceiptData(prev => ({ ...prev, ESTIMATED_DELIVERY: deliveryDate }));
              break;
            case 'stockx':
              setStockxReceiptData(prev => ({ ...prev, ESTIMATED_DELIVERY: deliveryDate }));
              break;
            case 'farfetch':
              setFarfetchReceiptData(prev => ({ ...prev, DELIVERY: deliveryDate }));
              break;
          }
        }
      },
      {
        label: "Random Card Ending",
        icon: "💳",
        action: () => {
          const cardEnding = generateRandomCard();
          switch (selectedReceiptType) {
            case 'bape':
              setBapeReceiptData(prev => ({ ...prev, CARD_ENDING: cardEnding }));
              break;
            case 'dior':
              setDiorReceiptData(prev => ({ ...prev, CARD_ENDING: cardEnding }));
              break;
            case 'nike':
              setNikeReceiptData(prev => ({ ...prev, CARD_END: cardEnding }));
              break;
            case 'stockx':
              setStockxReceiptData(prev => ({ ...prev, CARD_ENDING: cardEnding }));
              break;
            case 'moncler':
              setMonclerReceiptData(prev => ({ ...prev, CARD_ENDING: cardEnding }));
              break;
            case 'supreme':
              setSupremeReceiptData(prev => ({ ...prev, CARD_ENDING: cardEnding }));
              break;
            case 'trapstar':
              setTrapstarReceiptData(prev => ({ ...prev, CARD_ENDING: cardEnding }));
              break;
            case 'stussy':
              setStussyReceiptData(prev => ({ ...prev, CARD_ENDING: cardEnding }));
              break;
            case 'yzygap':
              setYzyGapReceiptData(prev => ({ ...prev, CARD_ENDING: cardEnding }));
              break;
            case 'farfetch':
              setFarfetchReceiptData(prev => ({ ...prev, CARD_ENDING: cardEnding }));
              break;
          }
        }
      }
    ];

    const specificActions = [];

    // Add specific actions based on receipt type
    switch (selectedReceiptType) {
      case 'apple':
        specificActions.push({
          label: "Calculate Total",
          icon: "🧮",
          action: () => {
            const price = parseFloat(appleReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, ''));
            const shipping = appleReceiptData.SHIPPING_COST.toLowerCase() === 'free' ? 0 : parseFloat(appleReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ''));
            const total = price + shipping;
            setAppleReceiptData(prev => ({ ...prev, ORDER_TOTAL: `£${total.toFixed(2)}` }));
          }
        });
        break;

      case 'stockx':
        specificActions.push(
          {
            label: "Calculate Total",
            icon: "🧮",
            action: () => {
              const price = parseFloat(stockxReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, ''));
              const shipping = parseFloat(stockxReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ''));
              const tax = parseFloat(stockxReceiptData.TAX_AMOUNT.replace(/[£$,€]/g, ''));
              const total = price + shipping + tax;
              setStockxReceiptData(prev => ({ ...prev, TOTAL_AMOUNT: `$${total.toFixed(2)}` }));
            }
          },
          {
            label: "Toggle Status",
            icon: "🔄",
            action: () => {
              setStockxReceiptData(prev => ({ 
                ...prev, 
                ORDER_STATUS: prev.ORDER_STATUS === 'ordered' ? 'verified' : 'ordered' 
              }));
            }
          }
        );
        break;

      case 'nike':
        specificActions.push({
          label: "Sync Price & Total",
          icon: "💰",
          action: () => {
            setNikeReceiptData(prev => ({ ...prev, TOTAL: prev.PRICE }));
          }
        });
        break;

      case 'goat':
      case 'gallery_dept':
        specificActions.push({
          label: "Calculate Total",
          icon: "🧮",
          action: () => {
            if (selectedReceiptType === 'goat') {
              const price = parseFloat(goatReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, ''));
              const shipping = parseFloat(goatReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ''));
              const tax = parseFloat(goatReceiptData.TAX_AMOUNT.replace(/[£$,€]/g, ''));
              const total = price + shipping + tax;
              setGoatReceiptData(prev => ({ ...prev, TOTAL_AMOUNT: `$${total.toFixed(2)}` }));
            }
          }
        });
        break;

      case 'bape':
        specificActions.push({
          label: "Calculate Total",
          icon: "🧮",
          action: () => {
            const price = parseFloat(bapeReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, ''));
            const shipping = parseFloat(bapeReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ''));
            const total = price + shipping;
            setBapeReceiptData(prev => ({ ...prev, ORDER_TOTAL_CURRENCY: `£${total.toFixed(2)} GBP` }));
          }
        });
        break;

      case 'grailed':
        specificActions.push({
          label: "Calculate Total",
          icon: "🧮",
          action: () => {
            const soldPrice = parseFloat(grailedReceiptData.SOLD_PRICE.replace(/[£$,€]/g, ''));
            const tax = parseFloat(grailedReceiptData.TAX_AMOUNT.replace(/[£$,€]/g, ''));
            const total = soldPrice + tax;
            setGrailedReceiptData(prev => ({ ...prev, TOTAL_AMOUNT: `€${total.toFixed(2)}` }));
          }
        });
        break;
    }

    return [...commonActions, ...specificActions];
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
      case 'supreme':
        return (
          <SupremeReceiptForm 
            data={supremeReceiptData} 
            onInputChange={handleSupremeInputChange} 
          />
        );
      case 'trapstar':
        return (
          <TrapstarReceiptForm 
            data={trapstarReceiptData} 
            onInputChange={handleTrapstarInputChange} 
          />
        );
      case 'stussy':
        return (
          <StussyReceiptForm 
            data={stussyReceiptData} 
            onInputChange={handleStussyInputChange} 
          />
        );
      case 'yzygap':
        return (
          <YzyGapReceiptForm 
            data={yzygapReceiptData} 
            onInputChange={handleYzyGapInputChange} 
          />
        );
      case 'stockx':
        return (
          <StockXReceiptForm
            data={stockxReceiptData}
            onInputChange={(field, value) => {
              setStockxReceiptData(prev => ({ ...prev, [field]: value }));
            }}
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
        <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center items-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden">
              <img src="/natetube.jpg" alt="NateTube" className="w-full h-full object-cover" />
            </div>
            </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">NateTube Receipt Generator</h1>
          <p className="text-sm sm:text-lg text-gray-600">Generate receipts to match your wins</p>
        </div>

        {/* Receipt Type Selector */}
        <div className="flex justify-center mb-6 sm:mb-8">
          {/* Mobile Dropdown (visible on small screens) */}
          <div className="block sm:hidden w-full max-w-md px-4">
            {renderMobileDropdown()}
          </div>
          
          {/* Desktop Tabs (visible on larger screens) */}
          <div className="hidden sm:block w-full">
            {renderDesktopTabs()}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm sm:text-xl">{selectedReceiptInfo?.label} Receipt Details</span>
            </h2>
            
            {renderReceiptForm()}
          </div>

          {/* Preview/Action Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-800 to-black rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-2xl sm:text-3xl">{selectedReceiptInfo?.icon}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  {selectedReceiptInfo?.label} Receipt
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  Generate a {selectedReceiptInfo?.label} order confirmation.
                </p>
                
                <Button
                  onClick={generateReceipt}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg transform transition hover:scale-105 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate {selectedReceiptInfo?.label} Receipt
                </Button>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {getQuickActions().map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.action}
                    variant="outline"
                    className="justify-start h-auto py-2 sm:py-3 px-3 sm:px-4 text-left group hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">{action.icon}</span>
                    <span className="text-xs sm:text-sm font-medium">{action.label}</span>
                  </Button>
                ))}
              </div>
              
              {/* Category badge */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {selectedReceiptInfo?.category}
                </span>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}
