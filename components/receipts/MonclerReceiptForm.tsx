"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { uploadImageToSupabase } from "@/lib/supabase-storage";
import { MonclerReceiptData } from "@/types/receipt-types";

interface MonclerReceiptFormProps {
  data: MonclerReceiptData;
  onInputChange: (field: keyof MonclerReceiptData, value: string) => void;
}

export function MonclerReceiptForm({
  data,
  onInputChange,
}: MonclerReceiptFormProps) {
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
      {/* Order Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Order Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              value={data.FIRST_NAME}
              onChange={(e) => onInputChange("FIRST_NAME", e.target.value)}
              placeholder="John"
            />
          </div>

          <div>
            <Label htmlFor="order_number">Order Number</Label>
            <Input
              id="order_number"
              value={data.ORDER_NUMBER}
              onChange={(e) => onInputChange("ORDER_NUMBER", e.target.value)}
              placeholder="MCL123456789"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="date">Order Date</Label>
          <Input
            id="date"
            value={data.DATE}
            onChange={(e) => onInputChange("DATE", e.target.value)}
            placeholder="December 1, 2024"
          />
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Product Information
        </h3>

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

        <div>
          <Label htmlFor="product_name">Product Name</Label>
          <Input
            id="product_name"
            value={data.PRODUCT_NAME}
            onChange={(e) => onInputChange("PRODUCT_NAME", e.target.value)}
            placeholder="Maya Down Jacket"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              value={data.SIZE}
              onChange={(e) => onInputChange("SIZE", e.target.value)}
              placeholder="L"
            />
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              value={data.COLOR}
              onChange={(e) => onInputChange("COLOR", e.target.value)}
              placeholder="Black"
            />
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              value={data.QUANTITY}
              onChange={(e) => onInputChange("QUANTITY", e.target.value)}
              placeholder="1"
            />
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Pricing Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="product_price">Product Price</Label>
            <Input
              id="product_price"
              value={data.PRODUCT_PRICE}
              onChange={(e) => onInputChange("PRODUCT_PRICE", e.target.value)}
              placeholder="€1,395.00"
            />
          </div>

          <div>
            <Label htmlFor="subtotal">Subtotal</Label>
            <Input
              id="subtotal"
              value={data.SUBTOTAL}
              onChange={(e) => onInputChange("SUBTOTAL", e.target.value)}
              placeholder="€1,395.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="shipping_cost">Shipping Cost</Label>
            <Input
              id="shipping_cost"
              value={data.SHIPPING_COST}
              onChange={(e) => onInputChange("SHIPPING_COST", e.target.value)}
              placeholder="Free"
            />
          </div>

          <div>
            <Label htmlFor="tax_amount">Tax Amount</Label>
            <Input
              id="tax_amount"
              value={data.TAX_AMOUNT}
              onChange={(e) => onInputChange("TAX_AMOUNT", e.target.value)}
              placeholder="€232.50"
            />
          </div>

          <div>
            <Label htmlFor="total_amount">Total Amount</Label>
            <Input
              id="total_amount"
              value={data.TOTAL_AMOUNT}
              onChange={(e) => onInputChange("TOTAL_AMOUNT", e.target.value)}
              placeholder="€1,395.00"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Shipping Address
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="shipping_address_1">Address Line 1</Label>
            <Input
              id="shipping_address_1"
              value={data.SHIPPING_ADDRESS_1}
              onChange={(e) =>
                onInputChange("SHIPPING_ADDRESS_1", e.target.value)
              }
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="shipping_address_2">Address Line 2</Label>
            <Input
              id="shipping_address_2"
              value={data.SHIPPING_ADDRESS_2}
              onChange={(e) =>
                onInputChange("SHIPPING_ADDRESS_2", e.target.value)
              }
              placeholder="123 Luxury Avenue"
            />
          </div>

          <div>
            <Label htmlFor="shipping_address_3">Address Line 3</Label>
            <Input
              id="shipping_address_3"
              value={data.SHIPPING_ADDRESS_3}
              onChange={(e) =>
                onInputChange("SHIPPING_ADDRESS_3", e.target.value)
              }
              placeholder="Paris 75001"
            />
          </div>

          <div>
            <Label htmlFor="shipping_address_4">Address Line 4</Label>
            <Input
              id="shipping_address_4"
              value={data.SHIPPING_ADDRESS_4}
              onChange={(e) =>
                onInputChange("SHIPPING_ADDRESS_4", e.target.value)
              }
              placeholder="France"
            />
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Billing Address
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="billing_address_1">Address Line 1</Label>
            <Input
              id="billing_address_1"
              value={data.BILLING_ADDRESS_1}
              onChange={(e) =>
                onInputChange("BILLING_ADDRESS_1", e.target.value)
              }
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="billing_address_2">Address Line 2</Label>
            <Input
              id="billing_address_2"
              value={data.BILLING_ADDRESS_2}
              onChange={(e) =>
                onInputChange("BILLING_ADDRESS_2", e.target.value)
              }
              placeholder="123 Luxury Avenue"
            />
          </div>

          <div>
            <Label htmlFor="billing_address_3">Address Line 3</Label>
            <Input
              id="billing_address_3"
              value={data.BILLING_ADDRESS_3}
              onChange={(e) =>
                onInputChange("BILLING_ADDRESS_3", e.target.value)
              }
              placeholder="Paris 75001"
            />
          </div>

          <div>
            <Label htmlFor="billing_address_4">Address Line 4</Label>
            <Input
              id="billing_address_4"
              value={data.BILLING_ADDRESS_4}
              onChange={(e) =>
                onInputChange("BILLING_ADDRESS_4", e.target.value)
              }
              placeholder="France"
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Payment Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="payment_method">Payment Method</Label>
            <Input
              id="payment_method"
              value={data.PAYMENT_METHOD}
              onChange={(e) => onInputChange("PAYMENT_METHOD", e.target.value)}
              placeholder="Visa"
            />
          </div>

          <div>
            <Label htmlFor="card_ending">Card Ending</Label>
            <Input
              id="card_ending"
              value={data.CARD_ENDING}
              onChange={(e) => onInputChange("CARD_ENDING", e.target.value)}
              placeholder="1234"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
