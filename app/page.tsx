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
import FarfetchReceiptForm from "@/components/receipts/FarfetchReceiptForm";
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
  ReceiptType,
} from "@/types/receipt-types";
import { monclerx,supremex } from '@/base64_images/start';
import { useAuth } from "@/contexts/AuthContext";
import AuthPage from "@/components/auth/AuthPage";
import PaymentPage from "@/components/payment/PaymentPage";
import { supabase } from '@/lib/supabase'
import { uploadImageFromBase64 } from '@/lib/supabase-storage'

export default function Home() {
  const { user, loading, signOut } = useAuth();
  const profile = user;
  console.log(user, profile, loading);
  const [showPayment, setShowPayment] = useState(false);
  const router = useRouter();
  const [selectedReceiptType, setSelectedReceiptType] =
    useState<ReceiptType>("apple");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentReceiptId, setCurrentReceiptId] = useState<string | null>(null);

  // Receipt type options with labels and categories
  const receiptTypes = [
    { value: "apple", label: "Apple", category: "Tech", icon: "🍎" },
    { value: "nike", label: "Nike", category: "Sneakers", icon: "✓" },
    { value: "goat", label: "GOAT", category: "Sneakers", icon: "🐐" },
    { value: "stockx", label: "StockX", category: "Sneakers", icon: "📈" },
    {
      value: "balenciaga",
      label: "Balenciaga",
      category: "Luxury",
      icon: "👑",
    },
    { value: "dior", label: "Dior", category: "Luxury", icon: "💎" },
    { value: "lv", label: "Louis Vuitton", category: "Luxury", icon: "🛍️" },
    { value: "moncler", label: "Moncler", category: "Luxury", icon: "🧥" },
    { value: "farfetch", label: "Farfetch", category: "Fashion", icon: "🌟" },
    { value: "bape", label: "BAPE", category: "Streetwear", icon: "🦍" },
    { value: "supreme", label: "Supreme", category: "Streetwear", icon: "🔴" },
    {
      value: "trapstar",
      label: "Trapstar",
      category: "Streetwear",
      icon: "⭐",
    },
    { value: "stussy", label: "Stüssy", category: "Streetwear", icon: "🌊" },
    { value: "yzygap", label: "YZY GAP", category: "Streetwear", icon: "🎨" },
    {
      value: "gallery_dept",
      label: "Gallery Dept",
      category: "Streetwear",
      icon: "🎭",
    },
    {
      value: "northface",
      label: "North Face",
      category: "Outdoor",
      icon: "⛰️",
    },
    { value: "grailed", label: "Grailed", category: "Marketplace", icon: "🔥" },
  ] as const;

  const [appleReceiptData, setAppleReceiptData] = useState<AppleReceiptData>({
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
    BILLING_ADDRESS_4: "SW1A 1AA United Kingdom",
  });

  const [balenciagaReceiptData, setBalenciagaReceiptData] =
    useState<BalenciagaReceiptData>({
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
      BILLING4: "United Kingdom",
    });

  const [bapeReceiptData, setBapeReceiptData] = useState<BapeReceiptData>({
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
    CARD_ENDING: "1234",
  });

  const [nikeReceiptData, setNikeReceiptData] = useState<NikeReceiptData>({
    WHOLE_NAME: "John Smith",
    ADDRESS1: "123 Main Street",
    ADDRESS2: "London",
    ADDRESS3: "SW1A 1AA, United Kingdom",
    FIRSTNAME: "John",
    DELIVERY_DATE: "Monday, December 2, 2024",
    PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/nike/nike_files/product-image.jpg",
    PRODUCT_NAME: "Air Max 270 React",
    PRICE: "£120.00",
    SIZE: "UK 9",
    ORDER_NUMBER: "N123456789",
    ORDER_DATE: "November 30, 2024",
    CARD_END: "1234",
    CURRENCY: "£",
    TOTAL: "£120.00",
  });

  const [goatReceiptData, setGoatReceiptData] = useState<GoatReceiptData>({
    ORDER_NUMBER: "GOAT123456789",
    ORDER_DATE: "December 1, 2024",
    CUSTOMER_NAME: "John Doe",
    CUSTOMER_EMAIL: "john.doe@example.com",
    PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/goat/goat_files/product-image.jpg",
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
    SHIPPING_ADDRESS_4: "United States",
  });

  const [farfetchReceiptData, setFarfetchReceiptData] =
    useState<FarfetchReceiptData>({
      FIRSTNAME: "John",
      ORDERNUMBER: "FF123456789",
      DELIVERY: "December 5, 2024",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/farfetch/farfetch_files/PRODUCT_IMAGE",
      BRAND: "Balenciaga",
      FULLNAME: "Triple S Sneakers",
      PRODUCT_PRICE: "€ 1,050",
      SHIPPING_COST: "Free",
      TAX_AMOUNT: "€ 200.00",
      TOTAL_AMOUNT: "€ 1,050.00",
      SHIPPING_ADDRESS1: "John Doe",
      SHIPPING_ADDRESS2: "123 Luxury Avenue",
      SHIPPING_ADDRESS3: "Paris 75001",
      SHIPPING_ADDRESS4: "France",
      BILLING_ADDRESS1: "John Doe",
      BILLING_ADDRESS2: "123 Luxury Avenue",
      BILLING_ADDRESS3: "Paris 75001",
      BILLING_ADDRESS4: "France",
      PAYMENT_METHOD: "Visa",
      CARD_ENDING: "1234",
      PRODUCT_NAME:"",
      PRODUCT_SIZE:"",
      PRICE:"",
      TRACKING_URL:""
    });

  const [galleryDeptReceiptData, setGalleryDeptReceiptData] =
    useState<GalleryDeptReceiptData>({
      ORDER_NUMBER: "GD123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/gallery_dept/gallery_dept_files/product-image.jpg",
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
      SHIPPING_ADDRESS_4: "United States",
      QUANTITY:"1",
      SUBTOTAL:"",
      PAYMENT_METHOD:"",
      CARD_ENDING:""
    });

  const [grailedReceiptData, setGrailedReceiptData] =
    useState<GrailedReceiptData>({
      ORDER_ID: "GR123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/grailed/grailed_files/product-image.jpg",
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
      SELLER_NAME: "Seller123",
    });

  const [lvReceiptData, setLVReceiptData] = useState<LVReceiptData>({
    FIRSTNAME: "John",
    ORDER_NUMBER: "LV123456789",
    ORDER_DATE: "December 1, 2024",
    PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/lv/lv_files/PRODUCT_IMAGE",
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
    COUNTRY: "uk",
  });

  const [monclerReceiptData, setMonclerReceiptData] =
    useState<MonclerReceiptData>({
      FIRST_NAME: "John",
      ORDER_NUMBER: "MCL123456789",
      DATE: "December 1, 2024",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/moncler/moncler_files/product-image.jpg",
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
      CARD_ENDING: "1234",
    });

  const [northFaceReceiptData, setNorthFaceReceiptData] =
    useState<NorthFaceReceiptData>({
      CUSTOMER_NAME: "Paul Harris",
      ORDER_NUMBER: "73442336",
      ORDER_DATE: "15/9/2023",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/northface/northface_files/product-image.jpg",
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
      SHIPPING_METHOD: "DHL - Standard delivery",
    });

  const [supremeReceiptData, setSupremeReceiptData] =
    useState<SupremeReceiptData>({
      ORDER_NUMBER: "SUP123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/supreme/supreme_files/product-image.jpg",
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
      CARD_ENDING: "1234",
    });

  const [trapstarReceiptData, setTrapstarReceiptData] =
    useState<TrapstarReceiptData>({
      ORDER_NUMBER: "TS123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/trapstar/trapstar_files/product-image.jpg",
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
      CARD_ENDING: "1234",
    });

  const [stussyReceiptData, setStussyReceiptData] = useState<StussyReceiptData>(
    {
      ORDER_NUMBER: "STU123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/stussy/stussy_files/product-image.jpg",
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
      CARD_ENDING: "1234",
    }
  );

  const [yzygapReceiptData, setYzyGapReceiptData] = useState<YzyGapReceiptData>(
    {
      ORDER_NUMBER: "YZY123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/yzygap/yzygap_files/product-image.jpg",
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
      CARD_ENDING: "5678",
    }
  );

  const [stockxReceiptData, setStockxReceiptData] = useState<StockXReceiptData>(
    {
      ORDER_NUMBER: "STX123456789",
      ORDER_DATE: "December 1, 2024",
      CUSTOMER_NAME: "John Doe",
      CUSTOMER_EMAIL: "john.doe@example.com",
      PRODUCT_IMAGE: "https://stylehaven-five.vercel.app/stockx/stockx_files/product-image.jpg",
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
      ORDER_STATUS: "ordered",
    }
  );

  // Utility functions for quick actions
  const generateOrderNumber = (prefix: string) => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}${timestamp}${random}`;
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDeliveryDate = (daysAhead: number = 3) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const generateTrackingNumber = () => {
    const prefix = "1Z999AA";
    const numbers = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0");
    return `${prefix}${numbers}`;
  };

  const generateRandomCard = () => {
    return Math.floor(Math.random() * 9000 + 1000).toString();
  };

  // Input change handlers
  const handleAppleInputChange = (
    field: keyof AppleReceiptData,
    value: string
  ) => {
    setAppleReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBalenciagaInputChange = (
    field: keyof BalenciagaReceiptData,
    value: string
  ) => {
    setBalenciagaReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBapeInputChange = (
    field: keyof BapeReceiptData,
    value: string
  ) => {
    setBapeReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDiorInputChange = (
    field: keyof DiorReceiptData,
    value: string
  ) => {
    setDiorReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNikeInputChange = (
    field: keyof NikeReceiptData,
    value: string
  ) => {
    setNikeReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoatInputChange = (
    field: keyof GoatReceiptData,
    value: string
  ) => {
    setGoatReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFarfetchInputChange = (
    field: keyof FarfetchReceiptData,
    value: string
  ) => {
    setFarfetchReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGalleryDeptInputChange = (
    field: keyof GalleryDeptReceiptData,
    value: string
  ) => {
    setGalleryDeptReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGrailedInputChange = (
    field: keyof GrailedReceiptData,
    value: string
  ) => {
    setGrailedReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLVInputChange = (field: keyof LVReceiptData, value: string) => {
    setLVReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMonclerInputChange = (
    field: keyof MonclerReceiptData,
    value: string
  ) => {
    setMonclerReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNorthFaceInputChange = (
    field: keyof NorthFaceReceiptData,
    value: string
  ) => {
    setNorthFaceReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSupremeInputChange = (
    field: keyof SupremeReceiptData,
    value: string
  ) => {
    setSupremeReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTrapstarInputChange = (
    field: keyof TrapstarReceiptData,
    value: string
  ) => {
    setTrapstarReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStussyInputChange = (
    field: keyof StussyReceiptData,
    value: string
  ) => {
    setStussyReceiptData((prev) => ({ ...prev, [field]: value }));
  };
  const handleYzyGapInputChange = (
    field: keyof YzyGapReceiptData,
    value: string
  ) => {
    setYzyGapReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateAppleTotal = () => {
    const price = parseFloat(
      appleReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, "")
    );
    const shipping =
      appleReceiptData.SHIPPING_COST.toLowerCase() === "free"
        ? 0
        : parseFloat(appleReceiptData.SHIPPING_COST.replace(/[£$,€]/g, ""));
    const total = price + shipping;
    return `£${total.toFixed(2)}`;
  };

  const updateAppleTotal = () => {
    const newTotal = calculateAppleTotal();
    setAppleReceiptData((prev) => ({ ...prev, ORDER_TOTAL: newTotal }));
  };

  const sendReceiptEmail = async (receiptType: string, receiptData: any) => {
    try {
      const sessionToken = localStorage.getItem('session_token')
      if (!sessionToken) {
        alert('Please log in to send emails.')
        return
      }

      // Get the receipt ID from the current context
      // Since we just generated the receipt, we need to get the ID from the URL that was opened
      const urlParams = new URLSearchParams(window.location.search);
      let receiptId = urlParams.get('id');
      
      // If no ID in current URL, we need to save and get a new one
      if (!receiptId) {
        receiptId = await saveReceiptToSupabase(receiptType, receiptData)
      }
      
      // Construct the full receipt URL
      const receiptUrl = `${window.location.origin}/${receiptType}-receipt?id=${receiptId}`

      const response = await fetch('/api/send-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          receiptType: selectedReceiptInfo?.label,
          receiptUrl,
          receiptData: receiptData
        })
      })

      const result = await response.json()
      
      if (result.success) {
        alert('✅ Receipt sent to your email successfully! Check your inbox.')
      } else {
        alert(`❌ Failed to send email: ${result.error}`)
      }
    } catch (error) {
      console.error('Email sending error:', error)
      alert('❌ Failed to send email. Please try again.')
    }
  }

  // Add this function to save receipt data
  const saveReceiptToSupabase = async (receiptType: string, receiptData: any) => {
    try {

      const { data, error } = await supabase
        .from('receipts')
        .insert({
          user_id: user?.id,
          receipt_type: receiptType,
          receipt_data: receiptData
        })
        .select()
        .single()

      if (error) throw error
    
      return data.id
    } catch (error) {
      console.error('Error saving receipt:', error)
      throw error
    }
  }

  // Function to convert existing base64 images to Supabase URLs
  const convertBase64ToSupabaseUrl = async (base64Data: string, receiptType: string): Promise<string> => {
    try {
      // Check if it's already a URL
      if (base64Data.startsWith('http')) {
        return base64Data
      }
      
      // Convert base64 to Supabase URL
      const publicUrl = await uploadImageFromBase64(base64Data, receiptType)
      return publicUrl || base64Data // fallback to original if upload fails
    } catch (error) {
      console.error('Error converting base64 to Supabase URL:', error)
      return base64Data // fallback to original
    }
  }

  // Update the generateReceipt function
  const generateReceipt = async () => {
    let receiptData: any = {}
    
    // Get the appropriate receipt data based on type
    switch (selectedReceiptType) {
      case "apple":
        receiptData = { ...appleReceiptData }
        break
      case "stockx":
        receiptData = { ...stockxReceiptData }
        break
      case "nike":
        receiptData = { ...nikeReceiptData }
        break
      case "goat":
        receiptData = { ...goatReceiptData }
        break
      case "bape":
        receiptData = { ...bapeReceiptData }
        break
      case "grailed":
        receiptData = { ...grailedReceiptData }
        break
      case "farfetch":
        receiptData = { ...farfetchReceiptData }
        break
      case "gallery_dept":
        receiptData = { ...galleryDeptReceiptData }
        break
      case "lv":
        receiptData = { ...lvReceiptData }
        break
      case "balenciaga":
        receiptData = { ...balenciagaReceiptData }
        break
      case "dior":
        receiptData = { ...diorReceiptData }
        break
      case "moncler":
        receiptData = { ...monclerReceiptData }
        break
      case "northface":
        receiptData = { ...northFaceReceiptData }
        break
      case "supreme":
        receiptData = { ...supremeReceiptData }
        break
      case "trapstar":
        receiptData = { ...trapstarReceiptData }
        break
      case "stussy":
        receiptData = { ...stussyReceiptData }
        break
      case "yzygap":
        receiptData = { ...yzygapReceiptData }
        break
      default:
        alert("Please select a receipt type")
        return
    }

    try {
      // Convert base64 image to Supabase URL if needed
      if (receiptData.PRODUCT_IMAGE && receiptData.PRODUCT_IMAGE.startsWith('data:image')) {
        console.log('Converting base64 image to Supabase URL...')
        receiptData.PRODUCT_IMAGE = await convertBase64ToSupabaseUrl(receiptData.PRODUCT_IMAGE, selectedReceiptType)
      }

      // Save to Supabase and get the receipt ID
      const receiptId = await saveReceiptToSupabase(selectedReceiptType, receiptData)
      
      // Store the receipt ID in state
      setCurrentReceiptId(receiptId)
      
      // Open receipt with the ID as query param
      const receiptUrl = `/${selectedReceiptType}-receipt?id=${receiptId}`
      window.open(receiptUrl, '_blank')
      
      // Show email option after a short delay
      setTimeout(() => {
        const shouldEmail = confirm('Receipt generated! Would you like to email this receipt to yourself?')
        if (shouldEmail) {
          sendReceiptEmail(selectedReceiptType, receiptData)
        }
      }, 1500)
      
    } catch (error) {
      console.error('Error generating receipt:', error)
      alert('Error saving receipt. Please try again.')
    }
  }

  // Update your quick actions to include email functionality
 const getQuickActions = () => {
  const commonActions = [
    {
      label: "Generate Order Number",
      icon: "🔢",
      action: () => {
        const prefix = selectedReceiptType.toUpperCase().substring(0, 3);
        const newOrderNumber = generateOrderNumber(prefix);
        
        // Update the appropriate receipt data based on selected type
        switch (selectedReceiptType) {
          case "apple":
            setAppleReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "stockx":
            setStockxReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "nike":
            setNikeReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "goat":
            setGoatReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "bape":
            setBapeReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "grailed":
            setGrailedReceiptData(prev => ({ ...prev, ORDER_ID: newOrderNumber }));
            break;
          case "farfetch":
            setFarfetchReceiptData(prev => ({ ...prev, ORDERNUMBER: newOrderNumber }));
            break;
          case "gallery_dept":
            setGalleryDeptReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "lv":
            setLVReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "balenciaga":
            setBalenciagaReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "dior":
            setDiorReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "moncler":
            setMonclerReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "northface":
            setNorthFaceReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "supreme":
            setSupremeReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "trapstar":
            setTrapstarReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "stussy":
            setStussyReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
          case "yzygap":
            setYzyGapReceiptData(prev => ({ ...prev, ORDER_NUMBER: newOrderNumber }));
            break;
        }
      },
    },
    {
      label: "Generate Tracking Number",
      icon: "📦",
      action: () => {
        const newTrackingNumber = generateTrackingNumber();
        
        // Update receipts that have tracking numbers
        switch (selectedReceiptType) {
          case "goat":
            setGoatReceiptData(prev => ({ ...prev, TRACKING_NUMBER: newTrackingNumber }));
            break;
          case "stockx":
            setStockxReceiptData(prev => ({ ...prev, TRACKING_NUMBER: newTrackingNumber }));
            break;
          case "gallery_dept":
            setGalleryDeptReceiptData(prev => ({ ...prev, TRACKING_NUMBER: newTrackingNumber }));
            break;
          case "farfetch":
            setFarfetchReceiptData(prev => ({ ...prev, TRACKING_URL: `https://track.dhl.com/${newTrackingNumber}` }));
            break;
          default:
            alert(`Tracking numbers not supported for ${selectedReceiptType}`);
            return;
        }
     },
    },
    {
      label: "Set Today's Date",
      icon: "📅",
      action: () => {
        const todayDate = getTodayDate();
        
        // Update the appropriate date field based on selected type
        switch (selectedReceiptType) {
          case "apple":
            setAppleReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "stockx":
            setStockxReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "nike":
            setNikeReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "goat":
            setGoatReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "bape":
            setBapeReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "grailed":
            setGrailedReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "gallery_dept":
            setGalleryDeptReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "lv":
            setLVReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "dior":
            setDiorReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "moncler":
            setMonclerReceiptData(prev => ({ ...prev, DATE: todayDate }));
            break;
          case "northface":
            setNorthFaceReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "supreme":
            setSupremeReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "trapstar":
            setTrapstarReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "stussy":
            setStussyReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "yzygap":
            setYzyGapReceiptData(prev => ({ ...prev, ORDER_DATE: todayDate }));
            break;
          case "farfetch":
            setFarfetchReceiptData(prev => ({ ...prev, DELIVERY: getDeliveryDate() }));
            break;
        }
      },
    },
    {
      label: "Generate Delivery Date",
      icon: "🚚",
      action: () => {
        const deliveryDate = getDeliveryDate();
        
        // Update delivery dates
        switch (selectedReceiptType) {
          case "nike":
            setNikeReceiptData(prev => ({ ...prev, DELIVERY_DATE: deliveryDate }));
            break;
          case "goat":
            setGoatReceiptData(prev => ({ ...prev, ESTIMATED_DELIVERY: deliveryDate }));
            break;
          case "stockx":
            setStockxReceiptData(prev => ({ ...prev, ESTIMATED_DELIVERY: deliveryDate }));
            break;
          case "gallery_dept":
            setGalleryDeptReceiptData(prev => ({ ...prev, ESTIMATED_DELIVERY: deliveryDate }));
            break;
          case "farfetch":
            setFarfetchReceiptData(prev => ({ ...prev, DELIVERY: deliveryDate }));
            break;
          default:
            alert(`Delivery dates not supported for ${selectedReceiptType}`);
            return;
        }
      },
    },
    {
      label: "Generate Card Number",
      icon: "💳",
      action: () => {
        const cardNumber = generateRandomCard();
        
        // Update card ending fields
        switch (selectedReceiptType) {
          case "nike":
            setNikeReceiptData(prev => ({ ...prev, CARD_END: cardNumber }));
            break;
          case "bape":
            setBapeReceiptData(prev => ({ ...prev, CARD_ENDING: cardNumber }));
            break;
          case "dior":
            setDiorReceiptData(prev => ({ ...prev, CARD_ENDING: cardNumber }));
            break;
          case "farfetch":
            setFarfetchReceiptData(prev => ({ ...prev, CARD_ENDING: cardNumber }));
            break;
          case "moncler":
            setMonclerReceiptData(prev => ({ ...prev, CARD_ENDING: cardNumber }));
            break;
          case "stockx":
            setStockxReceiptData(prev => ({ ...prev, CARD_ENDING: cardNumber }));
            break;
          case "supreme":
            setSupremeReceiptData(prev => ({ ...prev, CARD_ENDING: cardNumber }));
            break;
          case "trapstar":
            setTrapstarReceiptData(prev => ({ ...prev, CARD_ENDING: cardNumber }));
            break;
          case "stussy":
            setStussyReceiptData(prev => ({ ...prev, CARD_ENDING: cardNumber }));
            break;
          case "yzygap":
            setYzyGapReceiptData(prev => ({ ...prev, CARD_ENDING: cardNumber }));
            break;
          default:
           return;
        }
      },
    },
    {
      label: "Email Receipt",
      icon: "📧",
      action: () => {
        // const receiptData = getCurrentReceiptData();
        // if (receiptData) {
        //   sendReceiptEmail(selectedReceiptType, receiptData);
        // } else {
        //   alert('Please fill in receipt details first!');
        // }
      },
    }
  ];

  // Add specific actions based on receipt type
  const specificActions: { label: string; icon: string; action: () => void }[] = [];

  switch (selectedReceiptType) {
    case "apple":
      specificActions.push({
        label: "Calculate Total",
        icon: "🧮",
        action: () => {
          const price = parseFloat(
            appleReceiptData.PRODUCT_PRICE.replace(/[£$,€]/g, "")
          );
          const shipping =
            appleReceiptData.SHIPPING_COST.toLowerCase() === "free"
              ? 0
              : parseFloat(
                  appleReceiptData.SHIPPING_COST.replace(/[£$,€]/g, "")
                );
          const total = price + shipping;
          setAppleReceiptData((prev) => ({
            ...prev,
            ORDER_TOTAL: `£${total.toFixed(2)}`,
          }));
       },
      });
      break;
      
    case "stockx":
      specificActions.push({
        label: "Mark as Verified",
        icon: "✅",
        action: () => {
          setStockxReceiptData(prev => ({ ...prev, ORDER_STATUS: "verified" }));
     
        },
      });
      break;
      
    case "grailed":
      specificActions.push({
        label: "Set Random Seller",
        icon: "👤",
        action: () => {
          const sellers = ["VintageKing", "SneakerHead", "FashionGuru", "StyleMaster", "TrendSetter"];
          const randomSeller = sellers[Math.floor(Math.random() * sellers.length)];
          setGrailedReceiptData(prev => ({ ...prev, SELLER_NAME: randomSeller }));
         
        },
      });
      break;
      
    case "farfetch":
      specificActions.push({
        label: "Set Free Shipping",
        icon: "🆓",
        action: () => {
          setFarfetchReceiptData(prev => ({ ...prev, SHIPPING_COST: "Free" }));
         
        },
      });
      break;
  }

  return [...commonActions, ...specificActions];
};
  const renderReceiptForm = () => {
    switch (selectedReceiptType) {
      case "apple":
        return (
          <AppleReceiptForm
            data={appleReceiptData}
            onInputChange={handleAppleInputChange}
          />
        );
      case "balenciaga":
        return (
          <BalenciagaReceiptForm
            data={balenciagaReceiptData}
            onInputChange={handleBalenciagaInputChange}
          />
        );
      case "bape":
        return (
          <BapeReceiptForm
            data={bapeReceiptData}
            onInputChange={handleBapeInputChange}
          />
        );
      case "dior":
        return (
          <DiorReceiptForm
            data={diorReceiptData}
            onInputChange={handleDiorInputChange}
          />
        );
      case "nike":
        return (
          <NikeReceiptForm
            data={nikeReceiptData}
            onInputChange={handleNikeInputChange}
          />
        );
      case "goat":
        return (
          <GoatReceiptForm
            data={goatReceiptData}
            onInputChange={handleGoatInputChange}
          />
        );
      case "farfetch":
        return (
          <FarfetchReceiptForm
            data={farfetchReceiptData}
            onInputChange={handleFarfetchInputChange}
          />
        );
      case "gallery_dept":
        return (
          <GalleryDeptReceiptForm
            data={galleryDeptReceiptData}
            onInputChange={handleGalleryDeptInputChange}
          />
        );
      case "grailed":
        return (
          <GrailedReceiptForm
            data={grailedReceiptData}
            onInputChange={handleGrailedInputChange}
          />
        );
      case "lv":
        return (
          <LVReceiptForm
            data={lvReceiptData}
            onInputChange={handleLVInputChange}
          />
        );
      case "moncler":
        return (
          <MonclerReceiptForm
            data={monclerReceiptData}
            onInputChange={handleMonclerInputChange}
          />
        );
      case "northface":
        return (
          <NorthFaceReceiptForm
            data={northFaceReceiptData}
            onInputChange={handleNorthFaceInputChange}
          />
        );
      case "supreme":
        return (
          <SupremeReceiptForm
            data={supremeReceiptData}
            onInputChange={handleSupremeInputChange}
          />
        );
      case "trapstar":
        return (
          <TrapstarReceiptForm
            data={trapstarReceiptData}
            onInputChange={handleTrapstarInputChange}
          />
        );
      case "stussy":
        return (
          <StussyReceiptForm
            data={stussyReceiptData}
            onInputChange={handleStussyInputChange}
          />
        );
      case "yzygap":
        return (
          <YzyGapReceiptForm
            data={yzygapReceiptData}
            onInputChange={handleYzyGapInputChange}
          />
        );
      case "stockx":
        return (
          <StockXReceiptForm
            data={stockxReceiptData}
            onInputChange={(field, value) => {
              setStockxReceiptData((prev) => ({ ...prev, [field]: value }));
            }}
          />
        );
      default:
        return <div>Select a receipt type</div>;
    }
  };


   // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage onAuthSuccess={() => setShowPayment(true)} />;
  }

  // Show payment page if not paid (and not staff)
  if (profile && !profile.has_paid && !profile.is_staff) {
    return <PaymentPage onPaymentSuccess={() => setShowPayment(false)} />;
  }

  function renderMobileDropdown() {
    const selectedReceiptInfo = receiptTypes.find(
      (type) => type.value === selectedReceiptType
    );

    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <div className="flex items-center">
            <span className="text-lg mr-3">{selectedReceiptInfo?.icon}</span>
            <div>
              <div className="font-medium text-gray-900">
                {selectedReceiptInfo?.label}
              </div>
              <div className="text-sm text-gray-500">
                {selectedReceiptInfo?.category}
              </div>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {receiptTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => {
                  setSelectedReceiptType(type.value);
                  setIsDropdownOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  selectedReceiptType === type.value
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : ""
                }`}
              >
                <span className="text-lg mr-3">{type.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.category}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  function renderDesktopTabs() {
    // Group receipt types by category
    const groupedTypes = receiptTypes.reduce((acc, type) => {
      if (!acc[type.category]) {
        acc[type.category] = [];
      }
      acc[type.category].push(type);
      return acc;
    }, {} as Record<string, Array<typeof receiptTypes[number]>>);

    return (
      <div className="space-y-4">
        {Object.entries(groupedTypes).map(([category, types]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-500 mb-2 px-4">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedReceiptType(type.value)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedReceiptType === type.value
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function getBrandIcon(receiptType: ReceiptType): string {
    const iconMap: Record<ReceiptType, string> = {
      apple: "🍎",
      nike: "✓",
      goat: "🐐",
      stockx: "📈",
      balenciaga: "👑",
      dior: "💎",
      lv: "🛍️",
      moncler: "🧥",
      farfetch: "🌟",
      bape: "🦍",
      supreme: "🔴",
      trapstar: "⭐",
      stussy: "🌊",
      yzygap: "🎨",
      gallery_dept: "🎭",
      northface: "⛰️",
      grailed: "🔥",
    };
    return iconMap[receiptType] || "📄";
  }

  const selectedReceiptInfo = receiptTypes.find(
    (type) => type.value === selectedReceiptType
  );
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with user info */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                <img
                  src="https://stylehaven-five.vercel.app/natetube.jpg"
                  alt="NateTube"
                  className="w-8 h-8 rounded-lg object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  Welcome back, {user?.username}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.is_staff ? 'Staff Account' : 'Premium User'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {user?.is_staff && (
                <Button
                  onClick={() => window.open('/admin', '_blank')}
                  variant="outline"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-purple-200"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Admin
                </Button>
              )}
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center items-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden">
              <img
                src="https://stylehaven-five.vercel.app/natetube.jpg"
                alt="NateTube"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
            NateTube Receipt Generator
          </h1>
          <p className="text-sm sm:text-lg text-gray-600">
            Generate receipts to match your wins
          </p>
        </div>

        {/* Receipt Type Selector */}
        <div className="flex justify-center mb-6 sm:mb-8">
          {/* Mobile Dropdown (visible on small screens) */}
          <div className="block sm:hidden w-full max-w-md px-4">
            {renderMobileDropdown()}
          </div>

          {/* Desktop Tabs (visible on larger screens) */}
          <div className="hidden sm:block w-full">{renderDesktopTabs()}</div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm sm:text-xl">
                {selectedReceiptInfo?.label} Receipt Details
              </span>
            </h2>

            {renderReceiptForm()}
          </div>

          {/* Preview/Action Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-800 to-gray-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-2xl sm:text-3xl">
                    {getBrandIcon((selectedReceiptInfo?.value?.toLowerCase() as ReceiptType) || "apple")}
                  </span>
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
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Generate {selectedReceiptInfo?.label} Receipt
                </Button>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
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
                    <span className="text-lg mr-2 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </span>
                    <span className="text-xs sm:text-sm font-medium">
                      {action.label}
                    </span>
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
function getCurrentReceiptData() {
  throw new Error("Function not implemented.");
}

