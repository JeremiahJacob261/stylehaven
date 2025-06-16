import { YzyGapReceiptData } from "@/types/receipt-types";
import React, { useState } from "react";
import { uploadImageToSupabase } from "@/lib/supabase-storage";
interface YzyGapReceiptFormProps {
  data: YzyGapReceiptData;
  onInputChange: (field: keyof YzyGapReceiptData, value: string) => void;
}

export function YzyGapReceiptForm({
  data,
  onInputChange,
}: YzyGapReceiptFormProps) {
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
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Order Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={data.ORDER_NUMBER}
            onChange={(e) => onInputChange("ORDER_NUMBER", e.target.value)}
            placeholder="Order Number"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            value={data.ORDER_DATE}
            onChange={(e) => onInputChange("ORDER_DATE", e.target.value)}
            placeholder="Order Date"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Customer Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={data.CUSTOMER_NAME}
            onChange={(e) => onInputChange("CUSTOMER_NAME", e.target.value)}
            placeholder="Customer Name"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="email"
            value={data.CUSTOMER_EMAIL}
            onChange={(e) => onInputChange("CUSTOMER_EMAIL", e.target.value)}
            placeholder="Customer Email"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
      {/* Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Product Information
        </h3>
        <input
          type="text"
          value={data.PRODUCT_NAME}
          onChange={(e) => onInputChange("PRODUCT_NAME", e.target.value)}
          placeholder="Product Name"
          className="w-full px-3 py-2 border rounded-lg"
        />
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            value={data.PRODUCT_SIZE}
            onChange={(e) => onInputChange("PRODUCT_SIZE", e.target.value)}
            placeholder="Size"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            value={data.PRODUCT_COLOR}
            onChange={(e) => onInputChange("PRODUCT_COLOR", e.target.value)}
            placeholder="Color"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            value={data.QUANTITY}
            onChange={(e) => onInputChange("QUANTITY", e.target.value)}
            placeholder="Quantity"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
      {/* Pricing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Pricing Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            value={data.PRODUCT_PRICE}
            onChange={(e) => onInputChange("PRODUCT_PRICE", e.target.value)}
            placeholder="Product Price"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            value={data.SUBTOTAL}
            onChange={(e) => onInputChange("SUBTOTAL", e.target.value)}
            placeholder="Subtotal"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            value={data.TOTAL_AMOUNT}
            onChange={(e) => onInputChange("TOTAL_AMOUNT", e.target.value)}
            placeholder="Total"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            value={data.SHIPPING_COST}
            onChange={(e) => onInputChange("SHIPPING_COST", e.target.value)}
            placeholder="Shipping"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            value={data.TAX_AMOUNT}
            onChange={(e) => onInputChange("TAX_AMOUNT", e.target.value)}
            placeholder="Tax"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
      {/* Shipping Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Shipping Address
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <input
              key={i}
              type="text"
              value={
                data[
                  `SHIPPING_ADDRESS_${i}` as keyof YzyGapReceiptData
                ] as string
              }
              onChange={(e) =>
                onInputChange(
                  `SHIPPING_ADDRESS_${i}` as keyof YzyGapReceiptData,
                  e.target.value
                )
              }
              placeholder={`Address Line ${i}`}
              className="w-full px-3 py-2 border rounded-lg"
            />
          ))}
        </div>
      </div>
      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">
          Payment Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={data.PAYMENT_METHOD}
            onChange={(e) => onInputChange("PAYMENT_METHOD", e.target.value)}
            placeholder="Payment Method"
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            value={data.CARD_ENDING}
            onChange={(e) => onInputChange("CARD_ENDING", e.target.value)}
            placeholder="Card Ending"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
