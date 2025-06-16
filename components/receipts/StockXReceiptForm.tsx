import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { uploadImageToSupabase } from "@/lib/supabase-storage";
import { Label } from "@/components/ui/label";
import { StockXReceiptData } from "@/types/receipt-types";

interface StockXReceiptFormProps {
  data: StockXReceiptData;
  onInputChange: (field: keyof StockXReceiptData, value: string) => void;
}

export function StockXReceiptForm({
  data,
  onInputChange,
}: StockXReceiptFormProps) {
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
            <Label htmlFor="order_number">Order Number</Label>
            <Input
              id="order_number"
              value={data.ORDER_NUMBER}
              onChange={(e) => onInputChange("ORDER_NUMBER", e.target.value)}
              placeholder="STX123456789"
            />
          </div>
          <div>
            <Label htmlFor="order_date">Order Date</Label>
            <Input
              id="order_date"
              value={data.ORDER_DATE}
              onChange={(e) => onInputChange("ORDER_DATE", e.target.value)}
              placeholder="December 1, 2024"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="order_status">Order Status</Label>
          <select
            value={data.ORDER_STATUS}
            onChange={(e) => onInputChange("ORDER_STATUS", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ordered">Ordered</option>
            <option value="verified">Verified & Shipped</option>
          </select>
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Customer Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customer_name">Customer Name</Label>
            <Input
              id="customer_name"
              value={data.CUSTOMER_NAME}
              onChange={(e) => onInputChange("CUSTOMER_NAME", e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="customer_email">Customer Email</Label>
            <Input
              id="customer_email"
              value={data.CUSTOMER_EMAIL}
              onChange={(e) => onInputChange("CUSTOMER_EMAIL", e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="product_name">Product Name</Label>
            <Input
              id="product_name"
              value={data.PRODUCT_NAME}
              onChange={(e) => onInputChange("PRODUCT_NAME", e.target.value)}
              placeholder="Air Jordan 1 Retro High OG"
            />
          </div>
          <div>
            <Label htmlFor="product_size">Product Size</Label>
            <Input
              id="product_size"
              value={data.PRODUCT_SIZE}
              onChange={(e) => onInputChange("PRODUCT_SIZE", e.target.value)}
              placeholder="US 10"
            />
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Pricing Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="product_price">Product Price</Label>
            <Input
              id="product_price"
              value={data.PRODUCT_PRICE}
              onChange={(e) => onInputChange("PRODUCT_PRICE", e.target.value)}
              placeholder="$285.00"
            />
          </div>
          <div>
            <Label htmlFor="shipping_cost">Shipping Cost</Label>
            <Input
              id="shipping_cost"
              value={data.SHIPPING_COST}
              onChange={(e) => onInputChange("SHIPPING_COST", e.target.value)}
              placeholder="$13.95"
            />
          </div>
          <div>
            <Label htmlFor="tax_amount">Tax Amount</Label>
            <Input
              id="tax_amount"
              value={data.TAX_AMOUNT}
              onChange={(e) => onInputChange("TAX_AMOUNT", e.target.value)}
              placeholder="$25.00"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="total_amount">Total Amount</Label>
          <Input
            id="total_amount"
            value={data.TOTAL_AMOUNT}
            onChange={(e) => onInputChange("TOTAL_AMOUNT", e.target.value)}
            placeholder="$323.95"
          />
        </div>
      </div>

      {/* Shipping Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Shipping Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tracking_number">Tracking Number</Label>
            <Input
              id="tracking_number"
              value={data.TRACKING_NUMBER}
              onChange={(e) => onInputChange("TRACKING_NUMBER", e.target.value)}
              placeholder="1Z999AA1234567890"
            />
          </div>
          <div>
            <Label htmlFor="estimated_delivery">Estimated Delivery</Label>
            <Input
              id="estimated_delivery"
              value={data.ESTIMATED_DELIVERY}
              onChange={(e) =>
                onInputChange("ESTIMATED_DELIVERY", e.target.value)
              }
              placeholder="December 5, 2024"
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
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Label htmlFor={`shipping_address_${i}`}>Address Line {i}</Label>
              <Input
                id={`shipping_address_${i}`}
                value={
                  data[
                    `SHIPPING_ADDRESS_${i}` as keyof StockXReceiptData
                  ] as string
                }
                onChange={(e) =>
                  onInputChange(
                    `SHIPPING_ADDRESS_${i}` as keyof StockXReceiptData,
                    e.target.value
                  )
                }
                placeholder={
                  i === 1
                    ? "John Doe"
                    : i === 2
                    ? "123 Main Street"
                    : i === 3
                    ? "New York, NY 10001"
                    : "United States"
                }
              />
            </div>
          ))}
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
