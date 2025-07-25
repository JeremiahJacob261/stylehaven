import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LVReceiptData } from "@/types/receipt-types";
import React, { useState } from 'react';
import { uploadImageToSupabase } from '@/lib/supabase-storage';

interface LVReceiptFormProps {
  data: LVReceiptData;
  onInputChange: (field: keyof LVReceiptData, value: string) => void;
}

export function LVReceiptForm({ data, onInputChange }: LVReceiptFormProps) {
   const [isUploading, setIsUploading] = useState(false);
 
   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (!file) return;
     setIsUploading(true);
     try {
       const publicUrl = await uploadImageToSupabase(file, "nike");
       if (publicUrl) {
         onInputChange("PRODUCT_IMAGE", publicUrl);
         console.log("Image uploaded successfully:", publicUrl);
       } else {
         alert("Failed to upload image. Please try again.");
       }
     } catch (error) {
       console.error("Error uploading image:", error);
       alert("Error uploading image. Please try again.");
     } finally {
       setIsUploading(false);
     }
   };
 
  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              value={data.FIRSTNAME}
              onChange={(e) => onInputChange('FIRSTNAME', e.target.value)}
              placeholder="John"
            />
          </div>
          <div>
            <Label htmlFor="country">Country Code</Label>
            <Input
              id="country"
              value={data.COUNTRY}
              onChange={(e) => onInputChange('COUNTRY', e.target.value)}
              placeholder="uk"
            />
          </div>
        </div>
      </div>

      {/* Order Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Order Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="order-number">Order Number</Label>
            <Input
              id="order-number"
              value={data.ORDER_NUMBER}
              onChange={(e) => onInputChange('ORDER_NUMBER', e.target.value)}
              placeholder="LV123456789"
            />
          </div>
          <div>
            <Label htmlFor="order-date">Order Date</Label>
            <Input
              id="order-date"
              value={data.ORDER_DATE}
              onChange={(e) => onInputChange('ORDER_DATE', e.target.value)}
              placeholder="December 1, 2024"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input
            id="phone-number"
            value={data.PHONE_NUMBER}
            onChange={(e) => onInputChange('PHONE_NUMBER', e.target.value)}
            placeholder="+44 20 1234 5678"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Product Information</h3>
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />

          {isUploading && (
            <div className="mt-2 flex items-center text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Uploading image...
            </div>
          )}

          {data.PRODUCT_IMAGE && !isUploading && (
            <div className="mt-2">
              <img
                src={data.PRODUCT_IMAGE}
                alt="Product preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <p className="text-xs text-gray-500 mt-1">
                Image uploaded to Supabase Storage
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              value={data.PRODUCT_NAME}
              onChange={(e) => onInputChange('PRODUCT_NAME', e.target.value)}
              placeholder="Neverfull MM Monogram Canvas"
            />
          </div>
          <div>
            <Label htmlFor="reference">Reference</Label>
            <Input
              id="reference"
              value={data.REFERENCE}
              onChange={(e) => onInputChange('REFERENCE', e.target.value)}
              placeholder="M40156"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="product-price">Product Price</Label>
            <Input
              id="product-price"
              value={data.PRODUCT_PRICE}
              onChange={(e) => onInputChange('PRODUCT_PRICE', e.target.value)}
              placeholder="€1,350.00"
            />
          </div>
          <div>
            <Label htmlFor="currency">Currency Symbol</Label>
            <Input
              id="currency"
              value={data.CURRENCY}
              onChange={(e) => onInputChange('CURRENCY', e.target.value)}
              placeholder="€"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Shipping Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shipping-address1">Address Line 1</Label>
            <Input
              id="shipping-address1"
              value={data.SHIPPING_ADDRESS1}
              onChange={(e) => onInputChange('SHIPPING_ADDRESS1', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="shipping-address2">Address Line 2</Label>
            <Input
              id="shipping-address2"
              value={data.SHIPPING_ADDRESS2}
              onChange={(e) => onInputChange('SHIPPING_ADDRESS2', e.target.value)}
              placeholder="123 Luxury Avenue"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shipping-address3">Address Line 3</Label>
            <Input
              id="shipping-address3"
              value={data.SHIPPING_ADDRESS3}
              onChange={(e) => onInputChange('SHIPPING_ADDRESS3', e.target.value)}
              placeholder="London W1K 5AB"
            />
          </div>
          <div>
            <Label htmlFor="shipping-address4">Address Line 4</Label>
            <Input
              id="shipping-address4"
              value={data.SHIPPING_ADDRESS4}
              onChange={(e) => onInputChange('SHIPPING_ADDRESS4', e.target.value)}
              placeholder="United Kingdom"
            />
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Billing Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="billing-address1">Address Line 1</Label>
            <Input
              id="billing-address1"
              value={data.BILLING_ADDRESS1}
              onChange={(e) => onInputChange('BILLING_ADDRESS1', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="billing-address2">Address Line 2</Label>
            <Input
              id="billing-address2"
              value={data.BILLING_ADDRESS2}
              onChange={(e) => onInputChange('BILLING_ADDRESS2', e.target.value)}
              placeholder="123 Luxury Avenue"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="billing-address3">Address Line 3</Label>
            <Input
              id="billing-address3"
              value={data.BILLING_ADDRESS3}
              onChange={(e) => onInputChange('BILLING_ADDRESS3', e.target.value)}
              placeholder="London W1K 5AB"
            />
          </div>
          <div>
            <Label htmlFor="billing-address4">Address Line 4</Label>
            <Input
              id="billing-address4"
              value={data.BILLING_ADDRESS4}
              onChange={(e) => onInputChange('BILLING_ADDRESS4', e.target.value)}
              placeholder="United Kingdom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}